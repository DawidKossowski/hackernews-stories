import { cache } from 'react'
import { Story } from "@/model/story";

export const fetchStory = cache( async ( id: number ): Promise<Story> => {
    const response = await fetch( `https://hacker-news.firebaseio.com/v0/item/${id}.json` );

    return  await response.json();
} );
