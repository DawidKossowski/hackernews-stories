import React from 'react';
import { render, screen } from '@testing-library/react';
import Text, { TextType } from '../Text';

describe( 'Text Component', () => {
	it( 'should render children correctly', () => {
		render( <Text>Sample text</Text> );

		const textElement = screen.getByText( 'Sample text' );

		expect( textElement ).toBeInTheDocument();
	} );

	it( 'should apply default class by default', () => {
		render( <Text>Default text</Text> );

		const textElement = screen.getByText( 'Default text' );

		expect( textElement ).toHaveClass( 'mb-4 text-gray-600' );
	} );

	it( 'should apply success class when type is Success', () => {
		render( <Text type={TextType.Success}>Success text</Text> );

		const textElement = screen.getByText( 'Success text' );

		expect( textElement ).toHaveClass( 'mb-4 text-green-500' );
	} );

	it( 'should apply error class when type is Error', () => {
		render( <Text type={TextType.Error}>Error text</Text> );

		const textElement = screen.getByText( 'Error text' );

		expect( textElement ).toHaveClass( 'mb-4 text-red-500' );
	} );

	it( 'should spread additional props', () => {
		render( <Text data-testid="custom-id">Text with custom data attribute</Text> );

		const textElement = screen.getByTestId( 'custom-id' );

		expect( textElement ).toBeInTheDocument();
	} );
} );
