'use client';

import { useState, useEffect, ChangeEvent, FormEvent } from 'react';
import { signIn } from 'next-auth/react';
import { useSearchParams, useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { FcGoogle } from 'react-icons/fc';
import { FiEye, FiEyeOff, FiAlertCircle, FiCheckCircle } from 'react-icons/fi';
import { signInWithEmail } from '@/app/lib/firebase-auth';

interface FormData {
  email: string;
  password: string;
}

interface FormErrors {
  email: string;
  password: string;
  general: string;
}

interface FormTouched {
  email: boolean;
  password: boolean;
}

export default function SignInPage() {
  const t = useTranslations('Translations');
  const searchParams = useSearchParams();
  const router = useRouter();
  const callbackUrl = searchParams.get('callbackUrl') || '/';
  
  const [formData, setFormData] = useState<FormData>({
    email: '',
    password: ''
  });
  
  const [errors, setErrors] = useState<FormErrors>({
    email: '',
    password: '',
    general: ''
  });
  
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formTouched, setFormTouched] = useState<FormTouched>({
    email: false,
    password: false
  });

  // Email validation regex
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  // Check for error in URL params (e.g., from failed NextAuth callback)
  useEffect(() => {
    const errorParam = searchParams.get('error');
    if (errorParam) {
      let errorMessage;
      
      switch (errorParam) {
        case 'CredentialsSignin':
          errorMessage = t('invalidCredentials', { fallback: 'Invalid email or password. Please try again.' });
          break;
        case 'OAuthAccountNotLinked':
          errorMessage = t('accountNotLinked', { fallback: 'To confirm your identity, sign in with the same account you used originally.' });
          break;
        case 'EmailSignin':
          errorMessage = t('emailSignInError', { fallback: 'Failed to send login email. Please try again.' });
          break;
        case 'OAuthSignin':
        case 'OAuthCallback':
        case 'OAuthCreateAccount':
        case 'Callback':
          errorMessage = t('authError', { fallback: 'There was a problem with the authentication service. Please try again.' });
          break;
        default:
          errorMessage = t('loginError', { fallback: 'An error occurred during login. Please try again.' });
      }
      
      setErrors(prev => ({
        ...prev,
        general: errorMessage
      }));
    }
  }, [searchParams, t]);

  // Handle form input changes
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
    
    // Mark field as touched
    if (!formTouched[name as keyof FormTouched]) {
      setFormTouched({
        ...formTouched,
        [name]: true
      });
    }
    
    // Clear specific error when user starts typing
    if (errors[name as keyof FormErrors]) {
      setErrors({
        ...errors,
        [name]: ''
      });
    }

    // Clear general error when user changes any field
    if (errors.general) {
      setErrors({
        ...errors,
        general: ''
      });
    }
  };

  // Validate specific field
  const validateField = (name: keyof FormData) => {
    let newErrors = { ...errors };
    
    switch (name) {
      case 'email':
        if (!formData.email) {
          newErrors.email = t('emailRequired', { fallback: 'Email is required' });
        } else if (!emailRegex.test(formData.email)) {
          newErrors.email = t('emailInvalid', { fallback: 'Please enter a valid email address' });
        } else {
          newErrors.email = '';
        }
        break;
        
      case 'password':
        if (!formData.password) {
          newErrors.password = t('passwordRequired', { fallback: 'Password is required' });
        } else {
          newErrors.password = '';
        }
        break;
        
      default:
        break;
    }
    
    setErrors(newErrors);
    return !newErrors[name]; // Return true if there's no error
  };

  // Handle field blur for validation
  const handleBlur = (e: ChangeEvent<HTMLInputElement>) => {
    const { name } = e.target;
    setFormTouched({
      ...formTouched,
      [name]: true
    });
    validateField(name as keyof FormData);
  };

  // Validate all fields
  const validateForm = () => {
    // Mark all fields as touched
    setFormTouched({
      email: true,
      password: true
    });
    
    // Validate each field
    const isEmailValid = validateField('email');
    const isPasswordValid = validateField('password');
    
    return isEmailValid && isPasswordValid;
  };

  // Handle email sign in
  const handleEmailSignIn = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    // Reset errors
    setErrors({
      ...errors,
      general: ''
    });
    
    // Validate form
    if (!validateForm()) {
      return;
    }
    
    setIsLoading(true);
    
    try {
      const result = await signInWithEmail(formData.email, formData.password);
      
      if (result.success) {
        const signInResult = await signIn('credentials', {
          email: formData.email,
          password: formData.password,
          redirect: false
        });
        
        if (signInResult?.error) {
          throw new Error(signInResult.error);
        }
        
        router.push('/');
      } else {
        setErrors({
          ...errors,
          general: result.error || t('signInError', { fallback: 'Failed to sign in. Please try again.' })
        });
      }
    } catch (error: any) {
      setErrors({
        ...errors,
        general: error.message || t('signInError', { fallback: 'Failed to sign in. Please try again.' })
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Function to handle "forgot password" flow
  const handleForgotPassword = () => {
    router.push('/auth/forgot-password');
  };

  return (
    <div className="flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-lg w-full space-y-8 relative">
        <div className="bg-white shadow-xl rounded-2xl overflow-hidden">
          {/* Header with gradient */}
          <div className="bg-gradient-to-r from-blue-600 to-red-500 px-6 py-8 text-white">
            <h2 className="text-2xl font-bold">
              {t('signInToAccount', { fallback: 'Sign in to your account' })}
            </h2>
          </div>
          
          {/* Form Body */}
          <div className="px-6 py-8">
            <button
              type="button"
              onClick={async () => {
                try {
                  setIsLoading(true);
                  setErrors({ ...errors, general: '' });
                  // Always redirect Google sign-in to the homepage for the current locale
                  const locale = window.location.pathname.split('/')[1] || 'en';
                  const homepage = `/${locale}`;
                  
                  const result = await signIn('google', { 
                    callbackUrl: homepage,
                    redirect: false
                  });
                  
                  if (result?.error) {
                    setErrors({
                      ...errors,
                      general: t('googleSignInError', { 
                        fallback: 'Failed to sign in with Google. Please try again.' 
                      })
                    });
                  } else if (result?.url) {
                    router.push(result.url);
                  }
                } catch (error) {
                  setErrors({
                    ...errors,
                    general: t('googleSignInError', { 
                      fallback: 'An error occurred during Google sign in. Please try again.' 
                    })
                  });
                } finally {
                  setIsLoading(false);
                }
              }}
              disabled={isLoading}
              className="mb-6 inline-flex items-center justify-center py-3 px-16 border border-gray-300 rounded-lg shadow-sm bg-white text-gray-700 hover:bg-gray-100 font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors disabled:opacity-50 w-full"
            >
              {isLoading ? (
                <>
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-gray-700" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  {t('signingIn', { fallback: 'Signing in...' })}
                </>
              ) : (
                <>
                  <FcGoogle className="w-5 h-5 mr-2" />
                  {t('signInWithGoogle', { fallback: 'Sign in with Google' })}
                </>
              )}
            </button>

            {errors.general && (
              <div className="mb-6 p-4 bg-red-50 border-l-4 border-red-500 text-red-700 rounded-md flex items-start">
                <FiAlertCircle className="mr-3 mt-0.5 flex-shrink-0" />
                <span>{errors.general}</span>
              </div>
            )}

            <form onSubmit={handleEmailSignIn} className="space-y-6">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                  {t('email', { fallback: 'Email' })}
                </label>
                <div className="relative">
                  <input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className={`block w-full rounded-lg px-4 py-3 border focus:ring-2 focus:ring-opacity-50 focus:outline-none transition-colors ${
                      formTouched.email && errors.email 
                        ? 'border-red-300 focus:border-red-500 focus:ring-red-200' 
                        : formTouched.email && !errors.email && formData.email
                          ? 'border-green-300 focus:border-green-500 focus:ring-green-200'
                          : 'border-gray-300 focus:border-blue-500 focus:ring-blue-200'
                    }`}
                    placeholder={t('emailPlaceholder', { fallback: 'your.email@example.com' })}
                  />
                  {formTouched.email && formData.email && (
                    <div className="absolute right-3 top-3">
                      {errors.email 
                        ? <FiAlertCircle className="text-red-500" />
                        : <FiCheckCircle className="text-green-500" />
                      }
                    </div>
                  )}
                </div>
                {formTouched.email && errors.email && (
                  <p className="mt-2 text-sm text-red-600">{errors.email}</p>
                )}
              </div>

              <div>
                <div className="flex items-center justify-between mb-1">
                  <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                    {t('password', { fallback: 'Password' })}
                  </label>
                  <button
                    type="button"
                    onClick={handleForgotPassword}
                    className="text-sm font-medium text-blue-600 hover:text-blue-500 transition-colors"
                  >
                    {t('forgotPassword', { fallback: 'Forgot password?' })}
                  </button>
                </div>
                <div className="relative">
                  <input
                    id="password"
                    name="password"
                    type={showPassword ? 'text' : 'password'}
                    value={formData.password}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className={`block w-full rounded-lg px-4 py-3 border focus:ring-2 focus:ring-opacity-50 focus:outline-none transition-colors ${
                      formTouched.password && errors.password 
                        ? 'border-red-300 focus:border-red-500 focus:ring-red-200' 
                        : formTouched.password && !errors.password && formData.password
                          ? 'border-green-300 focus:border-green-500 focus:ring-green-200'
                          : 'border-gray-300 focus:border-blue-500 focus:ring-blue-200'
                    }`}
                    placeholder={t('passwordPlaceholder', { fallback: '••••••••' })}
                  />
                  <button
                    type="button"
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500 hover:text-gray-700"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <FiEyeOff /> : <FiEye />}
                  </button>
                </div>
                {formTouched.password && errors.password && (
                  <p className="mt-2 text-sm text-red-600">{errors.password}</p>
                )}
              </div>

              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-700">
                  {t('rememberMe', { fallback: 'Remember me' })}
                </label>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="flex justify-center w-full py-3 px-12 rounded-lg shadow-sm text-white bg-gradient-to-r from-blue-600 to-red-500 hover:from-blue-700 hover:to-red-600 font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 transition-all duration-200"
              >
                {isLoading ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    {t('signingIn', { fallback: 'Signing in...' })}
                  </>
                ) : (
                  t('signInOnly', { fallback: 'Sign In' })
                )}
              </button>
            </form>

            <div className="mt-6">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-white text-gray-500">{t('or', { fallback: 'or' })}</span>
                </div>
              </div>
            </div>

            <div className="mt-6 text-center">
              <p className="text-sm text-gray-600">
                {t('noAccount', { fallback: "Don't have an account?" })}{' '}
                <Link
                  href="/auth/register"
                  className="font-medium text-blue-600 hover:text-blue-500 transition-colors"
                >
                  {t('signUp', { fallback: 'Sign Up' })}
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}