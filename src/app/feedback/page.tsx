'use client'

import React, { useState } from 'react';

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
                <p className="text-green-500 mb-4" aria-live="polite">
                    Thank you for your feedback!
                </p>
            );
        }

        if ( error ) {
            return (
                <p className="text-red-500 mb-4" aria-live="polite">
                    { error }
                </p>
            );
        }

        return null;
    };

    return (
        <div className="container mx-auto p-4 max-w-3xl">
            <h1 className="text-2xl font-bold mb-4">Feedback</h1>

            <div aria-live="polite">
                { renderMessage() }
            </div>

            <form onSubmit={ handleSubmit } className="space-y-4">
                <div>
                    <label htmlFor="name" className="block text-gray-700">Name</label>
                    <input
                        id="name"
                        type="text"
                        value={name}
                        onChange={ e => setName( e.target.value ) }
                        className="border rounded w-full py-2 px-3"
                        aria-required="true"
                    />
                </div>
                <div>
                    <label htmlFor="email" className="block text-gray-700">Email</label>
                    <input
                        id="email"
                        type="email"
                        value={email}
                        onChange={ e => setEmail( e.target.value ) }
                        className="border rounded w-full py-2 px-3"
                        aria-required="true"
                    />
                </div>
                <div>
                    <label htmlFor="feedback" className="block text-gray-700">Feedback</label>
                    <textarea
                        id="feedback"
                        value={feedback}
                        onChange={ e => setFeedback( e.target.value ) }
                        className="border rounded w-full py-2 px-3"
                        aria-required="true"
                    />
                </div>
                <button
                    type="submit"
                    className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
                    aria-label="Submit feedback"
                >
                    Submit
                </button>
            </form>
        </div>
    );
};

export default FeedbackPage;
