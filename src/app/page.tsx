'use client'

import { useState, useEffect } from 'react'
import { Search, PlusCircle, MapPin, Phone, Clock, Mail, Globe, Map } from 'lucide-react'

// Add interface for type safety
interface Location {
  latitude: number;
  longitude: number;
}

interface Facility {
  properties: {
    name: string;
    formatted: string; // Full address
    email?: string;
    phone?: string;
    website?: string;
    lat: number;
    lon: number;
  }
}

export default function Home() {
  const [selectedType, setSelectedType] = useState('')
  const [showAll, setShowAll] = useState(false)
  const [location, setLocation] = useState<Location | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [facilities, setFacilities] = useState([])

  // Add useEffect to get user's location when component mounts
  useEffect(() => {
    if (!navigator.geolocation) {
      setError('Geolocation is not supported by your browser');
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLocation({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude
        });
      },
      (error) => {
        setError('Unable to retrieve your location');
        console.error('Geolocation error:', error);
      }
    );
  }, []);

  // const displayedFacilities = showAll ? mockFacilities : mockFacilities.slice(0, 6)

  const searchFacilities = async () => {
    if (!location) {
      setError('Please enable location services to search');
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch('https://healthcare-api-production-1930.up.railway.app/api/save-location/v1', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          latitude: location.latitude,
          longitude: location.longitude,
          Option: selectedType || 'hospital' // matching your backend's expected field name
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to fetch facilities');
      }

      const data = await response.json();
      // Assuming the Geoapify response structure is maintained by your backend
      setFacilities(data.features || []); 
    } catch (err) {
      setError('Failed to fetch facilities');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-blue-800 mb-8 text-center">Find Nearby Healthcare Facilities</h1>
      
      {/* Show location status */}
      {!location && !error && (
        <div className="text-center mb-4 text-gray-600">
          Requesting location access...
        </div>
      )}

      {error && (
        <div className="text-center mb-4 text-red-600">
          {error}
        </div>
      )}

      <div className="bg-white p-6 rounded-lg shadow-md mb-8">
        <div className="flex flex-col sm:flex-row gap-4">
          <select
            value={selectedType}
            onChange={(e) => setSelectedType(e.target.value)}
            className="flex-grow p-2 border border-blue-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">All Types</option>
            <option value="clinic_or_praxis">Clinic</option>
            <option value="hospital">Hospital</option>
            <option value="dentist">Dentist</option>
            <option value="pharmacy">Pharmacy</option>
          </select>
          <button 
            onClick={searchFacilities}
            disabled={!location || isLoading}
            className="bg-blue-600 text-white font-semibold py-2 px-4 rounded-md hover:bg-blue-700 transition duration-300 flex items-center justify-center disabled:bg-blue-300"
          >
            <Search className="mr-2" />
            {isLoading ? 'Searching...' : 'Search'}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {facilities.map((facility, index) => (
          <div key={index} className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow">
            <div className="p-6">
              <h3 className="text-xl font-semibold text-blue-800 mb-4">
                {facility.properties.name}
              </h3>
              
              <div className="space-y-4">
                {/* Address - Always show */}
                <div className="flex items-start">
                  <MapPin className="h-5 w-5 text-blue-600 mt-1 mr-3 flex-shrink-0" />
                  <p className="text-gray-600 leading-tight">
                    {facility.properties.formatted || 'Address not available'}
                  </p>
                </div>

                {/* Contact - Show either phone or email or both */}
                <div className="flex items-start">
                  <Phone className="h-5 w-5 text-blue-600 mt-1 mr-3 flex-shrink-0" />
                  <div className="space-y-2">
                    {facility.properties.phone && (
                      <a 
                        href={`tel:${facility.properties.phone}`}
                        className="text-blue-600 hover:text-blue-800 block"
                      >
                        {facility.properties.phone}
                      </a>
                    )}
                    {facility.properties.email && (
                      <a 
                        href={`mailto:${facility.properties.email}`}
                        className="text-blue-600 hover:text-blue-800 block"
                      >
                        {facility.properties.email}
                      </a>
                    )}
                    {!facility.properties.phone && !facility.properties.email && (
                      <span className="text-gray-500">Contact information not available</span>
                    )}
                  </div>
                </div>

                {/* Website - Always show section */}
                <div className="flex items-start">
                  <Globe className="h-5 w-5 text-blue-600 mt-1 mr-3 flex-shrink-0" />
                  {facility.properties.website ? (
                    <a 
                      href={facility.properties.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:text-blue-800 break-words"
                    >
                      {new URL(facility.properties.website).hostname}
                    </a>
                  ) : (
                    <span className="text-gray-500">Website not available</span>
                  )}
                </div>

                {/* Map Link - Always show */}
                <div className="flex items-start">
                  <Map className="h-5 w-5 text-blue-600 mt-1 mr-3 flex-shrink-0" />
                  <a 
                    href={`https://www.openstreetmap.org/?mlat=${facility.properties.lat}&mlon=${facility.properties.lon}&zoom=16`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:text-blue-800"
                  >
                    View on Map
                  </a>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {facilities.length === 0 && !isLoading && (
        <div className="text-center text-gray-600 mt-8">
          No healthcare facilities found in your area.
        </div>
      )}

      {isLoading && (
        <div className="text-center text-gray-600 mt-8">
          Loading facilities...
        </div>
      )}
    </div>
  )
}

