const { fdatasync } = require('fs')
const db = require('../db')

class OrderController {

    async postOrder(req, res) {
        
        const {clock_size, user_id, city_id, master_id, start_work_at} = req.body

        const createOrder = await db.query('INSERT INTO orders (clock_size, user_id, city_id, master_id, start_work_at) VALUES ($1, $2, $3, $4, $5)', [clock_size, user_id, city_id, master_id, start_work_at])

        res.status(201).json(createOrder.rows)
    }


    async getOrder(req, res) {

        const readOrder = await db.query('SELECT * FROM orders')

        res.status(200).json(readOrder.rows)
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