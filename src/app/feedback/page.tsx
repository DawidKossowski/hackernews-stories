'use client'

import React, { useState } from 'react';
import Input from "@/app/components/Form/Input";
import Textarea from "@/app/components/Form/Textarea";
import Button from "@/app/components/Button";
import Container from "@/app/components/Container";
import Text, { TextType } from "@/app/components/Text";
import Header, { HeaderLevel } from "@/app/components/Header";
import { validateEmail } from "@/app/lib/utils/validateEmail";
import { http } from "@/app/lib/api/http";

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

		if ( !validateEmail( email ) ) {
			setError( 'Invalid email address.' );

			return;
		}

		const formData = { name, email, feedback };

		await http.post<unknown>( 'api/submit-form', formData );

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

			<form onSubmit={handleSubmit} className="space-y-4">
				<Input
					id="name"
					label="Name"
					type="text"
					value={name}
					onChange={e => setName( e.target.value )}
					required
					aria-required="true"
				/>

				<Input
					id="email"
					label="Email"
					type="email"
					value={email}
					onChange={e => setEmail( e.target.value )}
					required
					aria-required="true"
				/>

				<Textarea
					id="feedback"
					label="Feedback"
					value={feedback}
					onChange={e => setFeedback( e.target.value )}
					required
					aria-required="true"
				/>

				<Button type="submit">Submit</Button>
			</form>
		</Container>
	);
};

export default FeedbackPage;
