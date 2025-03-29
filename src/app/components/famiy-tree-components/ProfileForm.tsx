import React, { useState } from 'react';

// Define the User interface here for type-checking
interface User {
  name: string;
  birthDate: string;
  gender: string;
  living: boolean;
}

interface ProfileFormProps {
  user: User;
  onSave: (data: User) => void;  // Ensure this matches the type expected by handleSave
}

const ProfileForm: React.FC<ProfileFormProps> = ({ user, onSave }) => {
  const [name, setName] = useState(user?.name || '');
  const [birthDate, setBirthDate] = useState(user?.birthDate || '');
  const [gender, setGender] = useState(user?.gender || 'Male');
  const [living, setLiving] = useState<boolean>(user?.living || true);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({ name, birthDate, gender, living }); // Pass updated user data to the onSave function
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block">Name</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="border p-2 w-full"
          required
        />
      </div>
      <div>
        <label className="block">Birth Date</label>
        <input
          type="date"
          value={birthDate}
          onChange={(e) => setBirthDate(e.target.value)}
          className="border p-2 w-full"
        />
      </div>
      <div>
        <label className="block">Gender</label>
        <select
          value={gender}
          onChange={(e) => setGender(e.target.value)}
          className="border p-2 w-full"
        >
          <option>Male</option>
          <option>Female</option>
          <option>Other</option>
        </select>
      </div>
      <div>
        <label className="block">Living Status</label>
        <input
          type="checkbox"
          checked={living}
          onChange={() => setLiving(!living)}
        />
      </div>
      <button type="submit" className="bg-blue-500 text-white p-2 mt-4">Save Profile</button>
    </form>
  );
};

export default ProfileForm;
