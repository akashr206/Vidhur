"use client"
import ChapterDisplay from "@/components/ChapterDisplay";
import { use } from "react";
function Home({ params }) {
    const { id } = use(params);

    return (
        <ChapterDisplay id={id}></ChapterDisplay>
    )
}

export default Home