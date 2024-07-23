import React from 'react';
import { render, screen } from '@testing-library/react';
import Textarea from '../Textarea';

describe( 'Textarea Component', () => {
	it( 'should render a Label component with the correct htmlFor and text', () => {
		const { container } = render( <Textarea id="test-id" label="Test Label" /> );

		const labelElement = container.querySelector( 'label' );

		expect( labelElement ).toBeInTheDocument();
		expect( labelElement ).toHaveAttribute( 'for', 'test-id' );
	} );

	it( 'should render a textarea element with the correct id and default classes', () => {
		const { container } = render( <Textarea id="test-id" label="Test Label" /> );

		const textareaElement = container.querySelector( 'textarea' );

		expect( textareaElement ).toBeInTheDocument();
		expect( textareaElement ).toHaveAttribute( 'id', 'test-id' );
		expect( textareaElement ).toHaveClass( 'border rounded w-full py-2 px-3' );
	} );

	it( 'should handle additional props on the textarea element', () => {
		render( <Textarea id="test-id" label="Test Label" placeholder="Enter text" /> );

		const textareaElement = screen.getByPlaceholderText( 'Enter text' );

		expect( textareaElement ).toBeInTheDocument();
	} );
} );
