import { NextResponse } from "next/server";
import { getConfig } from "@/lib/getConfig";
import { parseJson } from "@/lib/utils";
import { getRoadmapById } from "@/data/queries/roadmap";
import { nanoid } from "nanoid";

export async function POST(req) {
    const { id, number } = await req.json();
    try {
        const { baseURl, workspaceSlug, API_KEY } = await getConfig();
        const url = `${baseURl}/workspace/${workspaceSlug}/chat`
        const systemPrompt = `You are an expert AI chapter generator. Always respond in Array JSON format with subtopics as the name and content (content should be string of md) each subtopic will be provided.\n output format : [{  "subtopic_name" : 'content....' }\n]`;

        const roadmap = await getRoadmapById(id);
        if (!roadmap) {
            return NextResponse.json({ error: "Roadmap not found" }, { status: 404 });
        }
        console.log(roadmap);
        
        // const response = await fetch(url, {
        //     method: "POST",
        //     headers: {
        //         "Content-Type": "application/json",
        //         "Authorization": `Bearer ${API_KEY}`
        //     },
        //     body: JSON.stringify({
        //         message: systemPrompt + prompt,
        //         mode: "chat",
        //         sessionId: ("example", Date.now()),
        //         attachments: [],
        //     })
        // })
        // const data = await response.json()
        // const parsedData = parseJson(data.textResponse)
        const id = nanoid(10);
        return NextResponse.json({ id })
    } catch (error) {
        console.log(error);   
        return NextResponse.json({ error }, { status: 500 })

    }
}
