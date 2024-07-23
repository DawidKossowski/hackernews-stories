import React from 'react';
import NavbarListItem from './NavbarListItem';
import Link from 'next/link';

const Navbar = () => {
	return (
		<nav className="bg-gray-800 p-4">
			<div className="container mx-auto flex justify-between items-center">
				<div className="text-white text-lg font-bold">
					<Link href="/" aria-label="Hacker News Home">
                        Hacker News
					</Link>
				</div>
				<ul className="flex space-x-4" role="menubar" aria-label="Main navigation">
					<NavbarListItem href="/" label="Home" />
					<NavbarListItem href="/feedback" label="Feedback" />
				</ul>
			</div>
		</nav>
	);
};

export default Navbar;
