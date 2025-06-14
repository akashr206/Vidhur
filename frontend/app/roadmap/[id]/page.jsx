import ChapterDisplay from "@/components/ChapterDisplay";

function Home({ params }) {
    const { id } = params;

    return (
        <ChapterDisplay id={id}></ChapterDisplay>
    )
}

export default Home