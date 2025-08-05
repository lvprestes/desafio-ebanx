import { getDbTable } from '../database/Memory.Database.js';
import { setBalanceByAccountId } from '../repositories/Balance.Repository.js';

// Helper function to format amount to 2 decimal places as a float
function formatAmount(value) {
  return parseFloat(value.toFixed(2));
}

// Retrieves the balance record for a given account ID
export function getBalanceByAccountId(accountId) {
  if (!accountId || typeof accountId !== 'string') return null;
  const balances = getDbTable('balance');
  return balances.find(b => b.account_id === accountId) || null;
}

// Performs a deposit operation to increase the balance of the destination account
export function depositOperation(destination, amount) {
  if (!destination || typeof destination !== 'string') {
    throw new Error('Invalid destination ID');
  }
  if (typeof amount !== 'number' || isNaN(amount) || amount <= 0) {
    throw new Error('Invalid deposit amount');
  }

  try {
    const current = getBalanceByAccountId(destination);
    const newAmount = current ? current.amount + amount : amount;

    setBalanceByAccountId(destination, formatAmount(newAmount));

    return getBalanceByAccountId(destination);
  } catch (error) {
    console.error(`Deposit error: ${error.message}`);
    return null;
  }
}

// Performs a withdrawal operation to reduce the balance of the origin account
export function withdrawOperation(origin, amount) {
  if (!origin || typeof origin !== 'string') {
    throw new Error('Invalid origin ID');
  }
  if (typeof amount !== 'number' || isNaN(amount) || amount <= 0) {
    throw new Error('Invalid withdrawal amount');
  }

  try {
    const current = getBalanceByAccountId(origin);
    if (!current) {
      throw new Error('Origin account not found');
    }
    if (current.amount < amount) {
      throw new Error('Insufficient balance');
    }

    setBalanceByAccountId(origin, formatAmount(current.amount - amount));

    return getBalanceByAccountId(origin);
  } catch (error) {
    console.error(`Withdrawal error: ${error.message}`);
    return null;
  }
}

// Performs a transfer operation between two accounts (origin and destination)
export function transferOperation(origin, destination, amount) {
  try {
    // Validate parameters
    if (!origin || typeof origin !== 'string' ||
      !destination || typeof destination !== 'string') {
      throw new Error('Invalid origin or destination ID');
    }
    if (typeof amount !== 'number' || isNaN(amount) || amount <= 0) {
      throw new Error('Invalid transfer amount');
    }

    const originBalance = getBalanceByAccountId(origin);
    const destBalance = getBalanceByAccountId(destination);

    if (!originBalance) {
      throw new Error('Origin account not found');
    }
    if (originBalance.amount < amount) {
      throw new Error('Insufficient balance for transfer');
    }

    setBalanceByAccountId(origin, formatAmount(originBalance.amount - amount));
    
    // Updates the destination account balance: adds the amount if the account exists, or sets it as the initial balance if it doesn't
    setBalanceByAccountId(destination, formatAmount((destBalance) ? destBalance.amount + amount : amount));

    return { origin: getBalanceByAccountId(origin), destination: getBalanceByAccountId(destination) };
  } catch (error) {
    console.error(`Transfer error: ${error.message}`);
    return null;
  }
}
