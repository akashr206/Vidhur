"use client"
import {
  Card,
  CardHeader,
  CardDescription
} from "@/components/ui/card";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { use, useEffect, useState } from "react";

function Dashboard() {

  const [loading, setLoading] = useState(true);
  const [data, setData] = useState(null);
  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await fetch("/api/dashboard");
      if (!response.ok) {
        throw new Error("Failed to fetch dashboard data");
      }
      const result = await response.json();
      console.log(result);

      setData(result.data || {});
    } catch (error) {
      console.error("Error fetching dashboard data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);
  return (
    <div className="flex flex-col p-5 w-[calc(100vw-340px)]">
      <div className="px-3">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/">Home</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink href="/dashboard">Dashboard</BreadcrumbLink>

              <BreadcrumbPage></BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>
      <div>
        <div>
          <div className="flex  md:flex-wrap flex-col md:flex-row md:justify-evenly gap-3  p-5">
            <Card className="w-72 h-40 items-center">
              <CardHeader className={"w-full text-xl font-semibold text-center"}>Total Courses Generated</CardHeader>
              <CardDescription className={"text-2xl font-bold"}>{data && data[0].count}</CardDescription>
            </Card>
            <Card className="w-72 h-40 items-center">
              <CardHeader className={"w-full text-xl font-semibold text-center"}>Chat-box Requests </CardHeader>
              <CardDescription className={"text-2xl font-bold"}>{data && data[1].count}</CardDescription>
            </Card>
            <Card className="w-72 h-40 items-center">
              <CardHeader className={"w-full text-xl font-semibold text-center"}>Total Chapters </CardHeader>
              <CardDescription className={"text-2xl font-bold"}>{data && data[1].count}</CardDescription>``
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
