import React from 'react';
import AddCarForm from '../components/AddCarForm/AddCarForm';
import ProtectedRoute from '../components/ProtectedRoutes/ProtectedRoutes';

export default function AddCar() {
  return (
    <ProtectedRoute>
      <main className="flex min-h-screen flex-col items-center justify-between p-24">
        <h1 className="text-4xl font-bold">Add Car</h1>
        <AddCarForm />
      </main>
    </ProtectedRoute>
  );
}
