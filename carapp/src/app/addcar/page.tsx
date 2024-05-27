import AddCarForm from '../components/AddCarForm/AddCarForm';
export default function AddCar() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
    <h1 className="text-4xl font-bold">Add Car</h1>
    <AddCarForm />
  </main>
 
  );
}