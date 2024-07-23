import React from 'react';
import { render, screen } from '@testing-library/react';
import Navbar from '../Navbar';

describe( 'Navbar Component', () => {
	it( 'should render the brand Link with the correct href and aria-label', () => {
		render( <Navbar /> );

		const brandLink = screen.getByLabelText( 'Hacker News Home' );

		expect( brandLink ).toBeInTheDocument();
		expect( brandLink ).toHaveAttribute( 'href', '/' );
		expect( brandLink ).toHaveTextContent( 'Hacker News' );
	} );

	it( 'should render NavbarListItem components with correct href and label', () => {
		render( <Navbar /> );

		const homeLink = screen.getByText( 'Home' );
		const feedbackLink = screen.getByText( 'Feedback' );

		expect( homeLink ).toBeInTheDocument();
		expect( homeLink.closest( 'a' ) ).toHaveAttribute( 'href', '/' );
		expect( feedbackLink ).toBeInTheDocument();
		expect( feedbackLink.closest( 'a' ) ).toHaveAttribute( 'href', '/feedback' );
	} );

	it( 'should render the ul with correct role and aria-label', () => {
		const { container } = render( <Navbar /> );

		const ulElement = container.querySelector( 'ul' );

		expect( ulElement ).toBeInTheDocument();
		expect( ulElement ).toHaveAttribute( 'role', 'menubar' );
		expect( ulElement ).toHaveAttribute( 'aria-label', 'Main navigation' );
	} );
} );
