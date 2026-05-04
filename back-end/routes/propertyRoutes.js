const express = require('express');
const router = express.Router();
const upload = require('../middleware/upload');
const { getProperties, getProperty, createProperty, updateProperty, deleteProperty } = require('../controllers/propertyController');

router.route('/').get(getProperties).post(upload.single('image'), createProperty);
router.route('/:id').get(getProperty).put(upload.single('image'), updateProperty).delete(deleteProperty);

module.exports = router;
