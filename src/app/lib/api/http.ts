const http = {
	get: async <T>( endpoint: string, query: string = '' ): Promise<T> => {
		const response = await fetch( `${endpoint}?${query}` );

		return await response.json();
	},
	post: async <T>( endpoint: string, body: any ): Promise<T> => {
		const response = await fetch( `${endpoint}`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify( body ),
		} );

		return await response.json();
	},
};

export { http };
