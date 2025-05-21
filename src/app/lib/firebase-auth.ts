// src/app/lib/firebase-auth.ts
import { 
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  signOut as firebaseSignOut,
  sendPasswordResetEmail,
  createUserWithEmailAndPassword,
  updateProfile,
  sendEmailVerification,
  User,
  Auth
} from 'firebase/auth';
import { auth } from './firebase';

/**
 * Check if Firebase auth is properly initialized
 */
const isAuthAvailable = () => {
  if (!auth) {
    console.error('Firebase auth is not initialized. Check your environment variables.');
    return false;
  }
  return true;
};

/**
 * Register a new user with email and password
 */
export const registerWithEmail = async (email: string, password: string, displayName: string) => {
  if (!isAuthAvailable()) {
    return {
      success: false,
      error: 'Authentication service is not available. Please try again later.'
    };
  }

  try {
    const userCredential = await createUserWithEmailAndPassword(auth as Auth, email, password);
    
    // Update the user's profile with their display name
    if (userCredential.user) {
      await updateProfile(userCredential.user, {
        displayName: displayName
      });
      
      // Send verification email
      await sendEmailVerification(userCredential.user);
    }
    
    return {
      success: true,
      user: userCredential.user,
      verified: false
    };
  } catch (error: any) {
    console.error('Registration error:', error);
    return {
      success: false,
      error: error.message || 'Failed to register user'
    };
  }
};

/**
 * Sign in a user with email and password
 */
export const signInWithEmail = async (email: string, password: string) => {
  if (!isAuthAvailable()) {
    return {
      success: false,
      error: 'Authentication service is not available. Please try again later.'
    };
  }

  try {
    const userCredential = await signInWithEmailAndPassword(auth as Auth, email, password);
    return {
      success: true,
      user: userCredential.user
    };
  } catch (error: any) {
    console.error('Sign in error:', error);
    return {
      success: false,
      error: error.message || 'Failed to sign in'
    };
  }
};

export const signInWithGoogle = async () => {
  if (!isAuthAvailable()) {
    return {
      success: false,
      error: 'Authentication service is not available. Please try again later.'
    };
  }

  try {
    const provider = new GoogleAuthProvider();
    const result = await signInWithPopup(auth as Auth, provider);
    return {
      success: true,
      user: result.user
    };
  } catch (error: any) {
    console.error('Google sign in error:', error);
    return {
      success: false,
      error: error.message || 'Failed to sign in with Google'
    };
  }
};

export const signOut = async () => {
  if (!isAuthAvailable()) {
    return {
      success: false,
      error: 'Authentication service is not available. Please try again later.'
    };
  }

  try {
    await firebaseSignOut(auth as Auth);
    return {
      success: true
    };
  } catch (error: any) {
    console.error('Sign out error:', error);
    return {
      success: false,
      error: error.message || 'Failed to sign out'
    };
  }
};

/**
 * Send password reset email
 */
export const resetPassword = async (email: string) => {
  if (!isAuthAvailable()) {
    return {
      success: false,
      error: 'Authentication service is not available. Please try again later.'
    };
  }

  try {
    await sendPasswordResetEmail(auth as Auth, email);
    return {
      success: true
    };
  } catch (error: any) {
    console.error('Password reset error:', error);
    return {
      success: false,
      error: error.message || 'Failed to send password reset email'
    };
  }
};