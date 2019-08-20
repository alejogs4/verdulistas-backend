const path = require('path')
const fs = require('fs')

const query = fs.readFileSync(path.join(__dirname, 'query.gql'), { encoding: 'utf8' })
const mutation = fs.readFileSync(path.join(__dirname, 'mutation.gql'), { encoding: 'utf8' })
const users = fs.readFileSync(path.join(__dirname, 'users', 'user.gql'), { encoding: 'utf8' })

module.exports = `
  ${users}
  ${query}
  ${mutation}
`