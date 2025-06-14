import { getDb } from "./db";

export const insertSubtopic = (number, title, chapter, roadmapId, content) => {
    try {
        let db = getDb();
        const stmt = db.prepare(
            "INSERT INTO subtopics (number, title, chapter, roadmapId, content) VALUES(?, ? , ?, ?, ?) "
        );
        stmt.run(number, title, chapter, roadmapId, content);
    } catch (error) {
        console.log(error);
    }
};

export const getSubtopic = (number, chapter, roadmapId) => {
    try {
        let db = getDb();
        const stmt = db.prepare("SELECT * FROM subtopics WHERE number = ? AND chapter = ? AND roadmapId = ?");
        const subtopic = stmt.get(number, chapter, roadmapId);
        if (!subtopic) return null;
        return subtopic;
    } catch (error) { }
};

export const getAllSubtopics = () => {
    try {
        let db = getDb();
        const stmt = db.prepare("SELECT * FROM subtopics");
        const subtopics = stmt.all();

        if (!subtopics) return null;
        return subtopics;
    } catch (error) {
        console.log(error);
    }
};