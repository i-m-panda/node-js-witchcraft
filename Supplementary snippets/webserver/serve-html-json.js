import express from "express"
const app = express();
// /welcome is the following route: http://localhost:3000/welcome
app.get('/welcome', (req, res) => {
    // HTML
    res.send('<h1>Hello World</h1>')
})
// /location is the following route: http://localhost:3000/location
app.get('/location', (req, res) => {
    // JSON
    res.send({
        latitude: '52.5173885',
        longitude: '13.3951309'
    })
})

app.listen(3000, () => {
    console.log('Server is up on port 3000.')
})