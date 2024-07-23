import { Comment } from "@/model/comment";
import { http } from "@/app/lib/api/http";

export const fetchComments = async ( ids?: number[] ): Promise<Comment[]> => {
	if ( !ids || !ids.length ) {
		return [];
	}

	return await Promise.all(
		ids.map( async ( id ) => http.get<Comment>( `https://hacker-news.firebaseio.com/v0/item/${id}.json` ) )
	);
};
