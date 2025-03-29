'use client'

import React, { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import ProfileForm from '../../components/famiy-tree-components/ProfileForm';
import FamilyTreeHeader from '../../components/famiy-tree-components/FamilyTreeHeader';

interface User {
  id?: string;
  name: string;
  birthDate: string;
  gender: string;
  living: boolean;
  birthPlace?: string;
  gotra?: string;
  caste?: string;
  occupation?: string;
  education?: string;
  bio?: string;
  imageUrl?: string;
}

const ProfilePage = () => {
  const { id } = useParams();
  const [user, setUser] = useState<User | null>(null);
  const [isProfileSaved, setIsProfileSaved] = useState(false);

  useEffect(() => {
    if (id === 'me') {
      // Simulate fetching user data
      const fetchedUser: User = {
        name: 'Nitu Adhikari',
        birthDate: '1992-01-01',
        gender: 'Male',
        living: true,
        birthPlace: '',
        gotra: '',
        caste: '',
        occupation: '',
        education: '',
        bio: '',
        imageUrl: ''
      };
      setUser(fetchedUser);
    }
  }, [id]);

  const handleSave = (profileData: User) => {
    setUser(profileData);
    setIsProfileSaved(true);
    setTimeout(() => setIsProfileSaved(false), 3000);
  };

  return (
    <div>
      <FamilyTreeHeader />
      <div className="container mx-auto p-4">
        <h2 className="text-2xl font-bold mb-4">Profile: {user?.name || '...'}</h2>

        {user ? (
          <ProfileForm user={user} onSave={handleSave} />
        ) : (
          <p className="text-gray-500">Loading profile...</p>
        )}

        {isProfileSaved && (
          <div className="mt-4 text-green-500 font-bold">
            Profile has been saved successfully!
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfilePage;
