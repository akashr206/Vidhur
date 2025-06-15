"use client"
import { useEffect, useState } from "react";
import {
  Card,
  CardDescription,
  CardHeader,
} from "@/components/ui/card";
import { Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button";
import Link from "next/link";

const page = () => {
  const [data, setData] = useState([]);
  async function fetchData() {
    const response = await fetch("/api/roadmap");
    if (!response.ok) {
      throw new Error("Failed to fetch data");
    }
    const result = await response.json();
    setData(result?.roadmaps);

  }
  useEffect(() => {
    fetchData()
  }, []);
  return (
    <div className="w-[calc(100vw-340px)] mx-auto ">
      <div className=" w-max text-5xl my-8 mx-auto font-bold">Roadmaps</div>
      <div className="gap-3 flex flex-wrap justify-evenly">
        {data?.map((d, i) => (
          <Card key={i} className="max-w-96 relative">
            <span className=" "><Link href={`/roadmap/${d.id}`} className="absolute inset-0 z-20"></Link></span>
            <CardHeader className="text-lg flex font-bold">
              <p className="flex-1">{d.title}</p>
              <Button variant="ghost" className="cursor-pointer hover:text-red-500" ><Trash2></Trash2></Button>
            </CardHeader>
            <CardDescription className="px-5 text-md">{d.overview}</CardDescription>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default page;
