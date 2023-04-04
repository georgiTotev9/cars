const mongoose = require('mongoose');

require('./Cars');
require('./Accessories');

const connectionString = 'mongodb://127.0.0.1:27017/carbicle';

async function init() {
    try {
        await mongoose.connect(connectionString, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });

        console.log('!db connected!');

        mongoose.connection.on('error', (err) => {
            console.error('Db error');
            console.error(err);
        });
    } catch (error) {
        console.error('Error connecting to db');
        process.exit(1);
    }
}

module.exports = init;
