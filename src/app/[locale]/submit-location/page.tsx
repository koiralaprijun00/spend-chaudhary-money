'use client'

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import LocationSubmissionForm from '../../components/LocationSubmissionForm';
import { Location } from '../../data/geo-nepal/geo-data';
import Link from 'next/link';
import { FaArrowLeft } from 'react-icons/fa';

export default function LocationSubmissionPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const router = useRouter();

  // Handle form submission
  const handleSubmit = async (newLocation: Omit<Location, 'id'>) => {
    setIsSubmitting(true);
    
    try {
      // In a real implementation, you would make an API call to your backend
      console.log('Submitting location:', newLocation);
      
      // Simulate a delay for the API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Show success message
      setSubmitSuccess(true);
      
      // Redirect after a delay
      setTimeout(() => {
        router.push('/');
      }, 3000);
    } catch (error) {
      console.error('Error submitting location:', error);
      setIsSubmitting(false);
    }
  };

  // Cancel submission and return to home
  const handleCancel = () => {
    router.push('/');
  };

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="container mx-auto px-4">


      

{/* Header with navigation */}
<div className="flex justify-between items-center mb-8">
  <div className="flex items-center">
    <Link href="/geo-nepal" className="mr-3 p-2 rounded-full hover:bg-gray-100">
      <FaArrowLeft size={24} />
    </Link>
    <h1 className="text-3xl font-bold">Submit a New Location</h1>
  </div>
</div>
        
        {submitSuccess ? (
          <div className="bg-white rounded-lg shadow-lg p-8 max-w-md mx-auto text-center">
            <div className="flex justify-center mb-4">
              <div className="bg-green-100 p-3 rounded-full">
                <svg className="w-16 h-16 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                </svg>
              </div>
            </div>
            <h2 className="text-2xl font-bold mb-4">Thank You!</h2>
            <p className="mb-6">Your location has been submitted successfully. Our team will review it shortly.</p>
            <p className="text-gray-500">Redirecting to home page...</p>
          </div>
        ) : (
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Left Column - Introduction and Tips */}
            <div className="w-full lg:w-5/12">
              
              <div className="bg-blue-50 border-l-4 border-blue-500 p-4 mb-6">
                <p className="text-blue-700">
                  Help us expand our collection of Nepal locations! Submit your favorite spot with accurate coordinates, 
                  an image, and an interesting fact. Our team will review your submission before adding it to the game.
                </p>
              </div>
              
              <div className="bg-white rounded-lg shadow-md p-6 mb-6">
                <h3 className="text-xl font-bold mb-4">Tips for Great Submissions</h3>
                
                <div className="space-y-4">
                  <div className="flex items-start">
                    <div className="bg-blue-100 p-2 rounded-full mr-3 flex-shrink-0">
                      <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-medium mb-1">High-Quality Image</h4>
                      <p className="text-sm text-gray-600">Share a clear, landscape-oriented photo that shows the distinctive features of the location.</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="bg-blue-100 p-2 rounded-full mr-3 flex-shrink-0">
                      <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-medium mb-1">Precise Coordinates</h4>
                      <p className="text-sm text-gray-600">Use your device's GPS or Google Maps to get accurate latitude and longitude coordinates.</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="bg-blue-100 p-2 rounded-full mr-3 flex-shrink-0">
                      <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-medium mb-1">Interesting Fun Fact</h4>
                      <p className="text-sm text-gray-600">Share something unique and educational about the location that others might not know.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Right Column - Submission Form */}
            <div className="w-full lg:w-7/12">
              <div className="sticky top-8">
                <LocationSubmissionForm 
                  onSubmit={handleSubmit} 
                  onCancel={handleCancel} 
                />
                
                <div className="mt-6 text-center text-gray-600 text-sm">
                  <p>By submitting a location, you confirm that you have the rights to share this image and information.</p>
                  <p>Our team will review all submissions before adding them to the game.</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}