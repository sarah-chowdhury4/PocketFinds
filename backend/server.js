// importing
// const express = require('express') in a diff way:
import express from 'express';
import dotenv from "dotenv";
import {connectDB} from './config/db.js';

dotenv.config();

// express app
const app = express()

//middleware
app.use((req, res, next) => {
    console.log(req.path, req.method)
    next()
})

// routes
app.get('/', (req, res) => {
    res.json({mssg: 'Welcome to PocketFinds'})
})

// listen for requests
app.listen(process.env.PORT, () => {
    connectDB();
    console.log('listening on port', process.env.PORT)
})

process.env