'use client'

import React, { useState } from 'react';
import Input from "@/app/components/Form/Input";
import Textarea from "@/app/components/Form/Textarea";
import Button from "@/app/components/Button";
import Container from "@/app/components/Container";
import Text, { TextType } from "@/app/components/Text";
import Header, { HeaderLevel } from "@/app/components/Header";

const FeedbackPage = () => {
	const [ name, setName ] = useState( '' );
	const [ email, setEmail ] = useState( '' );
	const [ feedback, setFeedback ] = useState( '' );
	const [ success, setSuccess ] = useState( false );
	const [ error, setError ] = useState( '' );

	const handleSubmit = async ( e: React.FormEvent ) => {
		e.preventDefault();

		setError( '' );
		setSuccess( false );

		if ( !name || !email || !feedback ) {
			setError( 'Please fill out all fields.' );

			return;
		}

		if ( !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test( email ) ) {
			setError( 'Invalid email address.' );

			return;
		}

		const formData = { name, email, feedback };

		await fetch( 'api/submit-form', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify( formData ),
		} );

		setSuccess( true );
		setName( '' );
		setEmail( '' );
		setFeedback( '' );
	};

	const renderMessage = () => {
		if ( success ) {
			return (
				<Text type={TextType.Success}>
                    Thank you for your feedback!
				</Text>
			);
		}

		if ( error ) {
			return (
				<Text type={TextType.Error}>
					{ error }
				</Text>
			);
		}

		return null;
	};

	return (
		<Container size="small">
			<Header level={HeaderLevel.H1}>Feedback</Header>

			<div aria-live="polite">
				{renderMessage()}
			</div>

			<form onSubmit={ handleSubmit } className="space-y-4">
				<div>
					<Input
						id="name"
						label="Name"
						value={name}
						onChange={ e => setName( e.target.value )}
						aria-required="true"
					/>
				</div>
				<div>
					<Input
						id="email"
						label="Email"
						value={email}
						onChange={ e => setEmail( e.target.value )}
						aria-required="true"
					/>
				</div>
				<div>
					<Textarea
						id="feedback"
						label="Feedback"
						value={feedback}
						onChange={ e => setFeedback( e.target.value )}
						aria-required="true"
					/>
				</div>
				<Button type="submit">Submit</Button>
			</form>
		</Container>
	);
};

export default FeedbackPage;
