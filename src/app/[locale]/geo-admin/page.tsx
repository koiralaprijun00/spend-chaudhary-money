'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { IoClose } from 'react-icons/io5';
import { IoTrash } from 'react-icons/io5';
import { IoCheckmark } from 'react-icons/io5';
import { IoCloseOutline } from 'react-icons/io5';

declare module 'next-auth' {
  interface User {
    accessToken?: string;
    role?: string;
  }

  interface Session {
    accessToken?: string;
    role?: string;
  }
}

interface Location {
  id: string;
  name: string;
  lat?: number;
  lng?: number;
  imageUrl?: string;
  funFact?: string;
  status: 'pending' | 'approved' | 'rejected';
  submittedAt: string;
  reviewedAt?: string;
}

export default function GeoAdminPage() {
  const [locations, setLocations] = useState<Location[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'pending' | 'approved' | 'rejected'>('pending');
  const [selectedLocation, setSelectedLocation] = useState<Location | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  const router = useRouter();
  const { data: session, status: authStatus } = useSession();

  // Log session data to see what it contains
  useEffect(() => {
    console.log("Session:", session);
    console.log("Session Role:", session?.role);
  }, [session]);

  // Fetch locations based on active tab
const fetchLocations = async () => {
  if (authStatus !== 'authenticated') return;

  setLoading(true);
  setError(null);

  try {
    const response = await fetch(`/api/geo-admin/locations?status=${activeTab}`, {
      headers: {
        'Authorization': `Bearer ${session?.accessToken}`,
      },
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch locations: ${response.status}`);
    }

    const data = await response.json();
    setLocations(data.locations || []);
  } catch (err) {
    setError('Failed to fetch locations');
    console.error('Error fetching locations:', err);
  } finally {
    setLoading(false);
  }
};

  useEffect(() => {
    if (authStatus === 'unauthenticated') {
      router.push('/login'); // Redirect to login if unauthenticated
    }
  }, [authStatus, router]);

  useEffect(() => {
    if (authStatus === 'authenticated' && session?.role === 'admin') {
      fetchLocations();
    }
  }, [authStatus, session, activeTab]);

  // Update location status
  // Update location status
const updateLocationStatus = async (id: string, newStatus: 'approved' | 'rejected') => {
  try {
    setLoading(true);
    const response = await fetch('/api/geo-admin/locations', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${session?.accessToken}`,
      },
      body: JSON.stringify({ id, status: newStatus }),
    });

    if (!response.ok) {
      throw new Error(`Failed to update location: ${response.status}`);
    }

    // Update the local state after approval/rejection
    setLocations(prevLocations => {
      // Find the location to update
      const locationToUpdate = prevLocations.find(loc => loc.id === id);
      
      // If the location wasn't found, return unchanged list
      if (!locationToUpdate) return prevLocations;
      
      // If we're in the pending tab and updating status, we want to remove it from view
      if (activeTab === 'pending') {
        return prevLocations.filter(loc => loc.id !== id);
      } 
      // If we're in the target status tab (approved/rejected), update it in place
      else if (
        (activeTab === 'approved' && newStatus === 'approved') || 
        (activeTab === 'rejected' && newStatus === 'rejected')
      ) {
        return prevLocations.map(loc => 
          loc.id === id ? { ...loc, status: newStatus } : loc
        );
      }
      // If we're in a different tab than the new status, remove it from this tab's view
      else {
        return prevLocations.filter(loc => loc.id !== id);
      }
    });

    setLoading(false);
  } catch (err) {
    console.error('Error updating location:', err);
    setError('Failed to update location status');
    setLoading(false);
  }
};
  
  

  // Delete a location
  // Delete a location
const deleteLocation = async (id: string) => {
  if (!confirm('Are you sure you want to delete this location?')) {
    return;
  }

  try {
    setLoading(true);
    const response = await fetch(`/api/geo-admin/locations?id=${id}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${session?.accessToken}`,
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`Failed to delete location: ${response.status}`);
    }

    // Update the UI state by removing the deleted location
    setLocations(prevLocations => prevLocations.filter(location => location.id !== id));
    
    setLoading(false);
  } catch (err) {
    console.error('Error deleting location:', err);
    setError('Failed to delete location');
    setLoading(false);
  }
};
  

  // View location details
  const viewLocationDetails = (location: Location) => {
    setSelectedLocation(location);
    setIsModalOpen(true);
  };

  // Format date 
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString() + ' ' + date.toLocaleTimeString();
  };

  if (authStatus === 'loading') {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (!session?.role || session?.role !== 'admin') {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="bg-white rounded-lg shadow-md p-8 max-w-md">
          <h1 className="text-2xl font-bold text-red-600 mb-4">Access Denied</h1>
          <p className="text-gray-700 mb-4">
            You do not have permission to access this page. This area is restricted to administrators only.
          </p>
          <button
            onClick={() => router.push('/')}
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
          >
            Return to Homepage
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="container mx-auto px-4">
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <header className="bg-blue-600 text-white p-4">
            <h1 className="text-2xl font-bold">Nepal Geo Explorer Admin</h1>
            <p>Manage location submissions</p>
          </header>
          
          {/* Tab Navigation */}
          <div className="flex border-b">
            <button
              onClick={() => setActiveTab('pending')}
              className={`px-4 py-2 font-medium ${activeTab === 'pending' 
                ? 'border-b-2 border-blue-500 text-blue-600' 
                : 'text-gray-500'}`}
            >
              Pending
            </button>
            <button
              onClick={() => setActiveTab('approved')}
              className={`px-4 py-2 font-medium ${activeTab === 'approved' 
                ? 'border-b-2 border-blue-500 text-blue-600' 
                : 'text-gray-500'}`}
            >
              Approved
            </button>
            <button
              onClick={() => setActiveTab('rejected')}
              className={`px-4 py-2 font-medium ${activeTab === 'rejected' 
                ? 'border-b-2 border-blue-500 text-blue-600' 
                : 'text-gray-500'}`}
            >
              Rejected
            </button>
          </div>

{/* Location Details Modal */}
{isModalOpen && selectedLocation && (
  <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 backdrop-blur-sm transition-all duration-300">
    <div className="bg-white rounded-xl shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-hidden">
      {/* Header with gradient background */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 p-4 text-white">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold">{selectedLocation.name}</h2>
          <button 
            onClick={() => setIsModalOpen(false)}
            className="text-white hover:text-blue-200 transition-colors"
            aria-label="Close modal"
          >
           <IoCloseOutline className="h-6 w-6" />
          </button>
        </div>
      </div>
      
      <div className="overflow-y-auto p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Image section */}
          {selectedLocation.imageUrl && (
            <div className="col-span-1 md:col-span-2">
               <img 
                src={selectedLocation.imageUrl} 
                alt={selectedLocation.name}
                className="w-full max-h-96 object-contain rounded-lg shadow-md hover:shadow-lg transition-shadow"
              />
            </div>
          )}
          
          {/* Details section */}
          <div className="space-y-4">
            {(selectedLocation.lat !== undefined && selectedLocation.lng !== undefined) && (
              <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
                <h3 className="text-sm font-semibold text-blue-700 uppercase tracking-wider">Coordinates</h3>
                <div className="mt-2 text-gray-700 flex flex-col">
                  <div className="flex items-center">
                    <span className="font-medium mr-2">Latitude:</span> 
                    <code className="bg-gray-100 px-2 py-1 rounded">{selectedLocation.lat}</code>
                  </div>
                  <div className="flex items-center mt-1">
                    <span className="font-medium mr-2">Longitude:</span> 
                    <code className="bg-gray-100 px-2 py-1 rounded">{selectedLocation.lng}</code>
                  </div>
                </div>
              </div>
            )}
            
            {selectedLocation.funFact && (
              <div className="bg-amber-50 p-4 rounded-lg border border-amber-100">
                <h3 className="text-sm font-semibold text-amber-700 uppercase tracking-wider">Fun Fact</h3>
                <p className="mt-2 text-gray-700 italic">{selectedLocation.funFact}</p>
              </div>
            )}
          </div>
          
          {/* Status section */}
          <div className="space-y-4">
            <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
              <h3 className="text-sm font-semibold text-gray-700 uppercase tracking-wider">Submission Info</h3>
              <div className="mt-2 space-y-2">
                <div className="flex items-center">
                  <span className="font-medium min-w-24">Status:</span>
                  <span className={`ml-2 px-3 py-1 text-xs rounded-full font-medium ${
                    selectedLocation.status === 'approved' ? 'bg-green-100 text-green-800' :
                    selectedLocation.status === 'rejected' ? 'bg-red-100 text-red-800' :
                    'bg-yellow-100 text-yellow-800'
                  }`}>
                    {selectedLocation.status.toUpperCase()}
                  </span>
                </div>
                <div className="flex items-center">
                  <span className="font-medium min-w-24">Submitted:</span>
                  <span className="ml-2 text-gray-600">{formatDate(selectedLocation.submittedAt)}</span>
                </div>
                {selectedLocation.reviewedAt && (
                  <div className="flex items-center">
                    <span className="font-medium min-w-24">Reviewed:</span>
                    <span className="ml-2 text-gray-600">{formatDate(selectedLocation.reviewedAt)}</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
        
        {/* Action buttons */}
        <div className="mt-8 pt-4 border-t border-gray-200 flex flex-wrap justify-end gap-3">
          {selectedLocation.status === 'pending' && (
            <>
              <button
                onClick={() => {
                  updateLocationStatus(selectedLocation.id, 'approved');
                  setIsModalOpen(false);
                }}
                className="px-4 py-2 bg-green-600 text-white rounded-lg font-medium shadow-sm hover:bg-green-700 hover:shadow transition-all flex items-center"
              >
               <IoCheckmark className="h-5 w-5 mr-1" />
                Approve
              </button>
              <button
                onClick={() => {
                  updateLocationStatus(selectedLocation.id, 'rejected');
                  setIsModalOpen(false);
                }}
                className="px-4 py-2 bg-red-600 text-white rounded-lg font-medium shadow-sm hover:bg-red-700 hover:shadow transition-all flex items-center"
              >
                <IoClose className="h-5 w-5 mr-1" />
                Reject
              </button>
            </>
          )}
          <button
            onClick={() => {
              if (confirm('Are you sure you want to delete this location?')) {
                deleteLocation(selectedLocation.id);
                setIsModalOpen(false);
              }
            }}
            className="px-4 py-2 bg-gray-700 text-white rounded-lg font-medium shadow-sm hover:bg-gray-800 hover:shadow transition-all flex items-center"
          >
           <IoTrash className="h-5 w-5 mr-1" />
            Delete
          </button>
          <button
            onClick={() => setIsModalOpen(false)}
            className="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg font-medium shadow-sm hover:bg-gray-300 hover:shadow transition-all flex items-center"
          >
            <IoClose className="h-5 w-5 mr-1" />
            Close
          </button>
        </div>
      </div>
    </div>
  </div>
)}
          
          {/* Content */}
          <div className="p-4">
            {loading ? (
              <div className="text-center py-8">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
                <p className="mt-4 text-gray-600">Loading locations...</p>
              </div>
            ) : error ? (
              <div className="bg-red-100 text-red-700 p-4 rounded">
                <p>{error}</p>
                <button 
                  onClick={() => window.location.reload()}
                  className="mt-2 text-sm underline"
                >
                  Try again
                </button>
              </div>
            ) : locations.length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                <p>No {activeTab} locations found.</p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead>
                    <tr>
                      <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Name
                      </th>
                      <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Coordinates
                      </th>
                      <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Submitted
                      </th>
                      <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {locations.map((location) => (
                      <tr key={location.id}>
                        <td className="px-4 py-3">
                          <div className="font-medium">{location.name}</div>
                          {location.imageUrl && (
                            <div className="mt-1">
                              <img 
                                src={location.imageUrl} 
                                alt={location.name}
                                className="h-16 w-24 object-cover rounded cursor-pointer"
                                onClick={() => viewLocationDetails(location)}
                              />
                            </div>
                          )}
                        </td>
                        <td className="px-4 py-3">
                          {location.lat && location.lng ? (
                            <div className="text-sm">
                              <div>Lat: {location.lat}</div>
                              <div>Lng: {location.lng}</div>
                            </div>
                          ) : (
                            <span className="text-gray-400 text-sm">No coordinates</span>
                          )}
                        </td>
                        <td className="px-4 py-3">
                          <div className="text-sm">
                            {formatDate(location.submittedAt)}
                          </div>
                        </td>
                        <td className="px-4 py-3">
                          <div className="flex flex-col space-y-2">
                            <button
                              onClick={() => viewLocationDetails(location)}
                              className="px-3 py-1 bg-blue-100 text-blue-800 rounded-md text-sm hover:bg-blue-200"
                            >
                              View Details
                            </button>
                            
                            {activeTab === 'pending' && (
                              <>
                                <button
                                  onClick={() => updateLocationStatus(location.id, 'approved')}
                                  className="px-3 py-1 bg-green-100 text-green-800 rounded-md text-sm hover:bg-green-200"
                                >
                                  Approve
                                </button>
                                <button
                                  onClick={() => updateLocationStatus(location.id, 'rejected')}
                                  className="px-3 py-1 bg-red-100 text-red-800 rounded-md text-sm hover:bg-red-200"
                                >
                                  Reject
                                </button>
                              </>
                            )}
                            
                            <button
                              onClick={() => deleteLocation(location.id)}
                              className="px-3 py-1 bg-gray-100 text-gray-800 rounded-md text-sm hover:bg-gray-200"
                            >
                              Delete
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
