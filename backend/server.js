import express from 'express';
import dotenv from 'dotenv';
import connectDB from './src/db/index.js';

dotenv.config({
    path: './.env'
})

const app = express()
const port = process.env.PORT || 5000


app.get('/', (req, res) => {
    res.send("Welcome to intra college hackathon")
})

connectDB()
    .then(() => {
    app.on('Error', (err) => {
        console.log('Failed to listen', err)
        process.exit(1)
    })

    app.listen(port, () => {
        console.log(`App is listening at http://localhost:${port}`)
    })
})
    .catch(err => {
        console.log("Error connecting DB,", err.message)
        process.exit(1)
    })

