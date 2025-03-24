'use client'

import { useState } from 'react';
import LocationSubmissionForm from '../../components/LocationSubmissionForm';
import { useRouter } from 'next/navigation';

export default function SubmitLocationPage() {
  const router = useRouter();
  
  const handleCancel = () => {
    router.push('/geo-nepal');
  };
  
  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-2xl font-bold mb-6 text-center">Submit a New Location</h1>
      <p className="text-gray-600 mb-8 text-center max-w-2xl mx-auto">
        Share your favorite spots in Nepal with our community. All submissions will be reviewed before appearing on the map.
      </p>
      
      <LocationSubmissionForm onCancel={handleCancel} />
    </div>
  );
}