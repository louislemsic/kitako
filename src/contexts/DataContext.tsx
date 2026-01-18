"use client";

import * as React from "react";
import {
  db,
  type Account,
  type Category,
  type Expense,
  type Gain,
  type Transfer,
  initializeDefaultCategories,
} from "@/lib/db";

// Combined transaction type for unified display
export type Transaction = {
  id: number;
  type: "expense" | "gain" | "transfer";
  amount: number;
  date: Date;
  account?: number;
  fromAccount?: number;
  toAccount?: number;
  name?: string;
  category?: string;
  remark?: string;
};

interface DataContextType {
  // Small datasets - loaded once
  accounts: Account[];
  categories: Category[];
  isLoadingAccounts: boolean;
  isLoadingCategories: boolean;

  // Large datasets - loaded on demand with pagination
  transactions: Transaction[];
  totalTransactions: number;
  isLoadingTransactions: boolean;
  transactionsPage: number;
  transactionsPageSize: number;
  hasMoreTransactions: boolean;

  // Aggregates - calculated on demand
  totalBalance: number;
  monthlyTotal: number;
  todayTotal: number;

  // Actions
  refreshAccounts: () => Promise<void>;
  refreshCategories: () => Promise<void>;
  loadTransactions: (page?: number, pageSize?: number) => Promise<void>;
  loadMoreTransactions: () => Promise<void>;
  addExpense: (expense: Omit<Expense, "id">) => Promise<void>;
  addGain: (gain: Omit<Gain, "id">) => Promise<void>;
  addTransfer: (transfer: Omit<Transfer, "id">) => Promise<void>;
  refreshAll: () => Promise<void>;
}

const DataContext = React.createContext<DataContextType | undefined>(undefined);

const DEFAULT_PAGE_SIZE = 50; // Load 50 transactions at a time

export function DataProvider({ children }: { children: React.ReactNode }) {
  // Small datasets - cache these
  const [accounts, setAccounts] = React.useState<Account[]>([]);
  const [categories, setCategories] = React.useState<Category[]>([]);
  const [isLoadingAccounts, setIsLoadingAccounts] = React.useState(true);
  const [isLoadingCategories, setIsLoadingCategories] = React.useState(true);

  // Large datasets - paginated
  const [transactions, setTransactions] = React.useState<Transaction[]>([]);
  const [totalTransactions, setTotalTransactions] = React.useState(0);
  const [isLoadingTransactions, setIsLoadingTransactions] = React.useState(false);
  const [transactionsPage, setTransactionsPage] = React.useState(1);
  const [transactionsPageSize] = React.useState(DEFAULT_PAGE_SIZE);

  // Aggregates - calculated
  const [totalBalance, setTotalBalance] = React.useState(0);
  const [monthlyTotal, setMonthlyTotal] = React.useState(0);
  const [todayTotal, setTodayTotal] = React.useState(0);

  // Load accounts (small dataset - load once)
  const refreshAccounts = React.useCallback(async () => {
    try {
      setIsLoadingAccounts(true);
      const allAccounts = await db.accounts.toArray();
      setAccounts(allAccounts);
      
      // Calculate total balance
      const balance = allAccounts.reduce((sum, acc) => sum + acc.amount, 0);
      setTotalBalance(balance);
    } catch (error) {
      console.error("Error loading accounts:", error);
    } finally {
      setIsLoadingAccounts(false);
    }
  }, []);

  // Load categories (small dataset - load once)
  const refreshCategories = React.useCallback(async () => {
    try {
      setIsLoadingCategories(true);
      // Initialize default categories if none exist
      await initializeDefaultCategories();
      const allCategories = await db.categories.toArray();
      setCategories(allCategories);
    } catch (error) {
      console.error("Error loading categories:", error);
    } finally {
      setIsLoadingCategories(false);
    }
  }, []);

  // Convert DB records to unified Transaction type
  const convertToTransactions = React.useCallback(
    (
      expenses: Expense[],
      gains: Gain[],
      transfers: Transfer[]
    ): Transaction[] => {
      const expenseTransactions: Transaction[] = expenses.map((exp) => ({
        id: exp.id!,
        type: "expense" as const,
        amount: parseFloat(exp.amount),
        date: exp.date,
        account: exp.account,
        name: exp.name,
        category: exp.category,
        remark: exp.remark,
      }));

      const gainTransactions: Transaction[] = gains.map((gain) => ({
        id: gain.id!,
        type: "gain" as const,
        amount: gain.amount,
        date: gain.date,
        account: gain.account,
      }));

      const transferTransactions: Transaction[] = transfers.map((transfer) => ({
        id: transfer.id!,
        type: "transfer" as const,
        amount: transfer.amount,
        date: transfer.date,
        fromAccount: transfer.fromAccount,
        toAccount: transfer.toAccount,
      }));

      // Combine and sort by date (newest first)
      return [...expenseTransactions, ...gainTransactions, ...transferTransactions]
        .sort((a, b) => b.date.getTime() - a.date.getTime());
    },
    []
  );

  // Load transactions with pagination
  // Strategy: Fetch all, merge, sort, then paginate
  // For 100k+ records, consider using IndexedDB cursors more efficiently
  const loadTransactions = React.useCallback(
    async (page: number = 1, pageSize: number = DEFAULT_PAGE_SIZE) => {
      try {
        setIsLoadingTransactions(true);
        setTransactionsPage(page);

        // Get total count (efficient - uses indexes, doesn't load data)
        const expenseCount = await db.expenses.count();
        const gainCount = await db.gains.count();
        const transferCount = await db.transfers.count();
        const total = expenseCount + gainCount + transferCount;
        setTotalTransactions(total);

        // For small datasets (< 10k), load all and paginate in memory
        // For larger datasets, we'd need a more sophisticated approach
        // For now, we'll optimize by only loading what we need for the current page
        // This is a trade-off: merging sorted lists is complex, so we load all for now
        // TODO: Optimize for 100k+ records with proper cursor-based pagination
        
        // Fetch all expenses, gains, and transfers
        // In production with 100k+ records, you'd want to:
        // 1. Use cursors to fetch in batches
        // 2. Implement a merge-sort algorithm
        // 3. Or use a composite index if possible
        const allExpenses = await db.expenses
          .orderBy("date")
          .reverse()
          .toArray();
        const allGains = await db.gains.orderBy("date").reverse().toArray();
        const allTransfers = await db.transfers
          .orderBy("date")
          .reverse()
          .toArray();

        // Convert and merge
        const allTransactions = convertToTransactions(
          allExpenses,
          allGains,
          allTransfers
        );

        // Apply pagination to merged results
        const offset = (page - 1) * pageSize;
        const paginatedTransactions = allTransactions.slice(
          offset,
          offset + pageSize
        );

        setTransactions(paginatedTransactions);
      } catch (error) {
        console.error("Error loading transactions:", error);
      } finally {
        setIsLoadingTransactions(false);
      }
    },
    [convertToTransactions]
  );

  // Load more transactions (append to existing)
  const loadMoreTransactions = React.useCallback(async () => {
    if (isLoadingTransactions) return;

    const nextPage = transactionsPage + 1;

    try {
      setIsLoadingTransactions(true);

      // Fetch all and get next page
      const allExpenses = await db.expenses
        .orderBy("date")
        .reverse()
        .toArray();
      const allGains = await db.gains.orderBy("date").reverse().toArray();
      const allTransfers = await db.transfers
        .orderBy("date")
        .reverse()
        .toArray();

      const allTransactions = convertToTransactions(
        allExpenses,
        allGains,
        allTransfers
      );

      // Get transactions up to the next page
      const offset = (nextPage - 1) * transactionsPageSize;
      const newTransactions = allTransactions.slice(0, offset + transactionsPageSize);

      setTransactions(newTransactions);
      setTransactionsPage(nextPage);
    } catch (error) {
      console.error("Error loading more transactions:", error);
    } finally {
      setIsLoadingTransactions(false);
    }
  }, [transactionsPage, transactionsPageSize, isLoadingTransactions, convertToTransactions]);

  // Calculate monthly and today totals
  const calculateAggregates = React.useCallback(async () => {
    try {
      const now = new Date();
      const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
      const startOfToday = new Date(
        now.getFullYear(),
        now.getMonth(),
        now.getDate()
      );

      // Get expenses for this month
      const monthlyExpenses = await db.expenses
        .where("date")
        .aboveOrEqual(startOfMonth)
        .toArray();

      const monthlyTotal = monthlyExpenses.reduce(
        (sum, exp) => sum + parseFloat(exp.amount),
        0
      );
      setMonthlyTotal(monthlyTotal);

      // Get expenses for today
      const todayExpenses = await db.expenses
        .where("date")
        .aboveOrEqual(startOfToday)
        .toArray();

      const today = todayExpenses.reduce(
        (sum, exp) => sum + parseFloat(exp.amount),
        0
      );
      setTodayTotal(today);
    } catch (error) {
      console.error("Error calculating aggregates:", error);
    }
  }, []);

  // Add expense
  const addExpense = React.useCallback(
    async (expense: Omit<Expense, "id">) => {
      try {
        await db.expenses.add({
          ...expense,
          date: expense.date instanceof Date ? expense.date : new Date(expense.date),
        });
        await refreshAccounts(); // Update balance
        await calculateAggregates(); // Update totals
        await loadTransactions(1); // Reload first page
      } catch (error) {
        console.error("Error adding expense:", error);
        throw error;
      }
    },
    [refreshAccounts, calculateAggregates, loadTransactions]
  );

  // Add gain
  const addGain = React.useCallback(
    async (gain: Omit<Gain, "id">) => {
      try {
        await db.gains.add({
          ...gain,
          date: gain.date instanceof Date ? gain.date : new Date(gain.date),
        });
        await refreshAccounts(); // Update balance
        await loadTransactions(1); // Reload first page
      } catch (error) {
        console.error("Error adding gain:", error);
        throw error;
      }
    },
    [refreshAccounts, loadTransactions]
  );

  // Add transfer
  const addTransfer = React.useCallback(
    async (transfer: Omit<Transfer, "id">) => {
      try {
        await db.transfers.add({
          ...transfer,
          date:
            transfer.date instanceof Date
              ? transfer.date
              : new Date(transfer.date),
        });
        await refreshAccounts(); // Update balances
        await loadTransactions(1); // Reload first page
      } catch (error) {
        console.error("Error adding transfer:", error);
        throw error;
      }
    },
    [refreshAccounts, loadTransactions]
  );

  // Refresh all data
  const refreshAll = React.useCallback(async () => {
    await Promise.all([
      refreshAccounts(),
      refreshCategories(),
      calculateAggregates(),
      loadTransactions(1),
    ]);
  }, [refreshAccounts, refreshCategories, calculateAggregates, loadTransactions]);

  // Initial load - only load small datasets
  React.useEffect(() => {
    refreshAccounts();
    refreshCategories();
    calculateAggregates();
    // Don't load transactions until needed
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const hasMoreTransactions =
    transactions.length < totalTransactions && !isLoadingTransactions;

  return (
    <DataContext.Provider
      value={{
        accounts,
        categories,
        isLoadingAccounts,
        isLoadingCategories,
        transactions,
        totalTransactions,
        isLoadingTransactions,
        transactionsPage,
        transactionsPageSize,
        hasMoreTransactions,
        totalBalance,
        monthlyTotal,
        todayTotal,
        refreshAccounts,
        refreshCategories,
        loadTransactions,
        loadMoreTransactions,
        addExpense,
        addGain,
        addTransfer,
        refreshAll,
      }}
    >
      {children}
    </DataContext.Provider>
  );
}

export function useData() {
  const context = React.useContext(DataContext);
  if (context === undefined) {
    throw new Error("useData must be used within a DataProvider");
  }
  return context;
}
