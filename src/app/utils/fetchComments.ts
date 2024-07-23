import { cache } from 'react'
import { Comment } from "@/model/comment";

export const fetchComments = cache( async ( ids?: number[] ): Promise<Comment[]> => {
	if ( !ids ) {
		return [];
	}

	return await Promise.all(
		ids.map( async ( id ) => {
			const response = await fetch( `https://hacker-news.firebaseio.com/v0/item/${id}.json` );

			return response.json();
		} )
	);
} );
