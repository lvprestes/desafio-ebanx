export default class Balance {
  constructor({ account_id, balance }) {
    if (!account_id || typeof account_id !== 'string') {
      throw new Error('account_id should be string');
    }
    if (typeof balance !== 'number') {
      throw new Error('balance should be a number');
    }

    this.account_id = account_id;
    this.balance = balance;
  }
}
