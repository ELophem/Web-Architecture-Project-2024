import CarsList from '../components/CarList/CarList';
export default function Catalog() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
    <h1 className="text-4xl font-bold">Catalog of Available Cars</h1>
    <CarsList />
  </main>
 
  );
}