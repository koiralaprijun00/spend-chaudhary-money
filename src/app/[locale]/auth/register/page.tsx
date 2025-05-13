'use client';

import { useState, useEffect, ChangeEvent, FormEvent } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { FcGoogle } from 'react-icons/fc';
import { FiEye, FiEyeOff, FiAlertCircle, FiCheckCircle, FiLock } from 'react-icons/fi';
import Image from 'next/image';
import { registerWithEmailAndPassword } from '@/app/lib/firebase-auth';

interface FormData {
  fullName: string;
  email: string;
  password: string;
  confirmPassword: string;
}

interface FormErrors {
  fullName: string;
  email: string;
  password: string;
  confirmPassword: string;
  general: string;
}

interface FormTouched {
  fullName: boolean;
  email: boolean;
  password: boolean;
  confirmPassword: boolean;
}

interface PasswordStrength {
  score: number;
  message: string;
}

interface PasswordRequirement {
  id: string;
  label: string;
  met: boolean;
}

export default function RegisterPage() {
  const t = useTranslations('Translations');
  const router = useRouter();

  const [formData, setFormData] = useState<FormData>({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  
  const [errors, setErrors] = useState<FormErrors>({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
    general: ''
  });
  
  const [passwordStrength, setPasswordStrength] = useState<PasswordStrength>({
    score: 0,
    message: ''
  });
  
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [verificationSent, setVerificationSent] = useState(false);
  const [formTouched, setFormTouched] = useState<FormTouched>({
    fullName: false,
    email: false,
    password: false,
    confirmPassword: false
  });

  // Email validation regex
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  // Password strength requirements
  const passwordRequirements = [
    { id: 'length', label: t('passwordReqLength', { fallback: 'At least 8 characters' }), met: false },
    { id: 'uppercase', label: t('passwordReqUppercase', { fallback: 'At least 1 uppercase letter' }), met: false },
    { id: 'lowercase', label: t('passwordReqLowercase', { fallback: 'At least 1 lowercase letter' }), met: false },
    { id: 'number', label: t('passwordReqNumber', { fallback: 'At least 1 number' }), met: false },
    { id: 'special', label: t('passwordReqSpecial', { fallback: 'At least 1 special character' }), met: false }
  ];

  const [currentRequirements, setCurrentRequirements] = useState(passwordRequirements);

  // Validate password strength
  useEffect(() => {
    if (formData.password) {
      const updatedRequirements = [
        { ...passwordRequirements[0], met: formData.password.length >= 8 },
        { ...passwordRequirements[1], met: /[A-Z]/.test(formData.password) },
        { ...passwordRequirements[2], met: /[a-z]/.test(formData.password) },
        { ...passwordRequirements[3], met: /[0-9]/.test(formData.password) },
        { ...passwordRequirements[4], met: /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(formData.password) }
      ];

      setCurrentRequirements(updatedRequirements);

      const metCount = updatedRequirements.filter(req => req.met).length;
      let strength = { score: 0, message: t('passwordWeak', { fallback: 'Weak' }) };

      if (metCount === 5) {
        strength = { score: 3, message: t('passwordStrong', { fallback: 'Strong' }) };
      } else if (metCount >= 3) {
        strength = { score: 2, message: t('passwordMedium', { fallback: 'Medium' }) };
      } else if (metCount >= 1) {
        strength = { score: 1, message: t('passwordWeak', { fallback: 'Weak' }) };
      }

      setPasswordStrength(strength);
    } else {
      setPasswordStrength({ score: 0, message: '' });
      setCurrentRequirements(passwordRequirements);
    }
  }, [formData.password, t]);

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
      case 'fullName':
        if (!formData.fullName.trim()) {
          newErrors.fullName = t('fullNameRequired', { fallback: 'Full name is required' });
        } else if (formData.fullName.length < 2) {
          newErrors.fullName = t('fullNameTooShort', { fallback: 'Full name must be at least 2 characters' });
        } else {
          newErrors.fullName = '';
        }
        break;
        
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
        } else if (formData.password.length < 8) {
          newErrors.password = t('passwordTooShort', { fallback: 'Password must be at least 8 characters' });
        } else if (passwordStrength.score < 2) {
          newErrors.password = t('passwordTooWeak', { fallback: 'Password is too weak' });
        } else {
          newErrors.password = '';
        }
        break;

      case 'confirmPassword':
        if (!formData.confirmPassword) {
          newErrors.confirmPassword = t('confirmPasswordRequired', { fallback: 'Please confirm your password' });
        } else if (formData.password !== formData.confirmPassword) {
          newErrors.confirmPassword = t('passwordsDoNotMatch', { fallback: 'Passwords do not match' });
        } else {
          newErrors.confirmPassword = '';
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
      fullName: true,
      email: true,
      password: true,
      confirmPassword: true
    });

    // Validate each field
    const isFullNameValid = validateField('fullName');
    const isEmailValid = validateField('email');
    const isPasswordValid = validateField('password');
    const isConfirmPasswordValid = validateField('confirmPassword');

    return isFullNameValid && isEmailValid && isPasswordValid && isConfirmPasswordValid;
  };

  // Handle form submission
  const handleRegister = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Reset general error
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
      const result = await registerWithEmailAndPassword(
        formData.email,
        formData.password,
        formData.fullName
      );

      if (result.success) {
        // Show verification message instead of signing in
        setVerificationSent(true);
        // Optionally redirect to verification page
        // router.push('/auth/verify-email');
      } else {
        setErrors({
          ...errors,
          general: result.error || t('registrationError', { fallback: 'Registration failed. Please try again.' })
        });
      }
    } catch (error: any) {
      setErrors({
        ...errors,
        general: error.message || t('registrationError', { fallback: 'Registration failed. Please try again.' })
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Get color based on password strength
  const getStrengthColor = () => {
    switch (passwordStrength.score) {
      case 3: return 'text-green-600';
      case 2: return 'text-yellow-600';
      case 1: return 'text-red-600';
      default: return 'text-gray-400';
    }
  };

  // If verification email was sent, show success message
  if (verificationSent) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          <div className="text-center">
            <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
              {t('verificationEmailSent', { fallback: 'Verification Email Sent' })}
            </h2>
            <p className="mt-2 text-sm text-gray-600">
              {t('verificationEmailInstructions', { 
                fallback: 'Please check your email and click the verification link to complete your registration.'
              })}
            </p>
            <div className="mt-4">
              <Link 
                href="/auth/signin" 
                className="font-medium text-blue-600 hover:text-blue-500"
              >
                {t('backToSignIn', { fallback: 'Back to Sign In' })}
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-lg w-full space-y-8 relative">
        <div className="bg-white shadow-xl rounded-2xl overflow-hidden">
          {/* Header with gradient */}
          <div className="bg-gradient-to-r from-blue-600 to-red-500 px-6 py-8 text-white">
            <h2 className="text-2xl font-bold">
              {t('createAccount', { fallback: 'Create Account' })}
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
                  const result = await signIn('google', { redirect: false });
                  if (result?.error) {
                    setErrors({
                      ...errors,
                      general: t('googleSignInError', {
                        fallback: 'Failed to sign in with Google. Please try again.',
                      }),
                    });
                  } else if (result?.url) {
                    router.push(result.url);
                  }
                } catch (error) {
                  setErrors({
                    ...errors,
                    general: t('googleSignInError', {
                      fallback: 'An error occurred during Google sign in. Please try again.',
                    }),
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
                  {t('signingUp', { fallback: 'Signing up...' })}
                </>
              ) : (
                <>
                  <FcGoogle className="w-5 h-5 mr-2" />
                  {t('signUpWithGoogle', { fallback: 'Sign up with Google' })}
                </>
              )}
            </button>

            {errors.general && (
              <div className="mb-6 p-4 bg-red-50 border-l-4 border-red-500 text-red-700 rounded-md flex items-start">
                <FiAlertCircle className="mr-3 mt-0.5 flex-shrink-0" />
                <span>{errors.general}</span>
              </div>
            )}

            <form onSubmit={handleRegister} className="space-y-6">
              <div>
                <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 mb-1">
                  {t('fullName', { fallback: 'Full Name' })}
                </label>
                <div className="relative">
                  <input
                    id="fullName"
                    name="fullName"
                    type="text"
                    value={formData.fullName}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className={`block w-full rounded-lg px-4 py-3 border focus:ring-2 focus:ring-opacity-50 focus:outline-none transition-colors ${
                      formTouched.fullName && errors.fullName
                        ? 'border-red-300 focus:border-red-500 focus:ring-red-200'
                        : formTouched.fullName && !errors.fullName && formData.fullName
                          ? 'border-green-300 focus:border-green-500 focus:ring-green-200'
                          : 'border-gray-300 focus:border-blue-500 focus:ring-blue-200'
                    }`}
                    placeholder={t('fullNamePlaceholder', { fallback: 'Your full name' })}
                  />
                  {formTouched.fullName && formData.fullName && (
                    <div className="absolute right-3 top-3">
                      {errors.fullName
                        ? <FiAlertCircle className="text-red-500" />
                        : <FiCheckCircle className="text-green-500" />
                      }
                    </div>
                  )}
                </div>
                {formTouched.fullName && errors.fullName && (
                  <p className="mt-2 text-sm text-red-600">{errors.fullName}</p>
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

                {formData.password && (
                  <div className="mt-3 space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                        <div
                          className={`h-full transition-all duration-300 ${
                            passwordStrength.score === 3 ? 'bg-green-500' :
                            passwordStrength.score === 2 ? 'bg-yellow-500' :
                            passwordStrength.score === 1 ? 'bg-red-500' : 'bg-gray-200'
                          }`}
                          style={{ width: `${(passwordStrength.score / 3) * 100}%` }}
                        />
                      </div>
                      <span className={`ml-3 text-sm font-medium min-w-[60px] ${getStrengthColor()}`}>
                        {passwordStrength.message}
                      </span>
                    </div>

                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-1 text-sm">
                      {currentRequirements.map((req) => (
                        <li
                          key={req.id}
                          className={`flex items-center ${req.met ? 'text-green-600' : 'text-gray-500'}`}
                        >
                          {req.met
                            ? <FiCheckCircle className="mr-1.5 text-green-500 flex-shrink-0" />
                            : <FiAlertCircle className="mr-1.5 text-gray-400 flex-shrink-0" />
                          }
                          {req.label}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

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
                  t('signUp', { fallback: 'Sign Up' })
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
                {t('alreadyHaveAccount', { fallback: 'Already have an account?' })}{' '}
                <Link
                  href="/auth/signin"
                  className="font-medium text-blue-600 hover:text-blue-500 transition-colors"
                >
                  {t('signInOnly', { fallback: 'Sign In' })}
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

