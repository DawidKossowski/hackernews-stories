import React from 'react';
import { render, screen } from '@testing-library/react';
import Container from '../Container';

describe( 'Container Component', () => {
	it( 'should render children correctly', () => {
		render( <Container>Test Child</Container> );

		const childElement = screen.getByText( 'Test Child' );

		expect( childElement ).toBeInTheDocument();
	} );

	it( 'should apply default classes when size is not provided', () => {
		const { container } = render( <Container>Test</Container> );

		const divElement = container.querySelector( 'div' );

		expect( divElement ).toHaveClass( 'container mx-auto p-4' );
		expect( divElement ).not.toHaveClass( 'max-w-3xl' );
	} );

	it( 'should apply small size class when size is "small"', () => {
		const { container } = render( <Container size="small">Test</Container> );

		const divElement = container.querySelector( 'div' );

		expect( divElement ).toHaveClass( 'container mx-auto p-4' );
		expect( divElement ).toHaveClass( 'max-w-3xl' );
	} );

	it( 'should apply additional props to the div element', () => {
		render( <Container data-testid="container-test">Test</Container> );

		const divElement = screen.getByTestId( 'container-test' );

		expect( divElement ).toBeInTheDocument();
	} );

	it( 'should not apply any size class if an invalid size is provided', () => {
		const { container } = render( <Container size="invalid-size">Test</Container> as any );

		const divElement = container.querySelector( 'div' );

		expect( divElement ).toHaveClass( 'container mx-auto p-4' );
		expect( divElement ).not.toHaveClass( 'max-w-3xl' );
	} );

} );
