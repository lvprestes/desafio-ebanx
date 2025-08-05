import { resetDb } from '../database/Memory.Database.js';
import { getBalanceByAccountId } from '../services/Balance.Service.js';

// Handler to get the balance for a given account via query parameter
export const getBalance = (req, res) => {
  // account_id validation  
  const accountId = req.query.account_id;
  if (!accountId) {
    return res.status(400).json(0);
  }

  const balance = getBalanceByAccountId(accountId);
  if (!balance) {
    return res.status(404).json(0);
  }

  return res.status(200).json(balance.amount);
}

// Handler to reset the in-memory database to initial state
export const handleResetReq = (req, res) => {
  resetDb();
  return res.status(200).json(OK);
}