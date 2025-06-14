import Database from "better-sqlite3";
import path from "path";
import fs from "fs";
import { NextResponse } from "next/server";
import { getDb } from "@/data/queries/db";

export async function POST(req) {
    try {
        const dbPath = path.join(process.cwd(), "data", "vidhur.db");

        if (!fs.existsSync(path.dirname(dbPath))) {
            fs.mkdirSync(path.dirname(dbPath));
        }

        const db = new Database(dbPath);

        db.exec(`
            CREATE TABLE IF NOT EXISTS roadmaps (
                id TEXT PRIMARY KEY,
                title TEXT NOT NULL,
                overview TEXT NOT NULL,
                chapters TEXT NOT NULL);`);
        db.exec(`
            CREATE TABLE IF NOT EXISTS subtopics (
                number INTEGER ,
                title TEXT NOT NULL,
                roadmapId TEXT NOT NULL,
                chapter INTEGER NOT NULL,
                content TEXT NOT NULL);`);

        db.close();
        return NextResponse.json({ message: "Table created successfully" });

    } catch (error) {
        return NextResponse.json({ error }, { status: 500 });
    }
}

export async function DELETE(req) {
    const { table } = await req.json();

    try {
        const db = getDb();
        db.prepare(`DROP TABLE IF EXISTS ${table}`).run();

        return NextResponse.json({ message: `Table '${table}' deleted successfully.` });
    } catch (error) {
        console.error('Error deleting table:', error);
        return NextResponse.json({ error: 'Failed to delete table.' }, { status: 500 });
    }
}