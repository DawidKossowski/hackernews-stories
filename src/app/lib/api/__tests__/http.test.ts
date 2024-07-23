import { http } from '../http';

global.fetch = jest.fn();

describe( 'http', () => {
	beforeEach( () => {
		( fetch as jest.Mock ).mockClear();
	} );

	describe( 'get', () => {
		it( 'should fetch data and return the response as JSON', async () => {
			const mockData = { key: 'value' };
			( fetch as jest.Mock ).mockResolvedValueOnce( {
				json: async () => mockData,
			} );

			const endpoint = 'https://example.com/api';
			const query = 'param=value';
			const result = await http.get( endpoint, query );

			expect( fetch ).toHaveBeenCalledWith( `${endpoint}?${query}` );
			expect( result ).toEqual( mockData );
		} );

		it( 'should handle errors', async () => {
			( fetch as jest.Mock ).mockRejectedValueOnce( new Error( 'Failed to fetch' ) );

			const endpoint = 'https://example.com/api';
			const query = 'param=value';

			await expect( http.get( endpoint, query ) ).rejects.toThrow( 'Failed to fetch' );
		} );
	} );

	describe( 'post', () => {
		it( 'should post data and return the response as JSON', async () => {
			const mockData = { key: 'value' };
			( fetch as jest.Mock ).mockResolvedValueOnce( {
				json: async () => mockData,
			} );

			const endpoint = 'https://example.com/api';
			const body = { key: 'value' };
			const result = await http.post( endpoint, body );

			expect( fetch ).toHaveBeenCalledWith( endpoint, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify( body ),
			} );
			expect( result ).toEqual( mockData );
		} );

		it( 'should handle errors', async () => {
			( fetch as jest.Mock ).mockRejectedValueOnce( new Error( 'Failed to fetch' ) );

			const endpoint = 'https://example.com/api';
			const body = { key: 'value' };

			await expect( http.post( endpoint, body ) ).rejects.toThrow( 'Failed to fetch' );
		} );
	} );
} );
