import { getDbTable } from '../database/Memory.Database.js';

// Retrieves the balance record for a given account ID from the in-memory database
export function getBalanceByAccountId(accountId) {
  const balances = getDbTable('balance');
  const balanceRecord = balances.find(b => b.account_id === accountId);
  return balanceRecord || null;
}

// Sets or updates the balance amount for a given account ID
export function setBalanceByAccountId(accountId, amount) {
  const formattedAmount = parseFloat(amount.toFixed(2));
  const balance = getBalanceByAccountId(accountId);

  if (balance) { 
    // Update existing balance amount
    balance.amount = formattedAmount;
  } else { 
    // Create new balance record if none exists
    getDbTable('balance').push({ account_id: accountId, amount: formattedAmount });
  }

  return getBalanceByAccountId(accountId);
}
