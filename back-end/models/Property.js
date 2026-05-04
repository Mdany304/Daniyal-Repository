const mongoose = require('mongoose');

const propertySchema = new mongoose.Schema({
  title: { type: String, required: [true, 'Title is required'], trim: true },
  price: { type: Number, required: [true, 'Price is required'], min: [0, 'Price cannot be negative'] },
  location: { type: String, required: [true, 'Location is required'], trim: true },
  type: { type: String, enum: ['sale', 'rent'], required: [true, 'Type is required'] },
  category: {
    type: String,
    enum: ['Apartment', 'Villa', 'Bungalow', 'Penthouse', 'Townhouse', 'Commercial', 'Farmhouse'],
    default: 'Apartment',
  },
  beds: { type: Number, default: 0 },
  baths: { type: Number, default: 0 },
  area: { type: Number, default: 0 },
  description: { type: String, default: '' },
  image: { type: String, default: '' },
  featured: { type: Boolean, default: false },
}, { timestamps: true });

module.exports = mongoose.model('Property', propertySchema);
