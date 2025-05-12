'use client';

import { useState, useEffect, ChangeEvent, FormEvent } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { FcGoogle } from 'react-icons/fc';
import { FiEye, FiEyeOff, FiAlertCircle, FiCheckCircle } from 'react-icons/fi';

interface FormData {
  email: string;
  password: string;
  confirmPassword: string;
}

interface FormErrors {
  email: string;
  password: string;
  confirmPassword: string;
  general: string;
}

interface FormTouched {
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
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [errors, setErrors] = useState<FormErrors>({
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
  const [formTouched, setFormTouched] = useState<FormTouched>({
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
  }, [formData.password]);

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
      email: true,
      password: true,
      confirmPassword: true
    });
    
    // Validate each field
    const isEmailValid = validateField('email');
    const isPasswordValid = validateField('password');
    const isConfirmPasswordValid = validateField('confirmPassword');
    
    return isEmailValid && isPasswordValid && isConfirmPasswordValid;
  };

  // Handle form submission
  const handleRegister = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    // Reset general error
    setErrors({
      ...errors,
      general: ''
    });
    
    // Validate all fields before submission
    if (!validateForm()) {
      return;
    }
    
    setIsLoading(true);
    
    try {
      // Here you would typically make an API call to your backend to register the user
      // For demonstration, let's simulate a network request
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Check for duplicate email (simulated)
      if (formData.email === 'test@example.com') {
        throw new Error(t('emailAlreadyExists', { fallback: 'This email is already registered' }));
      }
      
      // Simulate successful registration
      router.push('/auth/signin');
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : t('registrationError', { fallback: 'Registration failed. Please try again.' });
      setErrors({
        ...errors,
        general: errorMessage
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

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="max-w-md w-full p-8 bg-white rounded-lg shadow-md">
        <h1 className="text-2xl font-bold text-center mb-6">
          {t('createAccount', { fallback: 'Create Account' })}
        </h1>
        
        {errors.general && (
          <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-md flex items-center">
            <FiAlertCircle className="mr-2" />
            {errors.general}
          </div>
        )}

        <form onSubmit={handleRegister} className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              {t('email', { fallback: 'Email' })}
            </label>
            <div className="mt-1 relative">
              <input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                onBlur={handleBlur}
                className={`block w-full rounded-md px-3 py-2 focus:outline-none focus:ring-1 ${
                  formTouched.email && errors.email 
                    ? 'border-red-300 focus:border-red-500 focus:ring-red-500' 
                    : formTouched.email && !errors.email
                      ? 'border-green-300 focus:border-green-500 focus:ring-green-500'
                      : 'border-gray-300 focus:border-orange-500 focus:ring-orange-500'
                }`}
                placeholder={t('emailPlaceholder', { fallback: 'your.email@example.com' })}
              />
              {formTouched.email && (
                errors.email 
                  ? <FiAlertCircle className="absolute right-3 top-3 text-red-500" />
                  : <FiCheckCircle className="absolute right-3 top-3 text-green-500" />
              )}
            </div>
            {formTouched.email && errors.email && (
              <p className="mt-1 text-sm text-red-600">{errors.email}</p>
            )}
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              {t('password', { fallback: 'Password' })}
            </label>
            <div className="mt-1 relative">
              <input
                id="password"
                name="password"
                type={showPassword ? 'text' : 'password'}
                value={formData.password}
                onChange={handleChange}
                onBlur={handleBlur}
                className={`block w-full rounded-md px-3 py-2 focus:outline-none focus:ring-1 pr-10 ${
                  formTouched.password && errors.password 
                    ? 'border-red-300 focus:border-red-500 focus:ring-red-500' 
                    : formTouched.password && !errors.password && formData.password
                      ? 'border-green-300 focus:border-green-500 focus:ring-green-500'
                      : 'border-gray-300 focus:border-orange-500 focus:ring-orange-500'
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
              <div className="mt-2">
                <div className="flex items-center">
                  <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div 
                      className={`h-full ${
                        passwordStrength.score === 3 ? 'bg-green-500' : 
                        passwordStrength.score === 2 ? 'bg-yellow-500' : 
                        passwordStrength.score === 1 ? 'bg-red-500' : ''
                      }`} 
                      style={{ width: `${(passwordStrength.score / 3) * 100}%` }}
                    ></div>
                  </div>
                  <span className={`ml-2 text-sm ${getStrengthColor()}`}>
                    {passwordStrength.message}
                  </span>
                </div>
                <ul className="mt-2 grid grid-cols-1 gap-1 text-sm">
                  {currentRequirements.map((req) => (
                    <li 
                      key={req.id}
                      className={`flex items-center ${req.met ? 'text-green-600' : 'text-gray-500'}`}
                    >
                      {req.met 
                        ? <FiCheckCircle className="mr-1 text-green-500" />
                        : <FiAlertCircle className="mr-1 text-gray-400" />
                      }
                      {req.label}
                    </li>
                  ))}
                </ul>
              </div>
            )}
            {formTouched.password && errors.password && (
              <p className="mt-1 text-sm text-red-600">{errors.password}</p>
            )}
          </div>

          <div>
            <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
              {t('confirmPassword', { fallback: 'Confirm Password' })}
            </label>
            <div className="mt-1 relative">
              <input
                id="confirmPassword"
                name="confirmPassword"
                type={showConfirmPassword ? 'text' : 'password'}
                value={formData.confirmPassword}
                onChange={handleChange}
                onBlur={handleBlur}
                className={`block w-full rounded-md px-3 py-2 focus:outline-none focus:ring-1 pr-10 ${
                  formTouched.confirmPassword && errors.confirmPassword 
                    ? 'border-red-300 focus:border-red-500 focus:ring-red-500' 
                    : formTouched.confirmPassword && !errors.confirmPassword && formData.confirmPassword
                      ? 'border-green-300 focus:border-green-500 focus:ring-green-500'
                      : 'border-gray-300 focus:border-orange-500 focus:ring-orange-500'
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
              <p className="mt-1 text-sm text-red-600">{errors.confirmPassword}</p>
            )}
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-orange-600 hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 disabled:opacity-50 transition-colors duration-200"
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

          <button
            type="button"
            onClick={() => signIn('google')}
            className="mt-6 w-full flex items-center justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 transition-colors duration-200"
          >
            <FcGoogle className="w-5 h-5 mr-2" />
            {t('signUpWithGoogle', { fallback: 'Sign up with Google' })}
          </button>
        </div>

        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600">
            {t('alreadyHaveAccount', { fallback: 'Already have an account?' })}{' '}
            <Link
              href="/auth/signin"
              className="font-medium text-orange-600 hover:text-orange-500 transition-colors duration-200"
            >
              {t('signIn', { fallback: 'Sign In' })}
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}