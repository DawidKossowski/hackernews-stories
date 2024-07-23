import React from 'react';
import { render, screen } from '@testing-library/react';
import Input from '../Input';

describe( 'Input Component', () => {
	it( 'should render a Label component with the correct htmlFor and text', () => {
		const { container } = render( <Input id="test-id" label="Test Label" /> );

		const labelElement = container.querySelector( 'label' );

		expect( labelElement ).toBeInTheDocument();
		expect( labelElement ).toHaveAttribute( 'for', 'test-id' );
	} );

	it( 'should render an input element with the correct id and default classes', () => {
		const { container } = render( <Input id="test-id" label="Test Label" /> );

		const inputElement = container.querySelector( 'input' );

		expect( inputElement ).toBeInTheDocument();
		expect( inputElement ).toHaveAttribute( 'id', 'test-id' );
		expect( inputElement ).toHaveClass( 'border rounded w-full py-2 px-3' );
	} );

	it( 'should handle additional props on the input element', () => {
		render( <Input id="test-id" label="Test Label" placeholder="Enter text" /> );

		const inputElement = screen.getByPlaceholderText( 'Enter text' );

		expect( inputElement ).toBeInTheDocument();
	} );
} );
