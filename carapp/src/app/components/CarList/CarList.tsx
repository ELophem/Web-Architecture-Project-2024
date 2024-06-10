'use client';
import React, { useState, useEffect } from 'react';

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
  try {
    const token = localStorage.getItem('token');
    const response = await fetch('http://localhost:4000/api/cars', {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      next: { revalidate: 10 },
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
  try {
    const token = localStorage.getItem('token');
    const response = await fetch(`http://localhost:4000/api/cars/${id}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
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

const CarList = () => {
  const [cars, setCars] = useState<Car[]>([]);
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const fetchedCars = await fetchCars();
      setCars(fetchedCars);
      setLoading(false);
    };

    fetchData();

    const adminStatus = localStorage.getItem('isAdmin') === 'true';
    setIsAdmin(adminStatus);
  }, []);

  const handleDelete = async (id: number) => {
    try {
      await deleteCar(id);
      setCars(cars.filter((car) => car.id !== id));
    } catch (error) {
      console.error('Error deleting car:', error);
    }
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="grid grid-cols-3 gap-4">
      {cars.map((car) => (
        <div key={car.id} className="border p-4">
          <h2 className="text-xl font-bold">
            {car.manufacturer} {car.model}
          </h2>
          <p>{car.description}</p>
          <p>Price: ${car.price}</p>
          <p>Location: {car.location}</p>
          <img
            src={car.pictures}
            alt={`Picture of ${car.manufacturer} ${car.model}`}
            width={200}
            height={150}
          />
          {isAdmin && (
            <button
              onClick={() => handleDelete(car.id)}
              className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mt-4"
            >
              Delete
            </button>
          )}
        </div>
      ))}
    </div>
  );
};

export default CarList;
