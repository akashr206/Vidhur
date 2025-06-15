import { NextResponse } from "next/server";
import { getAllStats } from "@/data/queries/user";
export async function GET() {
    try {
        const dashboardData = await getAllStats()
        return NextResponse.json({ data: dashboardData }, { status: 200 });
    } catch (error) {
        console.error("Error fetching dashboard data:", error);
        return NextResponse.json({ error: "Failed to fetch dashboard data" }, { status: 500 });
    }
}