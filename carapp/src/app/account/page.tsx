import React from 'react';
import RegisterForm from '../components/RegisterForm/RegisterForm';
export default function Account() {
  return (
    <main className="register-container flex min-h-screen flex-col items-center justify-center p-24">
      <h1 className="text-4xl font-bold mb-4">Register</h1>
      <div className="register-box bg-white p-8 rounded shadow-lg text-center max-w-md">
        <RegisterForm />
      </div>
    </main>
 
  );
}