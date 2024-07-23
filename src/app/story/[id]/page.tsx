import React from 'react';
import { fetchStory } from "@/app/utils/fetchStory";
import { fetchComments } from "@/app/utils/fetchComments";
import parse from 'html-react-parser';

const StoryPage = async ( { params: { id } } ) => {
    const story = await fetchStory( id );
    const comments = await fetchComments( story.kids );

    return (
        <div className="container mx-auto p-4 max-w-3xl">
            <div className="mx-auto">
                <h1 className="text-3xl font-bold mb-4">{ story.title }</h1>
                <p className="text-gray-600 mb-2">
                    By: <span className="font-medium">{ story.by }</span>
                </p>
                <p className="text-gray-600 mb-2">
                    Score: <span className="font-medium">{ story.score }</span>
                </p>
                <p className="text-gray-600 mb-2">
                    URL:
                    <a
                        href={ story.url }
                        className="text-blue-500 hover:underline ml-1 break-words"
                        aria-label={ `Visit the story: ${story.title}` }
                    >
                        { story.url }
                    </a>
                </p>
            </div>

            <section className="mx-auto mt-6" aria-labelledby="comments-title">
                <h2 id="comments-title" className="text-2xl font-bold mb-4">Comments</h2>
                <ul className="space-y-4">
                    { comments.map( comment => comment.text && (
                        <li
                            key={ comment.id }
                            className="p-4 border rounded-lg shadow"
                            role="article"
                            tabIndex={0}
                        >
                            <p className="text-gray-600 mb-2">By: <span className="font-medium">{ comment.by }</span></p>
                            <hr className="h-px my-2 bg-gray-200 border-0" />
                            <div className="text-gray-800 overflow-x-auto">
                                { parse( comment.text ) }
                            </div>
                        </li>
                    ) ) }
                </ul>
            </section>
        </div>
    );
};

export default StoryPage;
