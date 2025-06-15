import { NextResponse } from "next/server";
import { getConfig } from "@/lib/getConfig";

export async function GET() {
  const db = await getConfig();
  const config = await getConfig();

  if (!config) {
    return NextResponse.json({ error: "Configuration not found" }, { status: 404 });
  }

  return NextResponse.json(config);
}