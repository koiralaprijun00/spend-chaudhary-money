'use client';

import { useState, ChangeEvent, FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { FiEye, FiEyeOff, FiAlertCircle, FiCheckCircle } from 'react-icons/fi';
import { registerWithEmail } from '@/app/lib/firebase-auth';

interface FormData {
  email: string;
  password: string;
  confirmPassword: string;
  displayName: string;
}

interface FormErrors {
  email: string;
  password: string;
  confirmPassword: string;
  displayName: string;
  general: string;
}

interface FormTouched {
  email: boolean;
  password: boolean;
  confirmPassword: boolean;
  displayName: boolean;
}

export default function RegisterPage() {
  const t = useTranslations('Translations');
  const router = useRouter();
  
  const [formData, setFormData] = useState<FormData>({
    email: '',
    password: '',
    confirmPassword: '',
    displayName: ''
  });
  
  const [errors, setErrors] = useState<FormErrors>({
    email: '',
    password: '',
    confirmPassword: '',
    displayName: '',
    general: ''
  });
  
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formTouched, setFormTouched] = useState<FormTouched>({
    email: false,
    password: false,
    confirmPassword: false,
    displayName: false
  });

  // Email validation regex
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

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
        } else if (formData.password.length < 6) {
          newErrors.password = t('passwordTooShort', { fallback: 'Password must be at least 6 characters' });
        } else {
          newErrors.password = '';
        }
        break;
        
      case 'confirmPassword':
        if (!formData.confirmPassword) {
          newErrors.confirmPassword = t('confirmPasswordRequired', { fallback: 'Please confirm your password' });
        } else if (formData.confirmPassword !== formData.password) {
          newErrors.confirmPassword = t('passwordsDoNotMatch', { fallback: 'Passwords do not match' });
        } else {
          newErrors.confirmPassword = '';
        }
        break;
        
      case 'displayName':
        if (!formData.displayName) {
          newErrors.displayName = t('displayNameRequired', { fallback: 'Display name is required' });
        } else {
          newErrors.displayName = '';
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
      password: true,
      confirmPassword: true,
      displayName: true
    });
    
    // Validate each field
    const isEmailValid = validateField('email');
    const isPasswordValid = validateField('password');
    const isConfirmPasswordValid = validateField('confirmPassword');
    const isDisplayNameValid = validateField('displayName');
    
    return isEmailValid && isPasswordValid && isConfirmPasswordValid && isDisplayNameValid;
  };

  // Handle form submission
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
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
      const result = await registerWithEmail(
        formData.email,
        formData.password,
        formData.displayName
      );
      
      if (result.success) {
        // Redirect to sign in page
        router.push('/auth/signin');
      } else {
        setErrors({
          ...errors,
          general: result.error || t('registrationError', { fallback: 'Failed to register. Please try again.' })
        });
      }
    } catch (error: any) {
      setErrors({
        ...errors,
        general: error.message || t('registrationError', { fallback: 'Failed to register. Please try again.' })
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-lg w-full space-y-8 relative">
        <div className="bg-white shadow-xl rounded-2xl overflow-hidden">
          {/* Header with gradient */}
          <div className="bg-gradient-to-r from-blue-600 to-red-500 px-6 py-8 text-white">
            <h2 className="text-2xl font-bold">
              {t('createAccount', { fallback: 'Create your account' })}
            </h2>
          </div>
          
          {/* Form Body */}
          <div className="px-6 py-8">
            {errors.general && (
              <div className="mb-6 p-4 bg-red-50 border-l-4 border-red-500 text-red-700 rounded-md flex items-start">
                <FiAlertCircle className="mr-3 mt-0.5 flex-shrink-0" />
                <span>{errors.general}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="displayName" className="block text-sm font-medium text-gray-700 mb-1">
                  {t('displayName', { fallback: 'Display Name' })}
                </label>
                <div className="relative">
                  <input
                    id="displayName"
                    name="displayName"
                    type="text"
                    value={formData.displayName}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className={`block w-full rounded-lg px-4 py-3 border focus:ring-2 focus:ring-opacity-50 focus:outline-none transition-colors ${
                      formTouched.displayName && errors.displayName 
                        ? 'border-red-300 focus:border-red-500 focus:ring-red-200' 
                        : formTouched.displayName && !errors.displayName && formData.displayName
                          ? 'border-green-300 focus:border-green-500 focus:ring-green-200'
                          : 'border-gray-300 focus:border-blue-500 focus:ring-blue-200'
                    }`}
                    placeholder={t('displayNamePlaceholder', { fallback: 'John Doe' })}
                  />
                  {formTouched.displayName && formData.displayName && (
                    <div className="absolute right-3 top-3">
                      {errors.displayName 
                        ? <FiAlertCircle className="text-red-500" />
                        : <FiCheckCircle className="text-green-500" />
                      }
                    </div>
                  )}
                </div>
                {formTouched.displayName && errors.displayName && (
                  <p className="mt-2 text-sm text-red-600">{errors.displayName}</p>
                )}
              </div>

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
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                  {t('password', { fallback: 'Password' })}
                </label>
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

              <div>
                <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">
                  {t('confirmPassword', { fallback: 'Confirm Password' })}
                </label>
                <div className="relative">
                  <input
                    id="confirmPassword"
                    name="confirmPassword"
                    type={showConfirmPassword ? 'text' : 'password'}
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className={`block w-full rounded-lg px-4 py-3 border focus:ring-2 focus:ring-opacity-50 focus:outline-none transition-colors ${
                      formTouched.confirmPassword && errors.confirmPassword 
                        ? 'border-red-300 focus:border-red-500 focus:ring-red-200' 
                        : formTouched.confirmPassword && !errors.confirmPassword && formData.confirmPassword
                          ? 'border-green-300 focus:border-green-500 focus:ring-green-200'
                          : 'border-gray-300 focus:border-blue-500 focus:ring-blue-200'
                    }`}
                    placeholder={t('confirmPasswordPlaceholder', { fallback: '••••••••' })}
                  />
                  <button
                    type="button"
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500 hover:text-gray-700"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  >
                    {showConfirmPassword ? <FiEyeOff /> : <FiEye />}
                  </button>
                </div>
                {formTouched.confirmPassword && errors.confirmPassword && (
                  <p className="mt-2 text-sm text-red-600">{errors.confirmPassword}</p>
                )}
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
                    {t('creatingAccount', { fallback: 'Creating Account...' })}
                  </>
                ) : (
                  t('createAccount', { fallback: 'Create Account' })
                )}
              </button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-sm text-gray-600">
                {t('alreadyHaveAccount', { fallback: 'Already have an account?' })}{' '}
                <Link
                  href="/auth/signin"
                  className="font-medium text-blue-600 hover:text-blue-500 transition-colors"
                >
                  {t('signIn', { fallback: 'Sign In' })}
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

