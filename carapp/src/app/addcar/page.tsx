import React from 'react';
import AddCarForm from '../components/AddCarForm/AddCarForm';
import ProtectedRoute from '../components/ProtectedRoutes/ProtectedRoutes';

export default function AddCar() {
  return (
    <ProtectedRoute>
      <main className="addcar-container flex min-h-screen flex-col items-center justify-center p-24">
        <h1 className="text-4xl font-bold mb-4">Add Car</h1>
        <div className="addcar-box bg-white p-8 rounded shadow-lg text-center max-w-md">
          <AddCarForm />
        </div>
      </main>
    </ProtectedRoute>
  );
}
