import { getDbTable } from '../database/Memory.Database.js';

export function getBalanceByAccountId(accountId) {
  const balances = getDbTable('balance');
  const balanceRecord = balances.find(b => b.account_id === accountId);
  return balanceRecord || null;
}

export function setBalanceByAccountId(accountId, amount) {
  const formattedAmount = parseFloat(amount.toFixed(2));

  const balance = getBalanceByAccountId(accountId);
  if (balance) {
    balance.amount = formattedAmount;
  } else {
    getDbTable('balance').push({ account_id: accountId, amount: formattedAmount });
  }
  return getBalanceByAccountId(accountId);
}
