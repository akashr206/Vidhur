import { getDb } from "./db";

export const insertRoadmap = (id, title, chapters, overview) => {
    try {
        let db = getDb();
        const stmt = db.prepare(
            "INSERT INTO roadmaps (id, title, chapters, overview) VALUES(?, ? , ?, ?) "
        );
        stmt.run(id, title, JSON.stringify(chapters), overview);
        db.close();
    } catch (error) {
        console.log(error);
    }
};

export const getRoadmapById = (id) => {
    try {
        let db = getDb();
        const stmt = db.prepare("SELECT * FROM roadmaps WHERE id = ?");
        const roadmap = stmt.get(id);
        if (!roadmap) return null;
        return {
            ...roadmap,
            chapters: JSON.parse(roadmap.chapters),
        };
    } catch (error) {}
};

export const getAllRoadmaps = () => {
    try {
        let db = getDb();
        const stmt = db.prepare("SELECT * FROM roadmaps");
        const roadmaps = stmt.all();
        console.log(roadmaps);

        if (!roadmaps) return null;
        return roadmaps;
    } catch (error) {
        console.log(error);
    }
};