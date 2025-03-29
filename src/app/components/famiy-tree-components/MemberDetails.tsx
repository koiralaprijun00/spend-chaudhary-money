'use client'

import React from 'react';

interface User {
  id: string;
  name: string;
  birthDate: string;
  gender: string;
  living: boolean;
  parentId?: string;
  spouseId?: string;
  imageUrl?: string;
}

interface MemberDetailsProps {
  member: User;
}

const MemberDetails: React.FC<MemberDetailsProps> = ({ member }) => {
  const formatDate = (dateString: string) => {
    if (!dateString) return 'Unknown';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="member-details">
      <div className="flex items-center mb-4">
        <div className={`w-16 h-16 rounded-full flex items-center justify-center ${
          member.gender === 'Male' ? 'bg-blue-100 text-blue-800' : 'bg-pink-100 text-pink-800'
        }`}>
          {member.imageUrl ? (
            <img 
              src={member.imageUrl} 
              alt={member.name} 
              className="w-full h-full rounded-full object-cover"
            />
          ) : (
            <span className="text-2xl font-bold">{member.name.charAt(0)}</span>
          )}
        </div>
        <div className="ml-4">
          <h3 className="text-xl font-bold">{member.name}</h3>
          <p className={`text-sm ${member.living ? 'text-green-600' : 'text-gray-500'}`}>
            {member.living ? 'Living' : 'Deceased'}
          </p>
        </div>
      </div>

      <div className="member-info space-y-2">
        <div className="flex justify-between">
          <span className="text-gray-600">Birth Date:</span>
          <span className="font-medium">{formatDate(member.birthDate)}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-600">Gender:</span>
          <span className="font-medium">{member.gender}</span>
        </div>
        {member.spouseId && (
          <div className="flex justify-between">
            <span className="text-gray-600">Spouse:</span>
            <span className="font-medium">Yes</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default MemberDetails;