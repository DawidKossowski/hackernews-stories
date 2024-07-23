import React from 'react';
import { render, screen } from '@testing-library/react';
import NavbarListItem from '../NavbarListItem';

describe( 'NavbarListItem Component', () => {
	it( 'should render a Link component with the correct href and label', () => {
		render( <NavbarListItem href="/home" label="Home" /> );

		const linkElement = screen.getByText( 'Home' );

		expect( linkElement ).toBeInTheDocument();
		expect( linkElement.closest( 'a' ) ).toHaveAttribute( 'href', '/home' );
	} );

	it( 'should apply the correct classes to the Link component', () => {
		render( <NavbarListItem href="/about" label="About" /> );

		const linkElement = screen.getByText( 'About' );

		expect( linkElement ).toHaveClass( 'text-white' );
		expect( linkElement ).toHaveClass( 'hover:text-gray-400' );
	} );

} );
