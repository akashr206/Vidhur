import { NextResponse } from "next/server"
import { getRoadmapById } from "@/data/queries/roadmap";

export async function GET(req, { params }) {
    const { id } = await params;
    try {
        const roadmap = getRoadmapById(id);
        if (!roadmap) {
            return NextResponse.json({ error: "Roadmap not found" }, { status: 404 });
        }

        return NextResponse.json({ roadmap });
    } catch (error) {
        console.log(error);
        return NextResponse.json({ error }, { status: 500 });
    }
}