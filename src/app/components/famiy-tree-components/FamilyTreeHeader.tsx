import React from 'react';
import Link from 'next/link';

const FamilyTreeHeader = () => {
  return (
    <header className="bg-blue-500 p-4 text-white">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-xl font-bold">Vansha: Nepali Family Tree</h1>
        <nav>
          <Link href="/family-tree" className="mr-4">Home</Link>
          <Link href="/profile/me">My Tree</Link>
        </nav>
      </div>
    </header>
  );
};

export default FamilyTreeHeader;
