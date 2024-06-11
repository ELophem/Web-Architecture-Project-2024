'use client';
import React, { useState, useEffect } from 'react';
import './CarList.css';

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
    <div className="car-list">
      {cars.map((car) => (
        <div key={car.id} className="car-card">
          <img
            src={car.pictures}
            alt={`Picture of ${car.manufacturer} ${car.model}`}
          />
          <div className="car-card-content">
            <h2 className="car-card-title">
              {car.manufacturer} {car.model}
            </h2>
            <p className="car-card-description">{car.description}</p>
            <p className="car-card-price">Price: ${car.price}</p>
            <p className="car-card-location">Location: {car.location}</p>

            {isAdmin && (
              <button
                onClick={() => handleDelete(car.id)}
                className="delete-button"
              >
                Delete
              </button>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default CarList;
