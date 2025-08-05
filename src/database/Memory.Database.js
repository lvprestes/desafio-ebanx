// Simulated in-memory "database"
const db = { balance: [] };

// Returns all records from a given "table"
export function getDbTable(table) {
  return db[table] || [];
}

// Resets the in-memory database
export function resetDb() {
  db.balance = [];
}
