const fs = require('fs/promises');

const filePath = './services/data.json';

async function read() {
    try {
        const file = await fs.readFile(filePath);
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

module.exports = () => (req, res, next) => {
    res.storage = {
        getAll,
    };
    next();
};
