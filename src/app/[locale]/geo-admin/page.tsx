// src/app/[locale]/geo-admin/page.tsx
'use client'

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';

declare module 'next-auth' {
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
  const [usingFallbackAuth, setUsingFallbackAuth] = useState(false);
  
  const router = useRouter();
  const { data: session, status: authStatus } = useSession();

  // Check if we're authenticated with fallback method
  useEffect(() => {
    const token = localStorage.getItem('admin_token');
    const user = localStorage.getItem('admin_user');
    
    if (token && user) {
      try {
        const parsedUser = JSON.parse(user);
        if (parsedUser.role === 'admin') {
          setUsingFallbackAuth(true);
        }
      } catch (e) {
        console.error('Error parsing user from localStorage:', e);
      }
    }
  }, []);

  // Combined authentication check
  const isAuthenticated = (authStatus === 'authenticated' && session?.role === 'admin') || usingFallbackAuth;

  // Fetch locations based on active tab
  const fetchLocations = async () => {
    if (!isAuthenticated) return;

    setLoading(true);
    setError(null);

    try {
      // Prepare headers based on authentication method
      const headers: Record<string, string> = {
        'Content-Type': 'application/json'
      };
      
      if (session?.accessToken) {
        headers['Authorization'] = `Bearer ${session.accessToken}`;
      } else if (usingFallbackAuth) {
        const token = localStorage.getItem('admin_token');
        if (token) {
          headers['Authorization'] = `Bearer ${token}`;
        }
      }
      
      // Mock data for fallback when in development or using fallback auth
      if (process.env.NODE_ENV === 'development' || usingFallbackAuth) {
        // Return mock data after a short delay to simulate API call
        setTimeout(() => {
          const mockLocations: Location[] = [
            {
              id: '1',
              name: 'Pokhara Lakeside',
              lat: 28.2090,
              lng: 83.9550,
              imageUrl: '/images/geo-nepal/pokhara.jpg',
              funFact: 'Phewa Lake is beautiful.',
              status: activeTab as 'pending' | 'approved' | 'rejected',
              submittedAt: new Date().toISOString()
            },
            {
              id: '2',
              name: 'Kathmandu Durbar Square',
              lat: 27.7042,
              lng: 85.3076,
              imageUrl: '/images/geo-nepal/kathmandu.jpg',
              funFact: 'Historic site with temples.',
              status: activeTab as 'pending' | 'approved' | 'rejected',
              submittedAt: new Date().toISOString()
            }
          ];
          
          setLocations(mockLocations);
          setLoading(false);
        }, 700);
        
        return;
      }

      // Real API call if not using fallback
      const response = await fetch(`/api/geo-admin/locations?status=${activeTab}`, {
        headers
      });
      
      if (!response.ok) {
        throw new Error(`Failed to fetch locations: ${response.status}`);
      }

      const data = await response.json();
      setLocations(data.locations || []);
    } catch (err) {
      console.error('Fetch error:', err);
      setError('Failed to fetch locations');
    } finally {
      setLoading(false);
    }
  };

  // Handle session check and fetch locations if authenticated
  useEffect(() => {
    if (!isAuthenticated && authStatus === 'unauthenticated' && !usingFallbackAuth) {
      router.push('/login');
      return;
    }
    
    if (isAuthenticated) {
      fetchLocations();
    }
  }, [isAuthenticated, authStatus, usingFallbackAuth, router]);

  // Re-fetch locations when tab changes
  useEffect(() => {
    if (isAuthenticated) {
      fetchLocations();
    }
  }, [activeTab, isAuthenticated]);

  // Update location status
  const updateLocationStatus = async (id: string, newStatus: 'approved' | 'rejected') => {
    try {
      setLoading(true);
      
      // Prepare headers based on authentication method
      const headers: Record<string, string> = {
        'Content-Type': 'application/json'
      };
      
      if (session?.accessToken) {
        headers['Authorization'] = `Bearer ${session.accessToken}`;
      } else if (usingFallbackAuth) {
        const token = localStorage.getItem('admin_token');
        if (token) {
          headers['Authorization'] = `Bearer ${token}`;
        }
      }
      
      // If using fallback in development, just simulate API call
      if (process.env.NODE_ENV === 'development' || usingFallbackAuth) {
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 500));
        
        // Remove the location from the current view
        setLocations(prev => prev.filter(loc => loc.id !== id));
        setLoading(false);
        return;
      }
      
      // Real API call
      const response = await fetch('/api/geo-admin/locations', {
        method: 'PUT',
        headers,
        body: JSON.stringify({ id, status: newStatus }),
      });
      
      if (!response.ok) {
        const errorData = await response.text();
        throw new Error(`Failed to update location: ${response.status} ${errorData}`);
      }
      
      // Remove the location from the current view
      setLocations(prev => prev.filter(loc => loc.id !== id));
      setLoading(false);
      
    } catch (err) {
      console.error('Error updating location:', err);
      setError('Failed to update location status');
      setLoading(false);
    }
  };

  // Delete a location
  const deleteLocation = async (id: string) => {
    if (!confirm('Are you sure you want to delete this location?')) {
      return;
    }
    
    try {
      setLoading(true);
      
      // If using fallback in development, just simulate API call
      if (process.env.NODE_ENV === 'development' || usingFallbackAuth) {
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 500));
        
        // Remove from the list
        setLocations(prev => prev.filter(loc => loc.id !== id));
        setLoading(false);
        return;
      }
      
      // Real API call
      const response = await fetch(`/api/geo-admin/locations?id=${id}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${session?.accessToken || localStorage.getItem('admin_token') || ''}`
        }
      });
      
      if (!response.ok) {
        throw new Error(`Failed to delete location: ${response.status}`);
      }
      
      // Remove from the list
      setLocations(prev => prev.filter(loc => loc.id !== id));
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

  // Display loading state while checking authentication
  if (authStatus === 'loading' && !usingFallbackAuth) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  // Ensure user is authenticated before displaying the page
  if (!isAuthenticated) {
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
            {usingFallbackAuth && (
              <div className="mt-2 text-xs bg-yellow-500 text-white px-2 py-1 rounded inline-block">
                Using fallback authentication
              </div>
            )}
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

      {/* Location Details Modal */}
      {isModalOpen && selectedLocation && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg max-w-2xl w-full m-4 max-h-[90vh] overflow-y-auto">
            <div className="p-4 border-b">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-bold">{selectedLocation.name}</h2>
                <button 
                  onClick={() => setIsModalOpen(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  ✕
                </button>
              </div>
            </div>
            
            <div className="p-4">
              {/* Image */}
              {selectedLocation.imageUrl && (
                <div className="mb-4">
                  <img 
                    src={selectedLocation.imageUrl} 
                    alt={selectedLocation.name}
                    className="w-full h-64 object-cover rounded"
                  />
                </div>
              )}
              
              {/* Details */}
              <div className="space-y-4">
                <div>
                  <h3 className="font-medium text-gray-700">Coordinates</h3>
                  {selectedLocation.lat && selectedLocation.lng ? (
                    <p>Latitude: {selectedLocation.lat}, Longitude: {selectedLocation.lng}</p>
                  ) : (
                    <p className="text-gray-500">No coordinates provided</p>
                  )}
                </div>
                
                <div>
                  <h3 className="font-medium text-gray-700">Fun Fact</h3>
                  <p>{selectedLocation.funFact || 'No fun fact provided'}</p>
                </div>
                
                <div>
                  <h3 className="font-medium text-gray-700">Submission Details</h3>
                  <p>Submitted: {formatDate(selectedLocation.submittedAt)}</p>
                  {selectedLocation.reviewedAt && (
                    <p>Reviewed: {formatDate(selectedLocation.reviewedAt)}</p>
                  )}
                  <p>Status: 
                    <span className={`ml-2 font-medium ${
                      selectedLocation.status === 'approved' ? 'text-green-600' :
                      selectedLocation.status === 'rejected' ? 'text-red-600' :
                      'text-yellow-600'
                    }`}>
                      {selectedLocation.status.charAt(0).toUpperCase() + selectedLocation.status.slice(1)}
                    </span>
                  </p>
                </div>
              </div>
              
              {/* Action buttons */}
              <div className="flex justify-end space-x-2 mt-6">
                <button
                  onClick={() => {
                    setIsModalOpen(false);
                    if (activeTab === 'pending') {
                      updateLocationStatus(selectedLocation.id, 'approved');
                    }
                  }}
                  className={`px-4 py-2 rounded ${
                    activeTab === 'pending' 
                      ? 'bg-green-500 text-white hover:bg-green-600' 
                      : 'bg-gray-300 text-gray-700'
                  }`}
                  disabled={activeTab !== 'pending'}
                >
                  Approve
                </button>
                <button
                  onClick={() => {
                    setIsModalOpen(false);
                    if (activeTab === 'pending') {
                      updateLocationStatus(selectedLocation.id, 'rejected');
                    }
                  }}
                  className={`px-4 py-2 rounded ${
                    activeTab === 'pending' 
                      ? 'bg-red-500 text-white hover:bg-red-600' 
                      : 'bg-gray-300 text-gray-700'
                  }`}
                  disabled={activeTab !== 'pending'}
                >
                  Reject
                </button>
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}