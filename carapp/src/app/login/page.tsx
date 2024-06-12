import React from 'react';
import LoginForm from '../components/LoginForm/LoginForm';
export default function Login() {
  return (
    <main className="login-container flex min-h-screen flex-col items-center justify-center p-24">
      <h1 className="text-4xl font-bold mb-4">Login</h1>
      <div className="login-box bg-white p-8 rounded shadow-lg text-center max-w-md">
        <LoginForm />
      </div>
      <footer className="credits text-center mt-4">
        <p>&copy; ELophem</p>
      </footer>
    </main>
  );
}