import { NextResponse } from "next/server";
import { getConfig } from "@/lib/getConfig";
import { getRoadmapById } from "@/data/queries/roadmap";
import { insertSubtopic, getSubtopic, getAllSubtopics } from "@/data/queries/chapter";

async function generateChapterBySubtopics(chapterTitle, subtopic) {
    const { baseURl, workspaceSlug, API_KEY } = await getConfig();
    const url = `${baseURl}/workspace/${workspaceSlug}/chat`;

    const systemPrompt = `You are an expert chapter generator for JEE Advanced, MAINS and KCET Exams. generate comprehensive course`;

    const userMessage = `Generate content for the subtopic "${subtopic}" under the chapter "${chapterTitle}". Include explanations, examples, and practical applications.`;

    try {
        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${API_KEY}`
            },
            body: JSON.stringify({
                message: `${systemPrompt}\n\n${userMessage}`,
                mode: "chat",
                sessionId: `subtopic_${Date.now()}`,
                attachments: [],
            })
        });

        if (!response.ok) {
            throw new Error(`HTTP error for subtopic "${subtopic}"! status: ${response.status}`);
        }

        const result = await response.json();
        console.log(`Generated content for subtopic "${subtopic}":`, result);

        return result.textResponse;

    } catch (error) {
        console.error(`Error generating content for subtopic "${subtopic}":`, error);
    }
}


export async function POST(req) {
    const { id, number, subtopicNumber } = await req.json();
    try {
        const roadmap = await getRoadmapById(id);

        if (!roadmap) {
            return NextResponse.json({ error: "Roadmap not found" }, { status: 404 });
        }

        const chapters = roadmap.chapters || [];
        const chapter = chapters.find(chap => chap.chapter_number === number);
        if (!chapter) {
            return NextResponse.json({ error: "Chapter not found" }, { status: 404 });
        }
        const subtopics = chapter ? chapter.topics : [];
        if (subtopicNumber < 1 || subtopicNumber > subtopics.length) {
            return NextResponse.json({ error: "Subtopic not found" }, { status: 404 });
        }
        const exists = await getSubtopic(number, subtopicNumber, id);
        console.log(exists);
        if (exists) {
            return NextResponse.json({ exists });
        }

        const data = await generateChapterBySubtopics(chapter.title, subtopics[subtopicNumber - 1]);
        insertSubtopic(
            subtopicNumber,
            subtopics[subtopicNumber - 1],
            number,
            id,
            data
        );
        return NextResponse.json({ data }, { status: 200 });
    } catch (error) {
        console.log(error);
        return NextResponse.json({ error }, { status: 500 })

    }
}


export async function GET() {
    try {
        const subtopics = getAllSubtopics();
        if (!subtopics) {
            return NextResponse.json({ error: "No roadmaps found" }, { status: 404 });
        }
        return NextResponse.json({ subtopics })
    } catch (error) {
        console.log(error);
        return NextResponse.json({ error }, { status: 500 })

    }
}