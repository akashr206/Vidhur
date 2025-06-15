"use client";
import { useState, useEffect, use } from "react"
import { useSearchParams, useRouter } from 'next/navigation';
import { ChevronLeft, ChevronRight, Home, Book, FileText } from 'lucide-react';
import Markdown from "@/components/Markdown";
import { Button } from "@/components/ui/button";
import { Breadcrumb, BreadcrumbList, BreadcrumbItem, BreadcrumbLink, BreadcrumbSeparator, BreadcrumbPage } from "@/components/ui/breadcrumb";
import { Progress } from "@/components/ui/progress";
const page = ({ params }) => {
    const searchParams = useSearchParams();
    const router = useRouter();
    const [subtopicData, setSubtopicData] = useState(null);
    const [chapterData, setChapterData] = useState(null);
    const [loading, setLoading] = useState(true);
    const subtopic = searchParams.get('subtopic') || "1";
    const { id, number } = use(params) || {};

    const fetchSubtopic = async (subtopic) => {
        try {
            setLoading(true);
            const response = await fetch(`/api/chapter/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ subtopicNumber: Number(subtopic), id, number: Number(number) }),
            });
            if (!response.ok) {
                throw new Error("Network response was not ok");
            }
            const data = await response.json();
            setSubtopicData(data.data);
            setChapterData(data.chapter);

        } catch (error) {
            console.error("Failed to fetch subtopic:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleNavigation = (newSubtopic) => {
        const params = new URLSearchParams(searchParams);
        params.set('subtopic', newSubtopic.toString());
        router.push(`?${params.toString()}`);
    };

    const canGoPrevious = () => Number(subtopic) > 1;
    const canGoNext = () => {
        return Number(subtopic) < chapterData?.topics.length;
    };

    useEffect(() => {
        if (subtopic && id && number) {
            fetchSubtopic(subtopic)
        }
    }, [id, number, subtopic]);

    if (loading) {
        return (
            <div className="w-[calc(100vw-340px)] mx-auto p-4">
                <div className="max-w-3xl mx-auto">
                    <div className="animate-pulse">
                        <div className="h-4 bg-gray-200 rounded w-1/3 mb-4"></div>
                        <div className="h-8 bg-gray-200 rounded w-2/3 mb-6"></div>
                        <div className="space-y-3">
                            <div className="h-4 bg-gray-200 rounded"></div>
                            <div className="h-4 bg-gray-200 rounded w-5/6"></div>
                            <div className="h-4 bg-gray-200 rounded w-4/6"></div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="w-[calc(100vw-340px)] p-5">
            <Breadcrumb className="px-3">
                <BreadcrumbList>
                    <BreadcrumbItem>
                        <BreadcrumbLink href="/">Home</BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                        <BreadcrumbLink href="/roadmap">Roadmaps</BreadcrumbLink>
                        <BreadcrumbPage></BreadcrumbPage>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                        <BreadcrumbLink href={`/roadmap/${id}/${chapterData}`}>{chapterData.title}</BreadcrumbLink>
                        <BreadcrumbPage></BreadcrumbPage>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                        <BreadcrumbLink href={`/roadmap/${id}/${chapterData}?subtopic=${subtopic}`}>{chapterData.title}</BreadcrumbLink>
                        <BreadcrumbPage></BreadcrumbPage>
                    </BreadcrumbItem>
                </BreadcrumbList>
            </Breadcrumb>
            <div className="max-w-3xl py-8 mx-auto">
                {chapterData?.title && (
                    <div className="mb-6">
                        <h1 className="text-3xl font-bold text-gray-900 mb-2">
                            {chapterData.title}
                        </h1>
                        <p className="text-gray-600 mb-2">
                            Subtopic {subtopic} of {chapterData?.topics.length || '?'}
                        </p>
                        <Progress value={(subtopic / chapterData?.topics.length) * 100} ></Progress>
                    </div>
                )}

                <div className="prose prose-lg max-w-none mb-8">
                    <Markdown content={subtopicData?.content} />
                </div>

                <div className="flex justify-between items-center pt-6 border-t border-gray-200">
                    <Button
                        variant={"outline"}
                        onClick={() => handleNavigation(Number(subtopic) - 1)}
                        disabled={!canGoPrevious()}
                    >
                        <ChevronLeft className="w-4 h-4 mr-2" />
                        Previous
                    </Button>

                    <div className="flex items-center space-x-2 text-sm text-gray-500">
                        <span>Subtopic</span>
                        <span className="bg-gray-100 px-2 py-1 rounded font-medium">
                            {subtopic}
                        </span>
                    </div>

                    <Button
                        variant={"outline"}
                        onClick={() => handleNavigation(Number(subtopic) + 1)}
                        disabled={!canGoNext()}
                    >
                        Next
                        <ChevronRight className="w-4 h-4 ml-2" />
                    </Button>
                </div>
            </div>
        </div>
    )
}

export default page