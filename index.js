const express = require('express')
const app = express()
const db = require('./api')
const port = 5431

app.use(express.json())
app.use(
  express.urlencoded({
    extended: true,
  })
)

app.get('/', (req, res) => {
  res.sendFile('./index.html', {root: __dirname})
})

app.get('/employees', db.getUsers)
app.get('/employees?num&:first_name&:last_name', db.getUserById)
app.post('/employees', db.createUser)

app.listen(port, () => {
  console.log(`Running on http://localhost:${port}.`)
})