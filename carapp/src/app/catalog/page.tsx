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
  try {
    const response = await fetch('http://localhost:4000/api/cars', {
      next: { revalidate: 10 } // revalidate every 10 seconds
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

export default async function Catalog() {
  const cars: Car[] = await fetchCars();
  
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1 className="text-4xl font-bold">Catalog of Available Cars</h1>
      <CarsList cars={cars} />
    </main>
  );
}
