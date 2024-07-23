import { fetchTopStories } from '../fetchTopStories';
import { fetchStory } from '../fetchStory';
import { http } from '../http';

jest.mock( '../fetchStory' );
jest.mock( '../http' );

describe( 'fetchTopStories', () => {
	beforeEach( () => {
		jest.resetAllMocks(); // Reset mocks before each test
	} );

	it( 'should fetch top stories successfully', async () => {
		const mockStoryIds = [ 1, 2, 3 ];
		const mockStories = [
			{ id: 1, title: 'Story 1', text: 'Content 1' },
			{ id: 2, title: 'Story 2', text: 'Content 2' },
			{ id: 3, title: 'Story 3', text: 'Content 3' }
		];

		( http.get as jest.Mock ).mockResolvedValue( mockStoryIds );
		( fetchStory as jest.Mock ).mockImplementation( ( id: number ) =>
			Promise.resolve( mockStories.find( story => story.id === id )! )
		);

		const result = await fetchTopStories();

		expect( result ).toEqual( mockStories );
		expect( http.get ).toHaveBeenCalledWith( 'https://hacker-news.firebaseio.com/v0/topstories.json', 'print=pretty' );
		expect( fetchStory ).toHaveBeenCalledTimes( mockStoryIds.length );
	} );

	it( 'should handle errors from fetchStory', async () => {
		const mockStoryIds = [ 1, 2, 3 ];
		( http.get as jest.Mock ).mockResolvedValue( mockStoryIds );
		( fetchStory as jest.Mock ).mockRejectedValue( new Error( 'Story Fetch Error' ) );

		await expect( fetchTopStories() ).rejects.toThrow( 'Story Fetch Error' );
	} );
} );
