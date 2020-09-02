const app = require('./server')
const port = process.env.PORT || 7070

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`)
})