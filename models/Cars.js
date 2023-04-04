const { Schema, model } = require('mongoose');

const carSchema = new Schema({
    name: { type: String, required: true },
    description: { type: String, default: '' },
    imageUrl: { type: String },
    price: { type: Number, min: 1, required: true },
});

const Car = model('Car', carSchema);

module.exports = Car;
