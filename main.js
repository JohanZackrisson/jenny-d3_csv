const express = require('express')
const path = require("path")
const app = express()
const port = 3000

app.use('/static', express.static(path.join(__dirname, 'public')))
app.get('/', (req, res) => res.send('Hello World!'))

app.listen(port, () => console.log(`Open http://localhost:${port}/static/index.html`))