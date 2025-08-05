import { getDbTable } from '../database/Memory.Database.js';
import { setBalanceByAccountId } from '../repositories/Balance.Repository.js';

function formatAmount(value) {
  return parseFloat(value.toFixed(2));
}

export function getBalanceByAccountId(accountId) {
  const balances = getDbTable('balance');
  return balances.find(b => b.account_id === accountId) || null;
}

export function depositOperation(destination, amount) {
  const current = getBalanceByAccountId(destination);
  const newAmount = current ? current.amount + amount : amount;

  setBalanceByAccountId(destination, formatAmount(newAmount));
  return getBalanceByAccountId(destination);
}

export function withdrawOperation(origin, amount) {
  const current = getBalanceByAccountId(origin);
  if (!current || current.amount < amount) return null;

  setBalanceByAccountId(origin, formatAmount(current.amount - amount));
  return getBalanceByAccountId(origin);
}

export function transferOperation(origin, destination, amount) {
  const originBalance = getBalanceByAccountId(origin);
  const destBalance = getBalanceByAccountId(destination);

  if (!originBalance || !destBalance) return null;
  if (originBalance.amount < amount) return null;

  setBalanceByAccountId(origin, formatAmount(originBalance.amount - amount));
  setBalanceByAccountId(destination, formatAmount(destBalance.amount + amount));

  return {origin: getBalanceByAccountId(origin), destination: getBalanceByAccountId(destination)};
}
