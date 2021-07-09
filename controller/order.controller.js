const { fdatasync } = require('fs')
const { queryResult } = require('pg-promise')
const db = require('../db')

class OrderController {

    async postOrder(req, res) {
        
        const {clock_size, city_id, master_id, start_work_at, name, email} = req.body
        
        const userId = await db.query('SELECT id FROM users WHERE email = $1', [email])
        let user_id = userId.rows[0].id

        if(!userId.rows.length) {
    
            const createUser = await db.query('INSERT INTO users (name, email) VALUES ($1, $2)', [name, email])
            user_id = createUser.rows[0].id
        }

        const createOrder = await db.query('INSERT INTO orders (clock_size, user_id, city_id, master_id, start_work_at) VALUES ($1, $2, $3, $4, $5)', [clock_size, user_id, city_id, master_id, start_work_at])

        res.status(201).json(createOrder.rows)
    }


    async getOrder(req, res) {

        const readOrder = await db.query('SELECT * FROM orders')

        res.status(200).json(readOrder.rows)
    }


    async getClockSize(req, res) {

        const readClockSize = await db.query('SELECT * FROM clocksize')

        res.status(200).json(readClockSize.rows)
    }

    
    async putOrder(req, res) {

        const {id, clock_size, user_id, city_id, master_id, start_work_at} = req.body

        const updateOrder = await db.query('UPDATE orders SET clock_size = $2, user_id = $3, city_id = $4, master_id = $5, start_work_at = $6 WHERE id = $1', [id, clock_size, user_id, city_id, master_id, start_work_at])

        res.status(201).json(updateOrder.rows)
    }


    async deleteOrder(req, res) {

        const {id} = req.body

        const deleteOrder = await db.query('DELETE FROM orders WHERE id = $1', [id])

        res.status(210).json(deleteOrder.rows)
    }

}

module.exports = new OrderController()