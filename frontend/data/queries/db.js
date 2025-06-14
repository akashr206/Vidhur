import path from "path";
import Database from "better-sqlite3";

const dbPath = path.join(process.cwd(), "data", "vidhur.db");

let db;
export const getDb = () => {
    if (!db) {
        db = new Database(dbPath);
    }
    return db;
};

export const deleteTable = (table) => {
    try {
        let db = getDb();
        const stmt = db.prepare(`DROP TABLE ${table}`);
        stmt.run();
    } catch (error) {
        console.log(error);
    }
};