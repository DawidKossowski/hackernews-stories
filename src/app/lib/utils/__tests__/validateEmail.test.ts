import { validateEmail } from '../validateEmail';

describe( 'validateEmail', () => {
	it( 'should return true for valid email addresses', () => {
		const validEmails = [
			'test@example.com',
			'user.name+tag+sorting@example.com',
			'user@example.co.in',
			'user@subdomain.example.com'
		];

		validEmails.forEach( email => {
			expect( validateEmail( email ) ).toBe( true );
		} );
	} );

	it( 'should return false for invalid email addresses', () => {
		const invalidEmails = [
			'plainaddress',
			'@missingusername.com',
			'username@.com',
			'username@missingtld',
			'username@domain.c'
		];

		invalidEmails.forEach( email => {
			expect( validateEmail( email ) ).toBe( false );
		} );
	} );

	it( 'should return false for an empty string', () => {
		expect( validateEmail( '' ) ).toBe( false );
	} );
} );
