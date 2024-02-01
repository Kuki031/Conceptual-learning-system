'use strict';

const dotenv = require('dotenv');
dotenv.config({ path: './config.env' });
const mongoose = require('mongoose');
const app = require('./app');

const PORT = process.env.PORT || 3000;
const LOCAL_HOST = process.env.LOCALHOST;

const DB_STRING = process.env.DB_STRING.replace('<password>', process.env.DB_PW);

process.on('uncaughtException', (err) => {
    console.error(`Unhandled exception... -- ${err.message}`);
    process.emit('beforeExit', 1);
})


const connectToDatabase = async () => {
    try {
        await mongoose.connect(DB_STRING);
        console.log('Connection to database succesful.');
    }
    catch (err) {
        console.error(err.message);
    }
}
connectToDatabase();

const server = app.listen(PORT, LOCAL_HOST, () => {
    console.log(`Server running on ${LOCAL_HOST}:${PORT}`);
})

process.on('unhandledRejection', (err) => {
    console.error(`Unhandled rejection, shutting down. -- ${err.message}`);
    process.exit(1);
})
