// Class representing a balance record for an account
export default class Balance {
  constructor({ account_id, balance }) {
    // Validate that account_id is a non-empty string
    if (!account_id || typeof account_id !== 'string') {
      throw new Error('account_id should be string');
    }

    // Validate that balance is a number
    if (typeof balance !== 'number') {
      throw new Error('balance should be a number');
    }

    this.account_id = account_id;
    this.balance = balance;
  }
}
