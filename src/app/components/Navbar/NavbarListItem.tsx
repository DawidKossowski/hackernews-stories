import React from 'react';
import Link from 'next/link';

interface NavbarItemProps {
    href: string;
    label: string;
    ariaCurrent?: boolean;
}

const NavbarListItem: React.FC<NavbarItemProps> = ( { href, label, ariaCurrent = false } ) => {
    return (
        <li role="none">
            <Link href={ href } role="menuitem" className="text-white hover:text-gray-400">
                { label }
            </Link>
        </li>
    );
};

export default NavbarListItem;
