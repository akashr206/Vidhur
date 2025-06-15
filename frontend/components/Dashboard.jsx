import { Button } from "@/components/ui/button";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Breadcrumb,
  BreadcrumbEllipsis,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

function Dashboard() {
  return (
    <div className="flex flex-col p-5 w-[calc(100vw-340px)]">
      <div className="px-3">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/">Vidhur</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink href="/page">Dashboard</BreadcrumbLink>
            
              <BreadcrumbPage></BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>
      <div>
        <div>
          <div className="flex  md:flex-wrap flex-col md:flex-row md:justify-evenly gap-3  p-5">
            <Card className="w-80 h-40">
              <CardHeader>Total Courses Generated</CardHeader>
            </Card>
            <Card className="w-80 h-40">
              <CardHeader>Quizzes Created</CardHeader>
            </Card>
            <Card className="w-80 h-40">
              <CardHeader>Total Chapters </CardHeader>
            </Card>
          </div>
          <div className="flex flex-col justify-center items-center bg-gray-100 h-120 rounded-2xl gap-4">
            <div>
              <div className="flex justify-center items-center">
                <img src="/NewLogo.jpg" alt="" className="w-20 rounded-full" />
              </div>
              <div className="text-3xl">Welcome to Vidhur</div>
            </div>
            <div className="text-gray-500 text-xl w-200">
              <center>
                Your intelligent learning platform. Create chapters, generate
                content, and build engaging quizzes to enhance your educational
                experience.
              </center>
            </div>
            <div>
              <button className="bg-black text-white py-2 px-5 rounded-md">
                Get Started
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
