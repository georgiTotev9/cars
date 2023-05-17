const {
    Schema,
    model,
    Types: { ObjectId },
} = require('mongoose');

const carSchema = new Schema({
    name: { type: String, required: true },
    description: { type: String, default: '' },
    imageUrl: { type: String },
    price: { type: Number, min: 1, required: true },
    owner: { type: ObjectId, ref: 'User' },
});

const Car = model('Car', carSchema);

module.exports = Car;
