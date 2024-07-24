import React from 'react';
import { fetchStory } from "@/app/lib/api/fetchStory";
import { fetchComments } from "@/app/lib/api/fetchComments";
import parse from 'html-react-parser';
import Container from "@/app/components/Container";
import Header, { HeaderLevel } from "@/app/components/Header";
import Text from "@/app/components/Text";

const StoryPage = async ( { params: { id } }: { params: { id: number } } ) => {
	const story = await fetchStory( id );
	const comments = await fetchComments( story.kids );

	return (
		<Container size="small">
			<div className="mx-auto">
				<Header level={HeaderLevel.H1}>{story.title}</Header>
				<Text>
                    By: <span className="font-medium">{story.by}</span>
				</Text>
				<Text>
                    Score: <span className="font-medium">{story.score}</span>
				</Text>
				<Text>
                    URL:
					<a
						href={story.url}
						className="text-blue-500 hover:underline ml-1 break-words"
						aria-label={`Visit the story: ${story.title}`}
					>
						{story.url}
					</a>
				</Text>
			</div>

			<section className="mx-auto mt-6" aria-labelledby="comments-title">
				<Header level={HeaderLevel.H2} id="comments-title">Comments</Header>
				{
					comments.length ? (
						<ul className="space-y-4">
							{ comments.map( comment => comment.text && (
								<li
									key={comment.id}
									className="p-4 border rounded-lg shadow"
									role="article"
									tabIndex={ 0 }
								>
									<Text>
										By: <span className="font-medium">{comment.by}</span>
									</Text>

									<hr className="h-px my-2 bg-gray-200 border-0" />

									<div className="text-gray-800 overflow-x-auto">
										{parse( comment.text )}
									</div>
								</li>
							) ) }
						</ul>
					) : (
						<Text>There are no comments yet.</Text>
					)
				}

			</section>
		</Container>
	);
};

export default StoryPage;
