const express = require('express')
const app = express()

const requestLogger = (req, res, next) => {
    console.log(`Method: ${req.method}`)
    console.log(`Path: ${req.path}`)
    console.log(`Body: ${req.body}`)
    console.log(`---`)
    next()
}

const unknownEndpoint = (req, res) => {
    res.status(404).send({'error': 'unknown endpoint'})
}

app.use(requestLogger)

app.get('/', (req, res) => {
    res.send(`<h1>Hello world!</h1>`)
})

app.use(unknownEndpoint)

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`)
})