"use client"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Clock, BookOpen, Target, CheckCircle, Play } from "lucide-react"
import { Loader2 } from "lucide-react"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"

export default function ChapterDisplay({ id }) {
  const [courseData, setCourseData] = useState(null)
  const router = useRouter()
  const [loading, setLoading] = useState(true)
  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case "BEGINNER":
        return "bg-green-100 text-green-700"
      case "INTERMEDIATE":
        return "bg-yellow-100 text-yellow-700"
      case "VETERAN":
        return "bg-blue-100 text-blue-700"
      default:
        return "bg-gray-100 text-gray-600"
    }
  }


  async function fetchRoadmap(id) {
    try {
      const response = await fetch(`/api/roadmap/${id}`);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();

      setCourseData(data.roadmap);
      setLoading(false)
    } catch (error) {
      console.error("Failed to fetch roadmap:", error);
      return null;
    }

  }
  useEffect(() => {
    fetchRoadmap(id)
  }, [id])

  return (
    <div className="min-h-screen relative p-5">
      {/* Header */}
      <div className="px-3">
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
            <BreadcrumbSeparator />

            <BreadcrumbItem>
              <BreadcrumbLink href={`/roadmap/${id}`}>{courseData?.title}</BreadcrumbLink>
              <BreadcrumbPage></BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>

      {loading && <div className="bg-gray-50/60 z-20 mx-auto flex backdrop-blur-lg h-screen items-center justify-center absolute flex-col gap-2 inset-0 ">
        <div><Loader2 className="animate-spin"></Loader2></div>
        <p>Please wait while we generate your roadmap</p>
      </div>}
      <div className=" border-b border-border">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="flex items-start justify-between">
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div>
                  <h1 className="text-3xl font-bold">{courseData?.title}</h1>
                  <p className="text-muted-foreground mt-1">{courseData?.overview}</p>
                </div>
              </div>

              <div className="flex items-center gap-6">
                <Badge className={getDifficultyColor(courseData?.level)}>{courseData?.level}</Badge>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  <span>{courseData?.weeks} weeks</span>
                </div>
                <div className="flex items-center gap-2">
                  <Target className="w-4 h-4" />
                  <span>{courseData?.hours} hours</span>
                </div>
                <div className="flex items-center gap-2 ">
                  <BookOpen className="w-4 h-4" />
                  <span>{courseData?.chapters?.length} chapters</span>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>

      {/* Course Content */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="space-y-6">
          {courseData?.chapters?.map((chapter) => (
            <Card key={chapter.chapter_number} className="overflow-hidden">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-4 mb-3">
                      <span className="text-xl font-bold">
                        Chapter {chapter.chapter_number}: {chapter.title}
                      </span>
                    </div>

                    {/* Chapter Description */}
                    <p className="text-muted-foreground leading-relaxed">{chapter.description}</p>
                  </div>

                  <div className="flex items-center gap-4 ml-6">
                    {chapter.status === "completed" && <CheckCircle className="w-5 h-5 text-green-600" />}
                  </div>
                </div>
              </CardHeader>

              <CardContent>
                <div className="flex gap-2">
                  {chapter.status !== "completed" && (
                    <Button onClick={() => router.push(`/chapter/${id}/${chapter?.chapter_number}?subtopic=1`)} className="bg-blue-600 hover:bg-blue-700 text-white flex items-center gap-2">
                      <Play className="w-4 h-4" />
                      Start Chapter
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}
