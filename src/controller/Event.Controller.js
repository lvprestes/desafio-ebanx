import Event from '../models/Event.Model.js';
import { depositOperation, transferOperation } from '../services/Balance.Service.js';

export const handleEventReq = (req, res) => {
  try {
    const event = new Event(req.body);

    switch (event.type) {
      //HANDLE ERRORS  
      case 'deposit': {
        const { destination, amount } = event;
        const newBalance = depositOperation(destination, amount);
        if (!newBalance) {
          return res.status(500).send('0')
        }
        return res.status(201).json({ destination: { id: destination, balance: newBalance } });
      }

      //HANDLE ERRORS
      case 'withdraw': {
        const { origin, amount } = event;
        const newBalance = withdrawOperation(origin, amount);
        if (!newBalance) {
          return res.status(404).send('0');
        }
        return res.status(201).json({ origin: { id: origin, balance: balances[origin] } });
      }

      //HANDLE ERRORS
      case 'transfer': { 
        const { origin, destination, amount } = event;
        const newBalances = transferOperation(origin, destination, amount);
        if(!newBalances) {
          return res.status(404).send('0');
        }
        return res.status(201).json({origin: newBalances.origin, destination: newBalances.destination});
      }

      default:
        return res.status(400).send('Invalid event type');
    }
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};
