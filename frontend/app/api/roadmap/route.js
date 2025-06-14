import { NextResponse } from "next/server";
import { getConfig } from "@/lib/getConfig";
import { parseJson } from "@/lib/utils";
import { insertRoadmap, getAllRoadmaps } from "@/data/queries/roadmap";
import { nanoid } from "nanoid";


export async function POST(req) {
    const { prompt } = await req.json();
    try {
        const { baseURl, workspaceSlug, API_KEY } = await getConfig();
        const url = `${baseURl}/workspace/${workspaceSlug}/chat`
        const systemPrompt = ` You are an expert AI course generator. Always respond in a JSON format with 1 chapters course title, overview, topics, and 20 - 25 words description.\n output format : { course_title : '...' \n, overview : '...'\n, chapters : [{chapter_number : 1, title : '...', topics : ['..','..']}, description : '...' \n, {...}\n ...]}`;

        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${API_KEY}`
            },
            body: JSON.stringify({
                message: systemPrompt + prompt,
                mode: "chat",
                sessionId: ("example", Date.now()),
                attachments: [],
            })
        })
        const data = await response.json()
        const parsedData = parseJson(data.textResponse)
        const id = nanoid(10);
        insertRoadmap(id, parsedData.course_title, parsedData.chapters, parsedData.overview);
        return NextResponse.json({ id })
    } catch (error) {
        console.log(error);

        return NextResponse.json({ error }, { status: 500 })

    }
}

export async function GET(req) {
    try {
        const roadmaps = getAllRoadmaps();
        if (!roadmaps) {
            return NextResponse.json({ error: "No roadmaps found" }, { status: 404 });
        }
        return NextResponse.json({ roadmaps })
    } catch (error) {
        console.log(error);

        return NextResponse.json({ error }, { status: 500 })

    }
}