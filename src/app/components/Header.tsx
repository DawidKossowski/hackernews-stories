import React, { HTMLAttributes } from 'react';

export enum HeaderLevel {
    H1 = 1,
    H2 = 2,
    H3 = 3,
    H4 = 4,
    H5 = 5,
    H6 = 6
}

interface HeaderProps extends HTMLAttributes<HTMLHeadingElement> {
    level: HeaderLevel;
    className?: string;
}

const Header: React.FC<HeaderProps> = ( { level, children, ...rest } ) => {
	const Tag = `h${level}`;

	const baseClasses = {
		[HeaderLevel.H1]: 'text-2xl font-bold mb-4',
		[HeaderLevel.H2]: 'text-xl font-semibold mb-2',
	};

	return (
		<Tag className={baseClasses[ level ]} {...rest}>
			{children}
		</Tag>
	);
};

export default Header;
