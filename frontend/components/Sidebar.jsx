"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard } from "lucide-react";
import { TableOfContents } from "lucide-react";
import { ChevronDown } from "lucide-react";
import { Plus } from "lucide-react";
import { cn } from "@/lib/utils";
import { CornerDownRight } from "lucide-react"
import { use, useEffect, useState } from "react";

function Sidebar() {
  const pathname = usePathname();
  const isActive = (path) => {
    return pathname.includes(path) ? "bg-blue-200 dark:bg-blue-700" : "hover:bg-gray-100 hover:dark:bg-gray-800";
  };
  const [roadmaps, setRoadmaps] = useState([]);
  async function fetchRoadmaps() {
    try {
      const response = await fetch("/api/roadmap");
      if (!response.ok) {
        throw new Error("Failed to fetch roadmaps");
      }
      const data = await response.json();
      setRoadmaps(data?.roadmaps || []);
    } catch (error) {
      console.error("Error fetching roadmaps:", error);
    }
  }
  useEffect(() => {
    fetchRoadmaps();
  }, []);
  return (
    <div className="w-80 fixed h-screen bg-background border-r-2 flex flex-col  px-2">
      <div className="border-b-[2px]">
        <div className="flex items-center my-2">
          <div className="p-2">
            <img
              className=" h-10 rounded-full inline-block"
              src="/NewLogo.jpg"
              alt=""
            />
          </div>
          <div className="px-1">
            <span className="text-2xl block font-semibold ">VIDHUR</span>
            <span className="text-sm text-muted-foreground">
              AI POWERED IIT JEE TUTOR
            </span>
          </div>
        </div>
      </div>
      <div className="flex gap-2 flex-col px-3 py-3">
        <Link href={"/dashboard"}>
          <div
            className={cn("flex gap-3  p-3 rounded-md ", isActive("dashboard"))}
          >
            {" "}
            <LayoutDashboard></LayoutDashboard> Dashboard
          </div>
        </Link>
        <Link href={"/generate"}>
          <div
            className={cn("flex gap-3  p-3 rounded-md ", isActive("generate"))}
          >
            {" "}
            <Plus></Plus> Generate
          </div>
        </Link>

        <Link href={"/roadmap"}>
          <div
            className={cn(
              "flex gap-3  p-3 rounded-md justify-between ",
              isActive("roadmap")
            )}
          >
            <div className="flex gap-3">
              <TableOfContents></TableOfContents> Roadmaps
            </div>
            <div className={cn((pathname.includes("roadmap") || pathname.includes("chapter")) && "rotate-180", "transition-all duration-200")} >
              <ChevronDown></ChevronDown>
            </div>
          </div>
        </Link>
        <div className="flex flex-col gap-1 ml-4.5">
          {(pathname.includes("roadmap") || pathname.includes("chapter")) && roadmaps.map((roadmap) => (
            <div
              key={roadmap.id} className="flex items-center ">
              <span><CornerDownRight className="stroke-1"></CornerDownRight></span>
              <Link
                href={`/roadmap/${roadmap.id}`}
                className={cn(
                  "h-10 pt-1 rounded-md flex  items-center w-full px-3",
                  isActive(roadmap.id)
                )}
              >
                <span className="text-sm">{roadmap.title.slice(0, 30)}...</span>
              </Link>
            </div>
          ))}
        </div>
        {/* <Link href={"/tests"}>
          <div className={cn("flex gap-3  p-3 rounded-md ", isActive("dashboard"))}>
            <Brain></Brain> Tests
          </div>
        </Link> */}
      </div>
    </div>
  );
}
export default Sidebar;
