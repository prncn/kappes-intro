const Pool = require('pg').Pool
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'kappes-project',
  password: 'masterkey',
  port: 5432,
})

const getUsers = (request, response) => {
  pool.query('SELECT * FROM employees ORDER BY id ASC', (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}

const searchUser = (request, response) => {
  const { first_name, last_name } = request.params
  const num = parseInt(request.params.num)

  console.log(request.params)

  pool.query('SELECT * FROM employees WHERE num = $1 OR first_name = $2 OR last_name = $3', [num, first_name, last_name], (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}

const createUser = (request, response) => {
  const { first_name, last_name, num } = request.body

  pool.query('INSERT INTO employees (first_name, last_name, num) VALUES ($1, $2, $3)', [first_name, last_name, num], (error, results) => {
    if (error) {
      throw error
    }
    response.status(201).send(`Entry added with ID: ${results.insertId}`)
  })
}

module.exports = {
  getUsers,
  getUserById: searchUser,
  createUser,
}