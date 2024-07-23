import React from 'react';

const Button: React.FC<React.ButtonHTMLAttributes<HTMLButtonElement>> = ( { children, ...rest } ) => {
	return (
		<button className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600" {...rest}>
			{children}
		</button>
	);
};

export default Button;
