'use client';

import { useSession, signOut } from 'next-auth/react';
import { FiUser, FiLogOut } from 'react-icons/fi';

export default function AuthStatus() {
  const { data: session, status } = useSession();

  if (status === 'loading') {
    return (
      <div className="flex items-center space-x-2 text-gray-600">
        <div className="animate-spin h-4 w-4 border-2 border-orange-500 rounded-full border-t-transparent"></div>
        <span>Loading...</span>
      </div>
    );
  }

  if (status === 'authenticated' && session?.user) {
    return (
      <div className="flex items-center space-x-4">
        <div className="flex items-center space-x-2">
          {session.user.image ? (
            <img
              src={session.user.image}
              alt={session.user.name || 'User'}
              className="w-8 h-8 rounded-full"
            />
          ) : (
            <FiUser className="w-6 h-6 text-gray-600" />
          )}
          <div>
            <p className="text-sm font-medium text-gray-900">{session.user.name}</p>
            <p className="text-xs text-gray-500">{session.user.email}</p>
          </div>
        </div>
        <button
          onClick={() => signOut()}
          className="flex items-center space-x-1 text-sm text-red-600 hover:text-red-700"
        >
          <FiLogOut className="w-4 h-4" />
          <span>Sign out</span>
        </button>
      </div>
    );
  }

  return (
    <div className="flex items-center space-x-2 text-gray-600">
      <FiUser className="w-5 h-5" />
      <span>Not signed in</span>
    </div>
  );
} 