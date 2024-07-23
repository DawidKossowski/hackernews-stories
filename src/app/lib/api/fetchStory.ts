import { Story } from "@/model/story";
import { http } from "@/app/lib/api/http";

export const fetchStory = async ( id: number ): Promise<Story> => {
	return http.get<Story>( `https://hacker-news.firebaseio.com/v0/item/${id}.json` );
};
