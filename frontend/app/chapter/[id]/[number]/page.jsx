"use client";
import { useState, useEffect } from "react"
import { useSearchParams } from 'next/navigation';
import Markdown from "@/components/Markdown";

const page = ({ params }) => {
    const searchParams = useSearchParams();
    const subtopic = searchParams.get('subtopic') || "1";

    const fetchSubtopic = async (subtopic) => {
        try {
            const response = await fetch(`/api/chapter/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ subtopicNumber: Number(subtopic), id: params?.id, number: params?.number }),
            });
            if (!response.ok) {
                throw new Error("Network response was not ok");
            }
            const data = await response.json();
            console.log(data);
            return data;
        } catch (error) {
            console.error("Failed to fetch subtopic:", error);
            return null;
        }
    };

    useEffect(() => {
        if (subtopic && params?.id && params?.number) {
            fetchSubtopic(subtopic).then((data) => {
                if (data) {
                    console.log("Subtopic data:", data);
                }
            });
        }
    }, [params]);
    return (
        <div>
            <div>
                
            </div>
        </div>
    )
}

export default page