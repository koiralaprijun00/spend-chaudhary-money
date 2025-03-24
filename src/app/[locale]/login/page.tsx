// src/app/[locale]/login/page.tsx
'use client';

import React, { useState } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);
  
    try {
      // First try using NextAuth
      const result = await signIn('credentials', {
        redirect: false,
        email,
        password,
      });
      
      // If successful, redirect to admin page
      if (!result?.error) {
        router.push('/geo-admin');
        router.refresh();
        return;
      }
      
      // If NextAuth fails, try fallback authentication
      try {
        const fallbackResponse = await fetch('/api/admin/fallback-auth', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email, password }),
        });
        
        const fallbackData = await fallbackResponse.json();
        
        if (fallbackResponse.ok && fallbackData.success) {
          // Store the token in localStorage
          localStorage.setItem('admin_token', fallbackData.accessToken);
          localStorage.setItem('admin_user', JSON.stringify(fallbackData.user));
          
          // Redirect to admin page
          router.push('/geo-admin');
          router.refresh();
          return;
        }
        
        // If fallback also fails, show error
        setError('Invalid email or password');
        setIsLoading(false);
      } catch (fallbackError) {
        console.error('Fallback auth error:', fallbackError);
        setError('Authentication failed. Please try again.');
        setIsLoading(false);
      }
    } catch (error) {
      console.error('Login error:', error);
      setError('An error occurred during login. Please try again.');
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-lg shadow-md">
        <div className="text-center">
          <h1 className="text-2xl font-bold">Geo Nepal Admin Login</h1>
          <p className="mt-2 text-gray-600">Please sign in to access the admin area</p>
        </div>
        
        {error && (
          <div className="p-4 mb-4 text-sm text-red-700 bg-red-100 rounded-lg">
            {error}
          </div>
        )}
        
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              className="w-full px-3 py-2 mt-1 border border-gray-300 rounded-md"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              required
              className="w-full px-3 py-2 mt-1 border border-gray-300 rounded-md"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          
          <div>
            <button
              type="submit"
              disabled={isLoading}
              className="w-full px-4 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700 disabled:bg-blue-400 disabled:cursor-not-allowed"
            >
              {isLoading ? 'Signing in...' : 'Sign in'}
            </button>
          </div>
        </form>
        
        <div className="text-center text-sm text-gray-500 mt-4">
          <p>If you continue to experience issues, please contact the site administrator.</p>
        </div>
      </div>
    </div>
  );
}