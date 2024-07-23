import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import StoryPage from '../page';
import { fetchStory } from '@/app/lib/api/fetchStory';
import { fetchComments } from '@/app/lib/api/fetchComments';

jest.mock( '@/app/lib/api/fetchStory', () => ( {
	fetchStory: jest.fn(),
} ) );

jest.mock( '@/app/lib/api/fetchComments', () => ( {
	fetchComments: jest.fn(),
} ) );

describe( 'StoryPage Component', () => {
	beforeEach( () => {
		jest.clearAllMocks();
	} );

	it( 'should render story details and comments correctly', async () => {
		const mockStory = {
			id: 1,
			title: 'Sample Story Title',
			by: 'Author Name',
			score: 123,
			url: 'https://example.com',
			kids: [ 101, 102 ],
		};

		const mockComments = [
			{ id: 101, by: 'Commenter 1', text: '<p>This is a comment.</p>' },
			{ id: 102, by: 'Commenter 2', text: '<p>This is another comment.</p>' },
		];

		( fetchStory as jest.Mock ).mockResolvedValue( mockStory );
		( fetchComments as jest.Mock ).mockResolvedValue( mockComments );

		render( await StoryPage( { params: { id: 1 } }  ) );

		await waitFor( () => {
			expect( screen.getByText( 'Sample Story Title' ) ).toBeInTheDocument();
			expect( screen.getByText( 'URL:' ) ).toBeInTheDocument();
			expect( screen.getByText( 'This is a comment.' ) ).toBeInTheDocument();
			expect( screen.getByText( 'This is another comment.' ) ).toBeInTheDocument();
		} );
	} );

	it( 'should handle no comments', async () => {
		const mockStory = {
			id: 1,
			title: 'Sample Story Title',
			by: 'Author Name',
			score: 123,
			url: 'https://example.com',
			// No comments.
			kids: [],
		};

		( fetchStory as jest.Mock ).mockResolvedValue( mockStory );
		( fetchComments as jest.Mock ).mockResolvedValue( [] );

		render( await StoryPage( { params: { id: 1 } }  ) );

		await waitFor( () => {
			expect( screen.getByText( 'Sample Story Title' ) ).toBeInTheDocument();
			expect( screen.queryByText( 'There are no comments yet.' ) ).toBeInTheDocument();
		} );
	} );
} );
