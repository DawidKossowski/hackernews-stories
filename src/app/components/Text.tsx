import React from 'react';

export enum TextType {
    Default = 'default',
    Success = 'success',
    Error = 'error'
}

interface TextProps extends React.HTMLAttributes<HTMLParagraphElement> {
    type?: TextType;
    children: React.ReactNode;
    className?: string;
}

const Text: React.FC<TextProps> = ( { type = TextType.Default, children, ...rest } ) => {
	const baseClasses = 'mb-4';

	const typeClasses = {
		[TextType.Success]: 'text-green-500',
		[TextType.Error]: 'text-red-500',
		[TextType.Default]: 'text-gray-600',
	};

	return (
		<p className={`${baseClasses} ${typeClasses[ type ]}`} {...rest}>
			{children}
		</p>
	);
};

export default Text;
