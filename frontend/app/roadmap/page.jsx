"use client"
import { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
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
    console.log(result);

    setData(result?.roadmaps);

  }
  useEffect(() => {
    fetchData()
  }, []);
  return (
    <div className="p-20 gap-3 flex flex-wrap justify-evenly">
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
  );
};

export default page;
