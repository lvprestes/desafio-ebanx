import { depositOperation, withdrawOperation, transferOperation } from '../services/Balance.Service.js';

// Main handler function for event requests
export const handleEventReq = (req, res) => {
  const { type } = req.body;

  // Validate event type presence and type
  if (!type || typeof type !== 'string') {
    return res.status(400).json(0);
  }

  // Route the request based on event type
  switch (type) {
    case 'deposit':
      return handleDeposit(req, res);
    case 'withdraw':
      return handleWithdraw(req, res);
    case 'transfer':
      return handleTransfer(req, res);
    default:
      // Respond with error if event type is unsupported
      return res.status(400).json(0);
  }
};

// Handler for deposit requests
function handleDeposit(req, res) {
  const { destination, amount } = req.body;

  // Validate destination account ID
  if (!destination || typeof destination !== 'string') {
    return res.status(400).json(0);
  }

  // Validate deposit amount
  if (typeof amount !== 'number' || isNaN(amount) || amount <= 0) {
    return res.status(400).json(0);
  }

  try {
    // Perform the deposit operation
    const destinationBalance = depositOperation(destination, amount);

    // Handle failure of deposit operation
    if (!destinationBalance) {
      return res.status(500).json(0);
    }

    // Respond with new balance info
    return res.status(201).json({
      destination: { id: destination, balance: destinationBalance.amount }
    });
  } catch (error) {
    // Handle unexpected errors
    return res.status(500).json(0);
  }
}

// Handler for withdraw requests
function handleWithdraw(req, res) {
  const { origin, amount } = req.body;

  // Validate origin account ID
  if (!origin || typeof origin !== 'string') {
    return res.status(400).json(0);
  }

  // Validate withdrawal amount
  if (typeof amount !== 'number' || isNaN(amount) || amount <= 0) {
    return res.status(400).json(0);
  }

  try {
    // Perform the withdrawal operation
    const originBalance = withdrawOperation(origin, amount);

    // Handle withdrawal failure (account missing or insufficient funds)
    if (!originBalance) {
      return res.status(404).json(0);
    }

    // Respond with new balance info
    return res.status(201).json({
      origin: { id: origin, balance: originBalance.amount }
    });
  } catch (error) {
    // Handle unexpected errors
    return res.status(500).json(0);
  }
}

// Handler for transfer requests
function handleTransfer(req, res) {
  const { origin, destination, amount } = req.body;

  // Validate origin and destination account IDs
  if (!origin || typeof origin !== 'string' || !destination || typeof destination !== 'string') {
    return res.status(400).json(0);
  }

  // Validate transfer amount
  if (typeof amount !== 'number' || isNaN(amount) || amount <= 0) {
    return res.status(400).json(0);
  }

  try {
    // Perform the transfer operation
    const result = transferOperation(origin, destination, amount);

    // Handle failure of transfer (e.g., insufficient funds or accounts missing)
    if (!result) {
      return res.status(404).json(0);
    }

    // Respond with updated balance info for both accounts
    return res.status(201).json({
      origin: { id: origin, balance: result.origin.amount },
      destination: { id: destination, balance: result.destination.amount }
    });
  } catch (error) {
    // Handle unexpected errors
    return res.status(500).json(0);
  }
}
