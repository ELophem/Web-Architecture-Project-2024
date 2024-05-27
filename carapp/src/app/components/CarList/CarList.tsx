'use client';
import { useEffect, useState } from 'react';

type Car = {
  id: number;
  manufacturer: string;
  model: string;
  pictures: string; 
  description: string;
  price: number;
  location: string;
};

const CarList = () => {
  const [cars, setCars] = useState<Car[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:4000/api/cars');
        if (response.ok) {
          const data = await response.json();
          setCars(data);
        } else {
          console.error('Failed to fetch cars:', response.statusText);
        }
      } catch (error) {
        console.error('Error fetching cars:', error);
      }
    };

    fetchData();
  }, []);

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
          <img src={car.pictures} alt={`Picture of ${car.manufacturer} ${car.model}`} width={200} height={150} />
        </div>
      ))}
    </div>
  );
};

export default CarList;
