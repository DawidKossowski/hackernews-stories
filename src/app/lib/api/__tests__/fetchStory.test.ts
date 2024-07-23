import { http } from "@/app/lib/api/http";
import { fetchStory } from "@/app/lib/api/fetchStory";

jest.mock( '@/app/lib/api/http', () => ( {
	http: {
		get: jest.fn(),
	},
} ) );

describe( 'fetchStory', () => {
	it( 'should fetch a story by ID and return it', async () => {
		const mockStory = {
			score: 10,
			id: 1,
			by: 'author',
			kids: [],
			parent: 0,
			text: 'story text',
			time: 1234567890,
			title: 'Story Title',
			type: 'story',
			url: 'https://example.com'
		};
		( http.get as jest.Mock ).mockResolvedValue( mockStory );

		const id = 1;
		const result = await fetchStory( id );

		expect( http.get ).toHaveBeenCalledWith( `https://hacker-news.firebaseio.com/v0/item/${id}.json` );
		expect( result ).toEqual( mockStory );
	} );
} );
