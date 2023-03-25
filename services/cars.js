const fs = require('fs/promises');

const filePath = './services/data.json';

async function read() {
    try {
        const file = await fs.readFile(filePath);
        return JSON.parse(file);
    } catch (err) {
        console.error('Database read error');
        console.error(err);
        process.exit(1);
    }
}

async function write(data) {
    try {
        await fs.writeFile(filePath, JSON.stringify(data));
    } catch (error) {
        console.error('Database write error');
        console.error(err);
        process.exit(1);
    }
}

async function getAll() {
    const data = await read();
    return Object.entries(data).map(([id, value]) =>
        Object.assign({}, { id }, value)
    );
}

async function getById(id) {
    const data = await read();
    const car = data[id];

    if (!car) return undefined;

    return Object.assign({}, { id }, car);
}

async function createCar(car) {
    const cars = await read();

    let id;

    do {
        id = nextId();
    } while (car.hasOwnProperty(id));

    cars[id] = car;

    await write(cars);
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
        createCar
    };
    next();
};
