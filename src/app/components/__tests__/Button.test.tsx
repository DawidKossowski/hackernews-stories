import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Button from '../Button';

describe( 'Button Component', () => {
	it( 'should render children correctly', () => {
		render( <Button>Click Me</Button> );

		const buttonElement = screen.getByText( 'Click Me' );

		expect( buttonElement ).toBeInTheDocument();
	} );

	it( 'should apply default classes', () => {
		const { container } = render( <Button>Default</Button> );

		const buttonElement = container.querySelector( 'button' );

		expect( buttonElement ).toHaveClass( 'bg-blue-500' );
		expect( buttonElement ).toHaveClass( 'text-white' );
		expect( buttonElement ).toHaveClass( 'py-2' );
		expect( buttonElement ).toHaveClass( 'px-4' );
		expect( buttonElement ).toHaveClass( 'rounded' );
		expect( buttonElement ).toHaveClass( 'hover:bg-blue-600' );
	} );

	it( 'should handle additional props', () => {
		render( <Button data-testid="button-test" aria-label="test-button">Test Button</Button> );

		const buttonElement = screen.getByTestId( 'button-test' );

		expect( buttonElement ).toBeInTheDocument();
		expect( buttonElement ).toHaveAttribute( 'aria-label', 'test-button' );
	} );

	it( 'should handle click events', () => {
		const handleClick = jest.fn();
		render( <Button onClick={handleClick}>Click Me</Button> );

		const buttonElement = screen.getByText( 'Click Me' );
		fireEvent.click( buttonElement );

		expect( handleClick ).toHaveBeenCalledTimes( 1 );
	} );

} );
