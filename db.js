const Sequelize = require('sequelize')
const db = new Sequelize({
    dialect: 'sqlite',
    storage: __dirname + '/users.db'
})

const Users = db.define('users', {
    name: {
        type: Sequelize.STRING(30),
        allowNull: false
    },
    message: {
        type: Sequelize.TEXT
    }
})

module.exports = {
    db,
    Users
}