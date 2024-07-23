import { NextRequest } from "next/server";

export async function POST ( request: NextRequest ) {
	const formData = await request.json();

	console.log( 'Form data received:', formData );

	return new Response( JSON.stringify( { message: 'Form data logged on the server.' } ), {
		status: 200,
		headers: {
			'Content-Type': 'application/json',
		},
	} );
}
