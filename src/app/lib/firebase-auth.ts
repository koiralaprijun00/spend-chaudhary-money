// src/app/lib/firebase-auth.ts
import { 
    createUserWithEmailAndPassword, 
    signInWithEmailAndPassword,
    signOut,
    updateProfile,
    sendPasswordResetEmail,
    sendEmailVerification,
    User,
    reload
  } from 'firebase/auth';
  import { auth } from './firebase';
  
  /**
   * Register a new user with email and password
   */
  export const registerWithEmailAndPassword = async (
    email: string,
    password: string,
    displayName: string
  ) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      
      // Update the user's profile with the display name
      if (displayName) {
        await updateProfile(userCredential.user, {
          displayName: displayName
        });
      }
      
      // Send verification email
      await sendEmailVerification(userCredential.user);
      
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
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      
      // Reload user to get latest verification status
      await reload(userCredential.user);
      
      return {
        success: true,
        user: userCredential.user,
        verified: userCredential.user.emailVerified
      };
    } catch (error: any) {
      // Handle specific Firebase Auth errors
      let message = 'Login failed. Please try again.';
      
      if (error.code === 'auth/invalid-credential' || 
          error.code === 'auth/user-not-found' || 
          error.code === 'auth/wrong-password') {
        message = 'Invalid email or password. Please try again.';
      } else if (error.code === 'auth/user-disabled') {
        message = 'This account has been disabled. Please contact support.';
      } else if (error.code === 'auth/too-many-requests') {
        message = 'Too many failed login attempts. Please try again later.';
      }
      
      return {
        success: false,
        error: message
      };
    }
  };
  
  /**
   * Send password reset email
   */
  export const resetPassword = async (email: string) => {
    try {
      await sendPasswordResetEmail(auth, email);
      return {
        success: true
      };
    } catch (error: any) {
      let message = 'Failed to send password reset email. Please try again.';
      
      if (error.code === 'auth/user-not-found') {
        message = 'No account found with this email.';
      } else if (error.code === 'auth/invalid-email') {
        message = 'The email address is invalid.';
      }
      
      return {
        success: false,
        error: message
      };
    }
  };

  export const checkEmailVerification = async (user: User) => {
    try {
      // Reload user to get latest verification status
      await reload(user);
      return user.emailVerified;
    } catch (error) {
      console.error('Error checking email verification:', error);
      return false;
    }
  };

  export const resendVerificationEmail = async (user: User) => {
    try {
      await sendEmailVerification(user);
      return {
        success: true
      };
    } catch (error: any) {
      console.error('Error sending verification email:', error);
      return {
        success: false,
        error: error.message || 'Failed to send verification email'
      };
    }
  };