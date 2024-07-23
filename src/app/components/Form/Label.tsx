import React from 'react';

const Label: React.FC<React.LabelHTMLAttributes<HTMLLabelElement>> = ( { children, ...rest } ) => {
	return (
		<label className="block text-gray-700" {...rest}>
			{children}
		</label>
	);
};

export default Label;
