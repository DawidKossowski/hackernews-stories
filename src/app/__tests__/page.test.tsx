import React from 'react';
import { render, screen, waitFor, act } from '@testing-library/react';
import Home from '../page';
import { fetchTopStories } from '@/app/lib/api/fetchTopStories';


jest.mock( '@/app/lib/api/fetchTopStories', () => ( {
	fetchTopStories: jest.fn(),
} ) );

describe( 'Home Component', () => {
	afterEach( () => {
		jest.clearAllMocks();
	} )

	it( 'should render the component with stories', async () => {
		const mockStories = [
			{ id: 1, title: 'Story 1', by: 'Author 1', score: 100 },
			{ id: 2, title: 'Story 2', by: 'Author 2', score: 200 },
		];


		( fetchTopStories as jest.Mock ).mockResolvedValue( mockStories );

		render( await Home() );

		await waitFor( () => {
			expect( screen.getByText( 'Hacker News Top Stories' ) ).toBeInTheDocument();
			expect( screen.getByText( 'Story 1' ) ).toBeInTheDocument();
			expect( screen.getByText( 'By: Author 1' ) ).toBeInTheDocument();
			expect( screen.getByText( 'Score: 100' ) ).toBeInTheDocument();
			expect( screen.getByText( 'Story 2' ) ).toBeInTheDocument();
			expect( screen.getByText( 'By: Author 2' ) ).toBeInTheDocument();
			expect( screen.getByText( 'Score: 200' ) ).toBeInTheDocument();
		} );
	} );

	it( 'should handle empty stories gracefully', async () => {
		( fetchTopStories as jest.Mock ).mockResolvedValue( [] );

		render( await Home() );

		await waitFor( () => {
			expect( screen.getByText( 'Hacker News Top Stories' ) ).toBeInTheDocument();
			expect( screen.queryByText( /Story 1|Story 2/i ) ).toBeNull();
		} );
	} );
} );
