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
        <div className="grid-container">
          <div className="form-group">
            <label className="block text-sm font-bold mb-2" htmlFor="manufacturer">
              Manufacturer
            </label>
            <input
              id="manufacturer"
              value={manufacturer}
              onChange={(e) => setManufacturer(e.target.value)}
              required
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div className="form-group">
            <label className="block text-sm font-bold mb-2" htmlFor="model">
              Model
            </label>
            <input
              id="model"
              value={model}
              onChange={(e) => setModel(e.target.value)}
              required
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div className="form-group">
            <label className="block text-sm font-bold mb-2" htmlFor="pictures">
              Pictures (Please enter a valid URL)
            </label>
            <input
              id="pictures"
              value={pictures}
              onChange={(e) => setPictures(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div className="form-group">
            <label className="block text-sm font-bold mb-2" htmlFor="description">
              Description
            </label>
            <input
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div className="form-group">
            <label className="block text-sm font-bold mb-2" htmlFor="price">
              Price
            </label>
            <input
              id="price"
              value={price}
              type="number"
              onChange={(e) => setPrice(e.target.value)}
              required
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div className="form-group">
            <label className="block text-sm font-bold mb-2" htmlFor="location">
              Location
            </label>
            <input
              id="location"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              required
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
        </div>
        {formSubmitMessage && <p className="text-green-500 text-xs italic">{formSubmitMessage}</p>}
        <div className="mb-4">
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Add Car
          </button>
        </div>
      </form>
    </div>
  );
}
