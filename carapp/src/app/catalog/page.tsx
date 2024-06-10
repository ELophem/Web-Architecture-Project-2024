"use client";

import React, { useState, useEffect } from 'react';
import CarsList from '../components/CarList/CarList';

type Car = {
  id: number;
  manufacturer: string;
  model: string;
  pictures: string; 
  description: string;
  price: number;
  location: string;
};

const fetchCars = async () => {
  const token = localStorage.getItem('token');
  
  try {
    const response = await fetch('http://localhost:4000/api/cars', {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      next: { revalidate: 10 } 
    });

    if (!response.ok) {
      throw new Error('Failed to fetch cars');
    }

    return await response.json();
  } catch (error) {
    console.error('Error fetching cars:', error);
    return [];
  }
};

const deleteCar = async (id: number) => {
  const token = localStorage.getItem('token');
  
  try {
    const response = await fetch(`http://localhost:4000/api/cars/${id}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });

    if (!response.ok) {
      throw new Error('Failed to delete car');
    }

    const data = await response.json();
    console.log('Deleted car response:', data);
    return data;
  } catch (error) {
    console.error('Error deleting car:', error);
    throw error;
  }
};

export default function Catalog() {
  const [cars, setCars] = useState<Car[]>([]);
  const [loading, setLoading] = useState(true);
  const isAdmin = localStorage.getItem('isAdmin') === 'true';

  useEffect(() => {
    const fetchData = async () => {
      const fetchedCars = await fetchCars();
      setCars(fetchedCars);
      setLoading(false);
    };

    fetchData();
  }, []);

  const handleDelete = async (id: number) => {
    try {
      await deleteCar(id);
      setCars(cars.filter(car => car.id !== id));
    } catch (error) {
      console.error('Error deleting car:', error);
    }
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1 className="text-4xl font-bold">Catalog of Available Cars</h1>
      <CarsList cars={cars} onDelete={handleDelete} isAdmin={isAdmin} />
    </main>
  );
}
