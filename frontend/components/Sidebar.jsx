"use client"
import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard } from "lucide-react";
import { TableOfContents } from "lucide-react";
import { Plus } from "lucide-react";
import { cn } from "@/lib/utils";

function Sidebar() {
  const pathname = usePathname();
  const isActive = (path) => {
    return pathname.includes(path) ? "bg-fuchsia-100" : "";
  };
  return (
    <div className="w-80 fixed h-screen bg-background border-r-2 flex flex-col  px-2">
      <div className="border-b-[2px]">
        <div className="flex items-center my-2">
          <div className="p-2">
            <img
              className="w-10 h-10 rounded-full inline-block"
              src="logo.jpg"
              alt=""
            />
          </div>
          <div className="px-2">
            <span className="text-2xl block ">VIDHUR</span>
            <span className="text-sm text-gray-600">
              AI powered course generator
            </span>
          </div>
        </div>
      </div>
      <div className="flex gap-2 flex-col px-3 py-3">
        <Link href={"/dashboard"}>
          <div className={cn("flex gap-3  p-3 rounded-md hover:bg-gray-100", isActive("/dashboard"))}>
            {" "}
            <LayoutDashboard></LayoutDashboard> Dashboard
          </div>
        </Link>
        <Link href={"/generate"}>
          <div className={cn("flex gap-3  p-3 rounded-md hover:bg-gray-100", isActive("generate"))}>
            {" "}
            <Plus></Plus> Generate
          </div>
        </Link>

        <Link href={"/roadmap"}>
          <div className={cn("flex gap-3  p-3 rounded-md hover:bg-gray-100", isActive("roadmap"))}>
            <TableOfContents></TableOfContents> Roadmaps
          </div>
        </Link>
        {/* <Link href={"/tests"}>
          <div className={cn("flex gap-3  p-3 rounded-md hover:bg-gray-100", isActive("dashboard"))}>
            <Brain></Brain> Tests
          </div>
        </Link> */}
      </div>
    </div>
  );
}
export default Sidebar;
