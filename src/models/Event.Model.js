export default class Event {
  constructor({ type, destination, origin, amount }) {
    if (!type || typeof type !== 'string') {
      throw new Error('type should be a string');
    }

    if (typeof amount !== 'number' || amount <= 0) {
      throw new Error('amount should be a positive number');
    }

    if (type === 'deposit') {
      if (!destination || typeof destination !== 'string') {
        throw new Error('destination should be a string for deposit');
      }
      this.destination = destination;
      this.origin = null;
    } else if (type === 'withdraw') {
      if (!origin || typeof origin !== 'string') {
        throw new Error('origin should be a string for withdraw');
      }
      this.origin = origin;
      this.destination = null;
    } else if (type === 'transfer') {
      if (!origin || typeof origin !== 'string') {
        throw new Error('origin should be a string for transfer');
      }
      if (!destination || typeof destination !== 'string') {
        throw new Error('destination should be a string for transfer');
      }
      this.origin = origin;
      this.destination = destination;
    } else {
      throw new Error(`Unsupported event type: ${type}`);
    }

    this.type = type;
    this.amount = amount;
  }
}
