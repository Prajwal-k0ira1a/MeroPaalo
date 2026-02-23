import express from 'express';

const app = express()
const port = 3000

app.get('/', (req, res) => {
    res.send("Welcome to intra college hackathon")
})

app.listen(port, () => {
    console.log(`App is listening at http://localhost:${port}`)
})