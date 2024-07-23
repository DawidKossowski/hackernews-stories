import { Story } from "@/model/story";
import { fetchStory } from "@/app/utils/fetchStory";

export const fetchTopStories = async (): Promise<Story[]> => {
    const response = await fetch( 'https://hacker-news.firebaseio.com/v0/topstories.json?print=pretty' );
    const storyIds: number[] = await response.json();

    return await Promise.all(
        storyIds.slice( 0, 9 ).map( async ( id ) => {
            return await fetchStory( id );
        } )
    );
};
