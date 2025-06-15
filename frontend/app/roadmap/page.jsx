"use client";
import { useEffect, useState } from "react";
import { Card, CardDescription, CardHeader } from "@/components/ui/card";
import { Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

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
    fetchData();
  }, []);
  return (
    <div className="w-[calc(100vw-340px)] ">
      <div className="p-8 pb-0">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/">Home</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink href="/page">Roadmaps</BreadcrumbLink>
              <BreadcrumbPage></BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>

      <div className=" w-max text-5xl my-4 mx-auto font-bold">Roadmaps</div>
      <div className="gap-3 flex flex-wrap justify-evenly">
        {data?.map((d, i) => (
          <Card key={i} className="max-w-96 relative">
            <CardHeader className="text-lg flex font-bold pr-16">
              <p className="flex-1">{d.title}</p>
            </CardHeader>
            <CardDescription className="px-5 text-md">
              {d.overview}
            </CardDescription>

            <span className="">
              <Link
                href={`/roadmap/${d.id}`}
                className="absolute inset-0 z-20"
              ></Link>
              <Button
                variant="ghost"
                className="cursor-pointer z-30 absolute top-4 right-4 hover:text-blue-500"
              >
                <Trash2></Trash2>
              </Button>
            </span>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default page;
