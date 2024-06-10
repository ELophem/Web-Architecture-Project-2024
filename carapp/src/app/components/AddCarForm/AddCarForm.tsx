'use client';
import React, { useState, FormEvent } from 'react';
import { Input } from '@nextui-org/react';
import { Button } from '@nextui-org/react';
import axios from 'axios';
import './AddCarForm.css';

export default function AddCarForm() {
  const [manufacturer, setManufacturer] = useState('');
  const [model, setModel] = useState('');
  const [pictures, setPictures] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [location, setLocation] = useState('');
  const [formSubmitMessage, setFormSubmitMessage] = useState('');

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();


    const userId = localStorage.getItem('userId')||'';

    const newCar = {
      manufacturer,
      model,
      pictures,
      description,
      price: parseFloat(price),
      location,
      userId: parseInt(userId), 
    };

    try {
      const response = await axios.post('http://localhost:4000/api/cars', newCar);

      if (response.status === 200) {
        setFormSubmitMessage('Car added successfully');
        setManufacturer('');
        setModel('');
        setPictures('');
        setDescription('');
        setPrice('');
        setLocation('');
      } else {
        setFormSubmitMessage('Failed to add car');
      }
    } catch (error) {
      console.error('There was an error adding the car:', error);
      setFormSubmitMessage('Error adding car');
    }
  };

  return (
    <div className="form-container">
      <form onSubmit={handleSubmit}>
        <Input label="Manufacturer" value={manufacturer} onChange={(e) => setManufacturer(e.target.value)} required />
        <Input label="Model" value={model} onChange={(e) => setModel(e.target.value)} required />
        <Input label="Pictures (Please enter a valid URL)" value={pictures} onChange={(e) => setPictures(e.target.value)} />
        <Input label="Description" value={description} onChange={(e) => setDescription(e.target.value)} required />
        <Input label="Price" value={price} type="number" onChange={(e) => setPrice(e.target.value)} required />
        <Input label="Location" value={location} onChange={(e) => setLocation(e.target.value)} required />
        <Button type="submit">Add Car</Button>
      </form>
      <p>{formSubmitMessage}</p>
    </div>
  );
}
