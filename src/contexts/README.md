# Data Context Architecture

## Overview

The `DataContext` provides centralized data management for the Kitako app. It uses a **smart loading strategy** that balances performance with user experience.

## Loading Strategy

### Small Datasets (Loaded Once)
- **Accounts**: Loaded on mount, cached in memory
- **Categories**: Loaded on mount, cached in memory
- **Why**: These are small (< 100 items typically) and needed across all views

### Large Datasets (Lazy Loaded)
- **Transactions**: Loaded on demand with pagination
- **Why**: Can grow to 100k+ records, would cause performance issues if loaded all at once

### Aggregates (Calculated On Demand)
- **Total Balance**: Calculated from accounts
- **Monthly Total**: Calculated from expenses in current month
- **Today Total**: Calculated from today's expenses
- **Why**: Only calculated when needed, can be cached if needed

## Performance Considerations

### Current Implementation (Good for < 10k transactions)
- Loads all transactions, merges, sorts, then paginates
- Works well for typical use cases (< 10k records)
- Simple and maintainable

### Optimization for 100k+ Records

If you expect 100k+ transactions, consider:

1. **Cursor-Based Pagination**
   ```typescript
   // Use IndexedDB cursors to fetch in batches
   // Merge sorted results efficiently
   ```

2. **Composite Index**
   ```typescript
   // Create a unified transactions table with composite index
   // Store all transaction types in one table
   ```

3. **Virtual Scrolling**
   ```typescript
   // Only render visible items
   // Use libraries like react-window or react-virtual
   ```

4. **Background Processing**
   ```typescript
   // Use Web Workers for heavy calculations
   // Process data in chunks
   ```

5. **Incremental Loading**
   ```typescript
   // Load recent transactions first
   // Load older transactions on scroll
   ```

## Usage in Views

```typescript
import { useData } from "@/contexts/DataContext";

function MyView() {
  const {
    accounts,
    categories,
    transactions,
    totalBalance,
    isLoadingTransactions,
    loadTransactions,
    loadMoreTransactions,
  } = useData();

  // Load transactions when view becomes active
  React.useEffect(() => {
    loadTransactions(1);
  }, [loadTransactions]);

  // ...
}
```

## Data Flow

```
Page.tsx
  └─ DataProvider (loads accounts, categories on mount)
      └─ ViewProvider
          └─ Views (load transactions on demand)
```

## Best Practices

1. **Don't load transactions until needed**: Only load when user navigates to Transactions view
2. **Use pagination**: Load 50-100 items at a time
3. **Cache small datasets**: Accounts and categories are cached
4. **Calculate aggregates on demand**: Don't pre-calculate everything
5. **Handle loading states**: Show spinners while data loads

## Future Optimizations

- [ ] Implement cursor-based pagination for 100k+ records
- [ ] Add transaction caching with invalidation
- [ ] Use Web Workers for heavy calculations
- [ ] Implement virtual scrolling for transaction lists
- [ ] Add data prefetching for next page
