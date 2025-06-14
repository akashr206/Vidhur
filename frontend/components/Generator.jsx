"use client";

import { Button } from "@/components/ui/button";
import { useState } from "react";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectScrollDownButton,
  SelectScrollUpButton,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Breadcrumb,
  BreadcrumbEllipsis,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

function Generator() {
  const [selectedExam, setSelectedExam] = useState("");

  const exams = [
    { id: "CET", name: "CET" },
    { id: "JEE_MAINS", name: "JEE MAINS" },
    { id: "JEE_ADVANCED", name: "JEE ADVANCED" },
  ];
  const [selectedLevel, setSelectedLevel] = useState("");

  const levels = [
    {
      id: "BEGINNER",
      name: "Beginner",
      description: "Just starting out with the basics",
    },
    {
      id: "INTERMEDIATE",
      name: "Intermediate",
      description: "Have some foundation knowledge",
    },
    { id: "VETERAN", name: "Veteran", description: "Strong grasp of concepts" },
  ];
  return (
    <div className="w-[calc(100vw-320px)] p-5">
      <div className="px-3">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/">Vidhur</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink href="/page">Generate</BreadcrumbLink>
           
              <BreadcrumbPage></BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>
      <div className="h-screen w-[768px]  mx-auto flex flex-col gap-7 items-center py-4">
        <div className="flex flex-col gap-2 items-center ">
          <div className="text-4xl font-bold">Course Generator</div>
          <div>Create your personalized learning journey</div>
        </div>
        <div className="flex flex-col w-full gap-1 ">
          <div className="text-xl font-bold">Concept to Learn</div>
          <div className="text-gray-400">
            What main topic would you like to learn?
          </div>
          <input
            type="text"
            placeholder="e.g., Stereochemistry, Centre of Mass, Probability"
            className="border rounded-md px-3 py-1 shadow-md"
          />
        </div>

        <div className="border w-full"></div>

        <div className="w-full flex gap-4">
          <div className="flex flex-col gap-2">
            <div className="flex gap-3">
              <div className="">
                <h2 className="text-lg font-bold mb-6 text-gray-800">
                  You are preparing for?
                </h2>

                <div className="flex flex-wrap gap-4">
                  {exams.map((exam) => (
                    <div
                      key={exam.id}
                      onClick={() => setSelectedExam(exam.id)}
                      className={`
              px-8 py-2 rounded-lg border-2 cursor-pointer transition-all duration-200 transform
              ${
                selectedExam === exam.id
                  ? "border-gray-400 bg-gray-100 text-gray-800 shadow-gray-300 shadow-lg scale-102"
                  : "border-gray-200 bg-white text-gray-700 hover:border-gray-300 hover:shadow-md "
              }
            `}
                    >
                      <div className="text-lg font-semibold text-center">
                        {exam.name}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
          <div className="flex gap-6 flex-col">
            <div>
              <h2 className="text-lg font-bold">Time Commitment</h2>
            </div>
            <div>
              <Select>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Select duration" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="2-3-hours">2-3 hours per day</SelectItem>
                  <SelectItem value="3-4-hours">3-4 hours per day</SelectItem>
                  <SelectItem value="4-5-hours">4-5 hours per day</SelectItem>
                  <SelectItem value="5-6-hours">5-6 hours per day</SelectItem>
                  <SelectItem value="6-7-hours">6-7 hours per day</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        <div className="border w-full"></div>

        <div className="w-full flex gap-4">
          <div className="flex flex-col gap-2">
            <div className="flex gap-3">
              <div className="">
                <h2 className="text-lg font-bold mb-6 text-gray-800">
                  Current Knowledge level
                </h2>

                <div className="flex flex-wrap gap-4">
                  {levels.map((level) => (
                    <div
                      key={level.id}
                      onClick={() => setSelectedLevel(level.id)}
                      className={`
              px-8 py-2 rounded-lg border-2 cursor-pointer transition-all duration-200 transform w-40
              ${
                selectedLevel === level.id
                  ? "border-gray-400 bg-gray-100 text-gray-800 shadow-gray-300 shadow-lg scale-102"
                  : "border-gray-200 bg-white text-gray-700 hover:border-gray-300 hover:shadow-md "
              }
            `}
                    >
                      <div className="text-lg font-semibold text-center">
                        {level.name}
                      </div>
                      <div className="text-xs text-center">
                        {level.description}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
          <div className="flex gap-7 flex-col">
            <div>
              <h2 className="text-lr font-bold">Target Completion TIme</h2>
            </div>
            <div>
              <Select>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Select duration" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="2-3-hours">1-week</SelectItem>
                  <SelectItem value="3-4-hours">2-weeks</SelectItem>
                  <SelectItem value="4-5-hours">3-weeks</SelectItem>
                  <SelectItem value="5-6-hours">4-weeks</SelectItem>
                  <SelectItem value="6-7-hours">5-weeks</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        <div>
          <button className="w-full px-50 cursor-pointer rounded-md py-1 bg-black text-white">
            Generate My Learning Roadmap
          </button>
        </div>
      </div>
          
    </div>
  );
}
export default Generator;
