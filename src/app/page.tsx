import Link from 'next/link';
import { fetchTopStories } from "@/app/utils/fetchTopStories";
import Container from "@/app/components/Container";
import Header, { HeaderLevel } from "@/app/components/Header";
import Text from "@/app/components/Text";

export default async function Home () {
	const stories = await fetchTopStories();

	return (
		<Container>
			<Header level={HeaderLevel.H1}>Hacker News Top Stories</Header>

			<ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
				{ stories.map( ( story ) => (
					<li key={story.id} className="mb-2">
						<Link
							href={`/story/${story.id}`}
							className="block p-4 border rounded-lg shadow hover:shadow-lg transition-shadow duration-200 h-full"
						>
							<Header level={HeaderLevel.H2}>{story.title}</Header>
							<Text>By: {story.by}</Text>
							<Text>Score: {story.score}</Text>
						</Link>
					</li>
				) ) }
			</ul>
		</Container>
	);
}
