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
    const cars = await Car.find({}); //.lean();

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
    const data = await read();

    if (data.hasOwnProperty(id)) {
        delete data[id];
        await write(data);
    } else {
        throw new ReferenceError('No such ID in database');
    }
}

async function updateById(id, car) {
    const data = await read();

    if (data.hasOwnProperty(id)) {
        data[id] = car;
        await write(data);
    } else {
        throw new ReferenceError('No such ID in database');
    }
}

function nextId() {
    return 'xxxxxxxx-xxxx'.replace(/x/g, () =>
        ((Math.random() * 16) | 0).toString(16)
    );
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
