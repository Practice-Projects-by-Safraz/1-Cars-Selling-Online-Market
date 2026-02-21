// temporary-check.js
import mongoose from 'mongoose';
import Car from './models/Car.js';

async function checkSchema() {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/car-market');
    
    // Schema paths check karein
    const fuelTypePath = Car.schema.path('fuelType');
    console.log('FuelType allowed values:', fuelTypePath.enumValues);
    
    // Ya phir poora schema dekhein
    console.log('Full schema paths:', Object.keys(Car.schema.paths));
    
  } catch (err) {
    console.error('Error:', err);
  } finally {
    await mongoose.disconnect();
  }
}

checkSchema();