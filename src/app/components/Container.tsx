import React from 'react';

interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
    size?: 'small' | 'normal';
    children: React.ReactNode;
}

const Container: React.FC<ContainerProps> = ( { size = 'normal', children, ...rest } ) => {
	const baseClasses = 'container mx-auto p-4';
	const sizeClass = size === 'small' ? 'max-w-3xl' : '';

	return (
		<div className={`${baseClasses} ${sizeClass}`} {...rest}>
			{children}
		</div>
	);
};

export default Container;
