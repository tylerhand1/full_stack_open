const http = require('http')

const app = http.createServer((request, response) => {
    response.writeHead(200, { 'Content-Type': 'text/html' })
    response.end('<h1>Hello world</h1>')
})

const PORT = 3001
app.listen(PORT)
console.log(`Server running on port ${PORT}`)