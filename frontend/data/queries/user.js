import { getDb } from "./db"; 

export function incrementStat(name) {
  const db = getDb();
  const stmt = db.prepare(`
    UPDATE stats SET count = count + 1 WHERE name = ?
  `);
  stmt.run(name);
}

export function getStat(name) {
  const db = getDb();
  const stmt = db.prepare(`
    SELECT count FROM stats WHERE name = ?
  `);
  const row = stmt.get(name);
  return row?.count ?? 0;
}

export function getAllStats() {
  const db = getDb();
  const stmt = db.prepare(`SELECT * FROM stats`);
  return stmt.all();
}
