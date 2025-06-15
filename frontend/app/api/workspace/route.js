import { NextResponse } from "next/server";
import { getConfig } from "@/lib/getConfig";


export async function GET() {
    try {
        const { baseURl, API_KEY } = await getConfig();
        const url = `${baseURl}/workspaces`
        const response = await fetch(url, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${API_KEY}`
            }
        })
        const data = await response.json()
        return NextResponse.json({ data })
    } catch (error) {
        console.log(error);

        return NextResponse.json({ error }, { status: 500 })

    }
}