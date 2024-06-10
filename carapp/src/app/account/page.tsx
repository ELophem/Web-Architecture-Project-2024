import React from 'react';
import RegisterForm from '../components/RegisterForm/RegisterForm';
export default function Account() {
  return (

    <main className="flex min-h-screen flex-col items-center justify-between p-24">
    <h1 className="text-4xl font-bold">Register</h1>
    <RegisterForm />
  </main>
 
  );
}