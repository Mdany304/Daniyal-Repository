const asyncHandler = require('express-async-handler');
const Property = require('../models/Property');

const getProperties = asyncHandler(async (req, res) => {
  const { type, category, minPrice, maxPrice, location, search } = req.query;
  let query = {};
  if (type && type !== 'all') query.type = type;
  if (category && category !== 'all') query.category = category;
  if (location) query.location = { $regex: location, $options: 'i' };
  if (search) {
    query.$or = [
      { title: { $regex: search, $options: 'i' } },
      { location: { $regex: search, $options: 'i' } },
    ];
  }
  if (minPrice || maxPrice) {
    query.price = {};
    if (minPrice) query.price.$gte = Number(minPrice);
    if (maxPrice) query.price.$lte = Number(maxPrice);
  }
  const properties = await Property.find(query).sort({ createdAt: -1 });
  res.json({ success: true, count: properties.length, data: properties });
});

const getProperty = asyncHandler(async (req, res) => {
  const property = await Property.findById(req.params.id);
  if (!property) { res.status(404); throw new Error('Property not found'); }
  res.json({ success: true, data: property });
});

const createProperty = asyncHandler(async (req, res) => {
  const { title, price, location, type, category, beds, baths, area, description, featured } = req.body;
  const image = req.file
    ? `${req.protocol}://${req.get('host')}/uploads/${req.file.filename}`
    : req.body.image || '';
  const property = await Property.create({
    title, price, location, type, category, beds, baths, area, description, image,
    featured: featured === 'true' || featured === true,
  });
  res.status(201).json({ success: true, data: property });
});

const updateProperty = asyncHandler(async (req, res) => {
  let property = await Property.findById(req.params.id);
  if (!property) { res.status(404); throw new Error('Property not found'); }
  const updateData = { ...req.body };
  if (req.file) updateData.image = `${req.protocol}://${req.get('host')}/uploads/${req.file.filename}`;
  if (updateData.featured !== undefined) {
    updateData.featured = updateData.featured === 'true' || updateData.featured === true;
  }
  property = await Property.findByIdAndUpdate(req.params.id, updateData, { new: true, runValidators: true });
  res.json({ success: true, data: property });
});

const deleteProperty = asyncHandler(async (req, res) => {
  const property = await Property.findById(req.params.id);
  if (!property) { res.status(404); throw new Error('Property not found'); }
  await property.deleteOne();
  res.json({ success: true, message: 'Property deleted', id: req.params.id });
});

module.exports = { getProperties, getProperty, createProperty, updateProperty, deleteProperty };
