import Dexie, { type Table } from "dexie";

// Database schema
export interface Expense {
  id?: number;
  name: string;
  amount: string;
  category: string;
  date: Date;
  account: number; // Reference to Accounts.id
  remark?: string;
}

export interface Gain {
  id?: number;
  account: number; // Reference to Accounts.id
  amount: number;
  date: Date;
}

export interface Transfer {
  id?: number;
  fromAccount: number; // Reference to Accounts.id
  toAccount: number; // Reference to Accounts.id
  amount: number;
  date: Date;
}

export type AccountType = "CREDIT_CARD" | "SAVINGS" | "EWALLET";

export interface Account {
  id?: number;
  name: string;
  amount: number;
  type: AccountType;
}

export interface Category {
  id?: number;
  name: string;
  color: string;
}

export interface AppSettings {
  id?: number;
  key: string;
  value: string;
  updatedAt: Date;
}

class KitakoDatabase extends Dexie {
  expenses!: Table<Expense>;
  gains!: Table<Gain>;
  transfers!: Table<Transfer>;
  accounts!: Table<Account>;
  categories!: Table<Category>;
  settings!: Table<AppSettings>;

  constructor() {
    super("kitako");
    this.version(1).stores({
      expenses: "++id, date, category, account",
      gains: "++id, date, account",
      accounts: "++id, type",
      categories: "++id, name",
      settings: "++id, key, updatedAt",
    });
    this.version(2).stores({
      expenses: "++id, date, category, account",
      gains: "++id, date, account",
      transfers: "++id, date, fromAccount, toAccount",
      accounts: "++id, type",
      categories: "++id, name",
      settings: "++id, key, updatedAt",
    });
  }
}

export const db = new KitakoDatabase();

/**
 * Check if database is initialized by checking if user settings exist.
 * A user must have completed onboarding (name and currency) to use the app.
 */
export async function isInitialized(): Promise<boolean> {
  try {
    const userName = await db.settings.get({ key: "userName" });
    return userName !== undefined;
  } catch (error) {
    console.error("Error checking database initialization:", error);
    return false;
  }
}

/**
 * Mark database as initialized by creating a settings entry.
 * This is kept for backward compatibility and future use.
 */
export async function markAsInitialized(): Promise<void> {
  try {
    await db.settings.put({
      key: "initialized",
      value: "true",
      updatedAt: new Date(),
    });
  } catch (error) {
    console.error("Error marking database as initialized:", error);
    throw error;
  }
}
