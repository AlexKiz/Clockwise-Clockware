const { fdatasync } = require('fs')
const db = require('../db')

class UserController {

    async postUser(req, res) {

        const {name, email} = req.body

        const createMaster = await db.query('INSERT INTO users (name, email) VALUES ($1, $2)', [name, email])

        res.status(201).json(createMaster.rows)
    }


    async getUser(req, res) {

        const readUser = await db.query('SELECT * FROM users')

        res.status(200).json(readUser.rows)

    }


    async putUser(req, res) {

        const {id, name, email} = req.body

        const updateUser = await db.query('UPDATE users SET name = $2, email = $3 WHERE id = $1', [id, name, email])

        res.status(201).json(updateUser.rows)
    }


    async deleteUser(req, res) {

        const {id} = req.body

        const deleteUser = await db.query('DELETE FROM users WHERE id = $1', [id])
        
        res.status(204).json(deleteUser.rows)
    }
}


module.exports = new UserController()