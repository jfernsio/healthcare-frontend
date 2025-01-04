'use client'

import { useState } from 'react'
import { Search, PlusCircle, MapPin, Phone, Clock, Mail, Globe, Map } from 'lucide-react'

const facilityTypes = ['Clinic', 'Hospital', 'Pharmacy', 'Dentist']

const mockFacilities = [
  { id: 1, name: 'City General Hospital', type: 'Hospital', address: '123 Main St', phone: '(555) 123-4567', hours: '24/7', email: 'info@citygeneral.com', website: 'https://citygeneral.com', mapLink: 'https://goo.gl/maps/example1' },
  { id: 2, name: 'Downtown Clinic', type: 'Clinic', address: '456 Elm St', phone: '(555) 234-5678', hours: '8AM - 8PM', email: 'contact@downtownclinic.com', website: 'https://downtownclinic.com', mapLink: 'https://goo.gl/maps/example2' },
  { id: 3, name: 'Smile Bright Dental', type: 'Dentist', address: '789 Oak St', phone: '(555) 345-6789', hours: '9AM - 5PM', email: 'appointments@smilebright.com', website: 'https://smilebrightdental.com', mapLink: 'https://goo.gl/maps/example3' },
  { id: 4, name: 'QuickCare Pharmacy', type: 'Pharmacy', address: '101 Pine St', phone: '(555) 456-7890', hours: '8AM - 10PM', email: 'info@quickcarepharmacy.com', website: 'https://quickcarepharmacy.com', mapLink: 'https://goo.gl/maps/example4' },
  { id: 5, name: 'Wellness Medical Center', type: 'Clinic', address: '202 Maple Ave', phone: '(555) 567-8901', hours: '7AM - 9PM', email: 'care@wellnessmedical.com', website: 'https://wellnessmedical.com', mapLink: 'https://goo.gl/maps/example5' },
  { id: 6, name: 'Community Health Clinic', type: 'Clinic', address: '303 Cedar Blvd', phone: '(555) 678-9012', hours: '8AM - 6PM', email: 'info@communityhealthclinic.org', website: 'https://communityhealthclinic.org', mapLink: 'https://goo.gl/maps/example6' },
]

export default function Home() {
  const [selectedType, setSelectedType] = useState('')
  const [showAll, setShowAll] = useState(false)

  const displayedFacilities = showAll ? mockFacilities : mockFacilities.slice(0, 6)

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-blue-800 mb-8 text-center">Find Nearby Healthcare Facilities</h1>
      
      <div className="bg-white p-6 rounded-lg shadow-md mb-8">
        <div className="flex flex-col sm:flex-row gap-4">
          <select
            value={selectedType}
            onChange={(e) => setSelectedType(e.target.value)}
            className="flex-grow p-2 border border-blue-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">All Types</option>
            {facilityTypes.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
          <button className="bg-blue-600 text-white font-semibold py-2 px-4 rounded-md hover:bg-blue-700 transition duration-300 flex items-center justify-center">
            <Search className="mr-2" />
            Search
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {displayedFacilities.map((facility) => (
          <div key={facility.id} className="bg-white rounded-lg shadow-md overflow-hidden border border-blue-100">
            <div className="p-4">
              <h2 className="text-xl font-semibold text-blue-800 mb-2">{facility.name}</h2>
              <p className="text-blue-600 mb-2">{facility.type}</p>
              <div className="flex items-center text-gray-600 mb-2">
                <MapPin className="mr-2 h-4 w-4 text-blue-600" />
                {facility.address}
              </div>
              <div className="flex items-center text-gray-600 mb-2">
                <Phone className="mr-2 h-4 w-4 text-blue-600" />
                {facility.phone}
              </div>
              <div className="flex items-center text-gray-600 mb-2">
                <Clock className="mr-2 h-4 w-4 text-blue-600" />
                {facility.hours}
              </div>
              <div className="flex items-center text-gray-600 mb-2">
                <Mail className="mr-2 h-4 w-4 text-blue-600" />
                <a href={`mailto:${facility.email}`} className="text-blue-600 hover:underline">{facility.email}</a>
              </div>
              <div className="flex items-center text-gray-600 mb-2">
                <Globe className="mr-2 h-4 w-4 text-blue-600" />
                <a href={facility.website} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">Visit Website</a>
              </div>
              <div className="flex items-center text-gray-600">
                <Map className="mr-2 h-4 w-4 text-blue-600" />
                <a href={facility.mapLink} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">View on Map</a>
              </div>
            </div>
          </div>
        ))}
      </div>

      {!showAll && (
        <div className="text-center">
          <button
            onClick={() => setShowAll(true)}
            className="bg-blue-600 text-white font-semibold py-2 px-4 rounded-md hover:bg-blue-700 transition duration-300"
          >
            Load More
          </button>
        </div>
      )}
    </div>
  )
}

