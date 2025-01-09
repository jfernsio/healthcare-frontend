import { NextResponse } from 'next/server'

export async function getFacilities({ latitude, longitude, type }: {
  latitude: number;
  longitude: number;
  type?: string;
}) {
  try {
    const response = await fetch(`https://healthcare-api-production-1930.up.railway.app/api/facilities`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include'
    });

    if (!response.ok) {
      throw new Error('Failed to fetch facilities');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching facilities:', error);
    throw error;
  }
}