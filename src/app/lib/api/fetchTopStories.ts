import { Story } from "@/model/story";
import { http } from "@/app/lib/api/http";
import { fetchStory } from "@/app/lib/api/fetchStory";

export const fetchTopStories = async (): Promise<Story[]> => {
	const storyIds = await http.get<number[]>( 'https://hacker-news.firebaseio.com/v0/topstories.json', 'print=pretty' );

	return await Promise.all(
		storyIds.slice( 0, 9 ).map( async ( id ) => {
			return await fetchStory( id );
		} )
	);
};
