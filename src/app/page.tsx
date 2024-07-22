import Link from 'next/link';
import { fetchTopStories } from "@/app/utils/fetchTopStories";

export default async function Home() {
    const stories = await fetchTopStories();

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Hacker News Top Stories</h1>
            <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                { stories.map( ( story ) => (
                    <li key={story.id} className="mb-2">
                        <Link
                            href={`/story/${story.id}`}
                            className="block p-4 border rounded-lg shadow hover:shadow-lg transition-shadow duration-200 h-full"
                        >
                            <h2 className="text-xl font-semibold mb-2">{story.title}</h2>
                            <p className="text-gray-600">By: {story.by}</p>
                            <p className="text-gray-600">Score: {story.score}</p>
                        </Link>
                    </li>
                ) ) }
            </ul>
        </div>
    );
}
