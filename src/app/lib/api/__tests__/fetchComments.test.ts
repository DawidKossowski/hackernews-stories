import { fetchComments } from '../fetchComments';
import { http } from '../http';
import { Comment } from '@/model/comment';

jest.mock( '../http' );

describe( 'fetchComments', () => {
	beforeEach( () => {
		jest.resetAllMocks(); // Reset mocks before each test
	} );

	it( 'should fetch comments successfully when IDs are provided', async () => {
		const mockCommentIds = [ 1, 2, 3 ];
		const mockComments: Comment[] = [
			{ id: 1, text: 'Comment 1' },
			{ id: 2, text: 'Comment 2' },
			{ id: 3, text: 'Comment 3' },
		];

		( http.get as jest.Mock ).mockResolvedValue( mockComments );

		await fetchComments( mockCommentIds );

		expect( http.get ).toHaveBeenCalledTimes( mockCommentIds.length );
		mockCommentIds.forEach( id => {
			expect( http.get ).toHaveBeenCalledWith( `https://hacker-news.firebaseio.com/v0/item/${id}.json` );
		} );
	} );

	it( 'should return an empty array when no IDs are provided', async () => {
		const result = await fetchComments( [] );

		expect( result ).toEqual( [] );
		expect( http.get ).not.toHaveBeenCalled();
	} );

	it( 'should return an empty array when IDs are undefined', async () => {
		const result = await fetchComments( undefined );

		expect( result ).toEqual( [] );
		expect( http.get ).not.toHaveBeenCalled();
	} );
} );
