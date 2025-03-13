import express from 'express';
import bodyParser from 'body-parser';
import logger from 'morgan';
import mongoose from 'mongoose';

// Set up express app
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(logger('dev'));
const MONGO_URI = process.env.MONGO_URI || "mongodb://mongo:27017/x-auth";

// Set up mongoose
const connectWithRetry = () => {
    console.log("Attempting to connect to MongoDB...");
    // { useNewUrlParser: true, useUnifiedTopology: true } no longer nedded
    mongoose.connect(MONGO_URI)
        .then(() => {
            console.log('Database connected');
        })
        .catch((error) => {
            console.log('Error connecting to database:', error);
            setTimeout(connectWithRetry, 5000);
        });
};
connectWithRetry();
// Set up port number
const port = process.env.PORT || 5000;

// Set up home route
app.get('/', (req, res) => {
    res.status(200).json({
        message: 'Welcome to Project Support',
    });
});

app.listen(port, (request, respond) => {
    console.log(`Our server is live on ${port}. Yay!`);
});

import mainRoutes from './server/routes/main.js';
app.use('/api/', mainRoutes);