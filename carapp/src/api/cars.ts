// pages/api/cars.js
import { prisma } from '../lib/prisma';

export default async function handler(req, res) {
  if (req.method === 'GET') {
    try {
      const cars = await prisma.car.findMany();
      res.status(200).json(cars);
    } catch (error) {
      console.error('Error fetching cars:', error);
      res.status(500).json({ error: 'Failed to fetch cars' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
