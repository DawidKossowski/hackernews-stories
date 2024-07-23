import React from 'react';
import Link from 'next/link';

interface NavbarItemProps {
    href: string;
    label: string;
}

const NavbarListItem: React.FC<NavbarItemProps> = ( { href, label } ) => {
	return (
		<li role="none">
			<Link href={ href } role="menuitem" className="text-white hover:text-gray-400">
				{ label }
			</Link>
		</li>
	);
};

export default NavbarListItem;
