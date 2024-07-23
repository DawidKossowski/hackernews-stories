// src/app/pages/FeedbackPage.test.tsx
import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import FeedbackPage from '../page';
import { http } from '@/app/lib/api/http';

jest.mock( '@/app/lib/api/http', () => ( {
	http: {
		post: jest.fn(),
	},
} ) );

describe( 'FeedbackPage Component', () => {
	beforeEach( () => {
		jest.clearAllMocks();
	} );

	it( 'should render all form fields and components', () => {
		render( <FeedbackPage /> );

		expect( screen.getByLabelText( 'Name' ) ).toBeInTheDocument();
		expect( screen.getByLabelText( 'Email' ) ).toBeInTheDocument();
		expect( screen.getByLabelText( 'Feedback' ) ).toBeInTheDocument();
		expect( screen.getByRole( 'button', { name: /submit/i } ) ).toBeInTheDocument();
	} );

	it( 'should show error message for invalid email', async () => {
		render( <FeedbackPage /> );

		fireEvent.change( screen.getByLabelText( 'Name' ), { target: { value: 'John Doe' } } );
		fireEvent.change( screen.getByLabelText( 'Feedback' ), { target: { value: 'Bad job...' } } );
		fireEvent.change( screen.getByLabelText( 'Email' ), { target: { value: 'invalid-email' } } );
		fireEvent.click( screen.getByRole( 'button', { name: /submit/i } ) );

		await waitFor( () => {
			expect( screen.getByText( 'Invalid email address.' ) ).toBeInTheDocument();
		} );
	} );

	it( 'should submit form and show success message', async () => {
		( http.post as jest.Mock ).mockResolvedValue( {} );
		render( <FeedbackPage /> );

		fireEvent.change( screen.getByLabelText( 'Name' ), { target: { value: 'John Doe' } } );
		fireEvent.change( screen.getByLabelText( 'Email' ), { target: { value: 'john.doe@example.com' } } );
		fireEvent.change( screen.getByLabelText( 'Feedback' ), { target: { value: 'Great job!' } } );
		fireEvent.click( screen.getByRole( 'button', { name: /submit/i } ) );

		await waitFor( () => {
			expect( screen.getByText( 'Thank you for your feedback!' ) ).toBeInTheDocument();
		} );

		expect( screen.getByLabelText( 'Name' ) ).toHaveValue( '' );
		expect( screen.getByLabelText( 'Email' ) ).toHaveValue( '' );
		expect( screen.getByLabelText( 'Feedback' ) ).toHaveValue( '' );

		expect( http.post ).toHaveBeenCalled();
	} );

	it( 'should not submit the form if any field is empty', async () => {
		render( <FeedbackPage /> );

		fireEvent.change( screen.getByLabelText( 'Name' ), { target: { value: '' } } );
		fireEvent.change( screen.getByLabelText( 'Email' ), { target: { value: 'john.doe@example.com' } } );
		fireEvent.change( screen.getByLabelText( 'Feedback' ), { target: { value: 'Great job!' } } );
		fireEvent.click( screen.getByRole( 'button', { name: /submit/i } ) );

		expect( http.post ).not.toHaveBeenCalled();
	} );
} );
