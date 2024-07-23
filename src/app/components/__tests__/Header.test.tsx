import React from 'react';
import { act, render, screen } from '@testing-library/react';
import Header, { HeaderLevel } from '../Header';

describe( 'Header Component', () => {
	it( 'should render the correct heading level based on the level prop', () => {
		act( () => render( <Header level={HeaderLevel.H1}>Heading 1</Header> ) );

		const headingElement = screen.getByText( 'Heading 1' );

		expect( headingElement.tagName ).toBe( 'H1' );
	} );

	it( 'should render <h2> when level is HeaderLevel.H2', () => {
		render( <Header level={HeaderLevel.H2}>Heading 2</Header> );

		const headingElement = screen.getByText( 'Heading 2' );

		expect( headingElement.tagName ).toBe( 'H2' );
	} );

	it( 'should apply the correct base classes based on the level prop', () => {
		const { container } = render( <Header level={HeaderLevel.H1}>Heading with classes</Header> );

		const headingElement = container.querySelector( 'h1' );

		expect( headingElement ).toHaveClass( 'text-2xl font-bold mb-4' );
	} );

	it( 'should spread additional props to the heading element', () => {
		render( <Header level={HeaderLevel.H1} data-testid="header-element">Header with data-testid</Header> );

		const headingElement = screen.getByTestId( 'header-element' );

		expect( headingElement ).toBeInTheDocument();
	} );
} );
