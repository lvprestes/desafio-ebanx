// Simulated in-memory "database"
const db = { balance: [], event: [] };

// Returns all records from a given "table"
export function getDbTable(table) {
  return db[table] || [];
}
