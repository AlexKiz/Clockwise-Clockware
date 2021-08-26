const { fdatasync } = require('fs')
const { queryResult } = require('pg-promise')
const db = require('../db')

const postOrder = async (req, res) => {
        
    try {
        const {clocks_id, city_id, master_id, start_work_on, name, email} = req.body
        const durationTime = await db.query('SELECT installation_time FROM clocks WHERE id = $1',[clocks_id])

        if(installDuration.rows.length) {
            const { installation_time } = durationTime.rows[0]

            let date = new Date(`${start_work_on}`)
            date.setUTCHours(date.getHours() + installation_time)
            const end_work_on = date.toISOString()
        }

        let user_id
        const userId = await db.query('SELECT id FROM users WHERE email = $1', [email])

        if(userId.rows.length) {
            user_id = userId.rows[0].id
        }

        if(!userId.rows.length) {
            const createUser = await db.query('INSERT INTO users (name, email) VALUES ($1, $2) RETURNING *', [name, email])
            user_id = createUser.rows[0].id
        }

        const createOrder = await db.query('INSERT INTO orders (clocks_id, user_id, city_id, master_id, start_work_on, end_work_on) VALUES ($1, $2, $3, $4, $5, $6)', [clocks_id, user_id, city_id, master_id, start_work_on, end_work_on])

        res.status(201).json(createOrder.rows)

    } catch(error) {

        res.status(500).send()
    }
}


const getOrder = async (req, res) => {

    try {
        
        const readOrder = await db.query('SELECT orders.id as "orderId", orders.clocks_id as "clocksId", orders.user_id as "userId", orders.city_id as "cityId", orders.master_id as "masterId", (TO_CHAR(orders.start_work_on, \'YYYY-MM-DD,HH24:MI\')) as "startWorkOn", (TO_CHAR(orders.end_work_on, \'YYYY-MM-DD HH24:MI\')) as "endWorkOn", clocks.size as "clockSize", users.name as "userName", users.email as "userEmail", cities.name as "cityName", masters.name as "masterName" FROM orders INNER JOIN clocks ON orders.clocks_id = clocks.id INNER JOIN users ON orders.user_id = users.id INNER JOIN cities ON orders.city_id = cities.id INNER JOIN masters ON orders.master_id = masters.id')
        
        res.status(200).json(readOrder.rows)

    } catch(error) {

        res.status(500).send()
    }
}


const getClocks = async (req, res) => {

    try {

        const readClocks = await db.query('SELECT * FROM clocks')

        res.status(200).json(readClocks.rows)
        
    } catch(err) {

        res.status(500).send()
    }
}


const putOrder = async (req, res) => {

    try {
        const {id, clocks_id, user_id, city_id, master_id, start_work_on} = req.body

        const updateOrder = await db.query('UPDATE orders SET clocks_id = $2, user_id = $3, city_id = $4, master_id = $5, start_work_on = $6 WHERE id = $1', [id, clocks_id, user_id, city_id, master_id, start_work_on])

        res.status(200).json(updateOrder.rows)

    } catch(error) {

        res.status(500).send()
    }
}


const deleteOrder = async (req, res) => {

    try {
        const {id} = req.body

        const deleteOrder = await db.query('DELETE FROM orders WHERE id = $1', [id])

        res.status(204).json(deleteOrder.rows)

    } catch(error) {

        res.status(500).send()
    }
}

module.exports = {postOrder, getOrder, getClocks, putOrder, deleteOrder}