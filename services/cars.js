const Car = require('../models/Cars');

function carViewModel(car) {
    return {
        id: car._id,
        name: car.name,
        description: car.description,
        imageUrl: car.imageUrl,
        price: car.price,
    };
}

async function getAll(query) {
    let options = {};

    if (query.search) {
        options.name = new RegExp(query.search, 'i');
    }
    if (query.from) {
        options.price = { $gte: Number(query.from) };
    }
    if (query.to) {
        if (!options.price) {
            options.price = {};
        }
        options.price.$lte = Number(query.to);
    }

    const cars = await Car.find(options); //.lean();

    return cars.map(carViewModel);
}

async function getById(id) {
    const car = await Car.findById(id);

    if (!car) return undefined;

    return carViewModel(car);
}

async function createCar(car) {
    const result = new Car(car);
    await result.save();

    // or await Car.create(car);
}

async function deleteById(id) {
    await Car.findByIdAndDelete(id);
}

async function updateById(id, car) {
    // await Car.findByIdAndUpdate(id, car)

    const existing = await Car.findById(id);

    existing.name = car.name;
    existing.description = car.description;
    existing.price = car.price;
    existing.imageUrl = car.imageUrl;

    await existing.save();
}

module.exports = () => (req, res, next) => {
    req.storage = {
        getAll,
        getById,
        createCar,
        updateById,
        deleteById,
    };
    next();
};
