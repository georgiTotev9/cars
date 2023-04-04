const { Schema, model } = require('mongoose');

const accessorySchema = new Schema({
    name: { type: String, required: true },
    description: { type: String, default: '' },
    imageUrl: { type: String, default: '' },
    price: { type: Number, min: 0 },
});

const Accessory = model('Accessory', accessorySchema);

module.exports = Accessory;