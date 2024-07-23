import React from 'react';
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/app/components/Navbar/Navbar";

const inter = Inter( { subsets: [ "latin" ] } );

export const metadata: Metadata = {
	title: "Hacker News Stories",
	description: "Explore top and latest stories from Hacker News, featuring technology, startup news, and more.",
	keywords: [ "Hacker News", "technology news", "startup news" ]
};

export default function RootLayout ( {
	children,
}: Readonly<{
  children: React.ReactNode;
}> ) {
	return (
		<html lang="en">
			<body className={inter.className}>
				<Navbar />

				{children}
			</body>
		</html>
	);
}
