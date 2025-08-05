import { resetDb } from '../database/Memory.Database.js';
import { getBalanceByAccountId } from '../services/Balance.Service.js';

export const getBalance = (req, res) => {  
  const accountId = req.query.account_id;
  if (!accountId) {
    return res.status(400).json('0');
  }

  const balance = getBalanceByAccountId(accountId);
  if (!balance) {
    return res.status(404).json('0');
  }

  return res.status(200).json({ account_id: accountId, balance });
}

export const handleResetReq = (req, res) => {
  resetDb();
  return res.status(200).json('OK');
}