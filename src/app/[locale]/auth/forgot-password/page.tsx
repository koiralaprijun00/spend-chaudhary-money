'use client';

import { useState, ChangeEvent, FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { FiAlertCircle, FiCheckCircle, FiMail } from 'react-icons/fi';

export default function ForgotPasswordPage() {
  const t = useTranslations('Translations');
  const router = useRouter();
  
  const [email, setEmail] = useState('');
  const [isEmailValid, setIsEmailValid] = useState(false);
  const [emailTouched, setEmailTouched] = useState(false);
  const [emailError, setEmailError] = useState('');
  const [generalError, setGeneralError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  
  // Email validation regex
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  
  const handleEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setEmail(value);
    
    // Validate email
    const isValid = emailRegex.test(value);
    setIsEmailValid(isValid);
    
    // Clear errors
    if (emailError) setEmailError('');
    if (generalError) setGeneralError('');
  };
  
  const handleBlur = () => {
    setEmailTouched(true);
    
    // Validate on blur
    if (!email) {
      setEmailError(t('emailRequired', { fallback: 'Email is required' }));
      setIsEmailValid(false);
    } else if (!emailRegex.test(email)) {
      setEmailError(t('emailInvalid', { fallback: 'Please enter a valid email address' }));
      setIsEmailValid(false);
    } else {
      setEmailError('');
      setIsEmailValid(true);
    }
  };
  
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    // Final validation before submission
    if (!email) {
      setEmailError(t('emailRequired', { fallback: 'Email is required' }));
      setEmailTouched(true);
      return;
    }
    
    if (!isEmailValid) {
      setEmailError(t('emailInvalid', { fallback: 'Please enter a valid email address' }));
      return;
    }
    
    setIsLoading(true);
    
    try {
      const response = await fetch('/api/auth/reset-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
      
      const data = await response.json();
      
      if (response.ok) {
        setIsSuccess(true);
      } else {
        setGeneralError(data.error || t('resetPasswordError', { 
          fallback: 'Failed to send password reset email. Please try again.'
        }));
      }
    } catch (error: any) {
      setGeneralError(error.message || t('resetPasswordError', { 
        fallback: 'Failed to send password reset email. Please try again.'
      }));
    } finally {
      setIsLoading(false);
    }
  };
  
  return (
    <div className="flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 relative">
        <div className="bg-white shadow-xl rounded-2xl overflow-hidden">
          {/* Header with gradient */}
          <div className="bg-gradient-to-r from-blue-600 to-red-500 px-6 py-8 text-white">
            <h2 className="text-2xl font-bold">
              {t('resetPassword', { fallback: 'Reset Password' })}
            </h2>
          </div>
          
          {/* Form Body */}
          <div className="px-6 py-8">
            {isSuccess ? (
              <div className="text-center">
                <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100">
                  <FiCheckCircle className="h-6 w-6 text-green-600" />
                </div>
                <h3 className="mt-2 text-lg font-medium text-gray-900">
                  {t('resetEmailSent', { fallback: 'Reset Email Sent' })}
                </h3>
                <p className="mt-2 text-sm text-gray-600">
                  {t('resetEmailInstructions', { 
                    fallback: 'We\'ve sent a password reset link to your email address. Please check your inbox and follow the instructions to reset your password.'
                  })}
                </p>
                <div className="mt-6">
                  <Link
                    href="/auth/signin"
                    className="w-full inline-flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  >
                    {t('backToSignIn', { fallback: 'Back to Sign In' })}
                  </Link>
                </div>
              </div>
            ) : (
              <>
                <p className="mb-6 text-sm text-gray-600">
                  {t('forgotPasswordInstructions', { 
                    fallback: 'Enter your email address and we\'ll send you a link to reset your password.'
                  })}
                </p>
                
                {generalError && (
                  <div className="mb-6 p-4 bg-red-50 border-l-4 border-red-500 text-red-700 rounded-md flex items-start">
                    <FiAlertCircle className="mr-3 mt-0.5 flex-shrink-0" />
                    <span>{generalError}</span>
                  </div>
                )}
                
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                      {t('email', { fallback: 'Email' })}
                    </label>
                    <div className="relative">
                      <input
                        id="email"
                        name="email"
                        type="email"
                        value={email}
                        onChange={handleEmailChange}
                        onBlur={handleBlur}
                        className={`block w-full rounded-lg px-4 py-3 border focus:ring-2 focus:ring-opacity-50 focus:outline-none transition-colors ${
                          emailTouched && emailError
                            ? 'border-red-300 focus:border-red-500 focus:ring-red-200'
                            : emailTouched && isEmailValid
                              ? 'border-green-300 focus:border-green-500 focus:ring-green-200'
                              : 'border-gray-300 focus:border-blue-500 focus:ring-blue-200'
                        }`}
                        placeholder={t('emailPlaceholder', { fallback: 'your.email@example.com' })}
                      />
                      {emailTouched && email && (
                        <div className="absolute right-3 top-3">
                          {emailError
                            ? <FiAlertCircle className="text-red-500" />
                            : <FiCheckCircle className="text-green-500" />
                          }
                        </div>
                      )}
                    </div>
                    {emailTouched && emailError && (
                      <p className="mt-2 text-sm text-red-600">{emailError}</p>
                    )}
                  </div>
                  
                  <button
                    type="submit"
                    disabled={isLoading || !isEmailValid}
                    className="w-full flex justify-center py-3 px-12 rounded-lg shadow-sm text-white bg-gradient-to-r from-blue-600 to-red-500 hover:from-blue-700 hover:to-red-600 font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 transition-all duration-200"
                  >
                    {isLoading ? (
                      <>
                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        {t('sendingLink', { fallback: 'Sending Reset Link...' })}
                      </>
                    ) : (
                      <>
                        <FiMail className="mr-2 h-5 w-5" />
                        {t('sendResetLink', { fallback: 'Send Reset Link' })}
                      </>
                    )}
                  </button>
                  
                  <div className="text-center">
                    <Link
                      href="/auth/signin"
                      className="text-sm font-medium text-blue-600 hover:text-blue-500 transition-colors"
                    >
                      {t('backToSignIn', { fallback: 'Back to Sign In' })}
                    </Link>
                  </div>
                </form>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
} 