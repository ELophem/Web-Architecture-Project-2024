'use client';
import React, { useState } from 'react';
import { useAuth } from '@/app/context/AuthContext';
import { signIn } from '@/app/lib/actions';

interface FormData {
  username: string;
  password: string;
}

const LoginForm: React.FC = () => {
  const { updateAuthState } = useAuth(); 
  const [formData, setFormData] = useState<FormData>({ username: '', password: '' });
  const [errorMessage, setErrorMessage] = useState<string>('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await signIn(formData, updateAuthState); 
      //window.location.href = '/catalog';
    } catch (error) {
      setErrorMessage(error as string);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" name="username" placeholder="Username" value={formData.username} onChange={handleChange} required />
      <input type="password" name="password" placeholder="Password" value={formData.password} onChange={handleChange} required />
      <div>{errorMessage && <p>{errorMessage}</p>}</div>
      <button type="submit">Login</button>
    </form>
  );
};

export default LoginForm;
