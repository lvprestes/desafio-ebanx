# EBANX Challenge - Simple In-Memory Banking API

A Node.js REST API developed for the EBANX technical challenge.  
This API simulates basic banking operations (balance inquiry, deposit, withdrawal, and transfer) using only in-memory data storage.  
The project emphasizes simplicity, clear architecture, and strict separation of concerns between HTTP transport and business logic.

**Developer:** Luiz Prestes

---

## Features

- **Balance Inquiry:** Check account balance by ID.
- **Deposit:** Create an account (if it doesn't exist) and deposit funds.
- **Withdraw:** Withdraw funds from an existing account.
- **Transfer:** Transfer funds between two accounts.
- **Reset:** Reset in-memory state (for testing purposes).
- **No database required:** All data is stored in memory.

---

## Getting Started

### Installation

```sh
git clone https://github.com/your-username/desafio-ebanx.git
cd desafio-ebanx
npm install
```

### Running Locally

```sh
npm start
```

The API will be available at `http://localhost:3000`.

---

## API Endpoints

### 1. Get Balance

**GET** `/balance?account_id=ID`

Returns the balance for the given account.

#### Example Request

```
GET /balance?account_id=100
```

#### Example Response

- **If account exists:**
  ```json
  20
  ```
- **If account does not exist:**
  - Status: `404`
  ```json
  0
  ```

---

### 2. Event Operations

**POST** `/event`

Handles deposit, withdraw, and transfer operations.

#### a) Deposit

Creates an account (if it doesn't exist) and deposits funds.

**Request Body:**
```json
{
  "type": "deposit",
  "destination": "100",
  "amount": 10
}
```

**Response:**
- Status: `201`
```json
{
  "destination": {
    "id": "100",
    "balance": 10
  }
}
```

---

#### b) Withdraw

Withdraws funds from an existing account.

**Request Body:**
```json
{
  "type": "withdraw",
  "origin": "100",
  "amount": 5
}
```

**Response:**
- Status: `201`
```json
{
  "origin": {
    "id": "100",
    "balance": 5
  }
}
```
- If account does not exist or insufficient funds:
  - Status: `404`
  ```json
  0
  ```

---

#### c) Transfer

Transfers funds from one account to another.

**Request Body:**
```json
{
  "type": "transfer",
  "origin": "100",
  "destination": "300",
  "amount": 15
}
```

**Response:**
- Status: `201`
```json
{
  "origin": {
    "id": "100",
    "balance": 0
  },
  "destination": {
    "id": "300",
    "balance": 15
  }
}
```
- If origin or destination account does not exist:
  - Status: `404`
  ```json
  0
  ```

---

### 3. Reset State

**POST** `/reset`

Resets the in-memory database to its initial state.  
Useful for automated testing.

**Response:**
- Status: `200`
```
OK
```

---

## Design Considerations & Best Practices

- **Simplicity:** No external database; all data is stored in memory for ease of testing and clarity.
- **Separation of Concerns:** HTTP transport (controllers/routes) is strictly separated from business logic (services) and data access (repositories).
- **Error Handling:** Returns appropriate HTTP status codes (`400`, `404`, `500`) for invalid requests or errors.
- **Extensibility:** Modular structure allows for easy extension or migration to persistent storage.
- **Logging:** Requests and errors are logged for debugging and traceability.
- **Versioning Ready:** Although not implemented, the structure allows for easy introduction of API versioning.

---

## Deployment

This project is ready for deployment on [Vercel](https://vercel.com/) using the provided `vercel.json` configuration.

---