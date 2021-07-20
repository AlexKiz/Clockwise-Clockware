const { fdatasync } = require('fs')
const db = require('../db')

class MasterController {

    async postMaster(req, res) {

        const {name, rating, city_id} = req.body

        const createMaster = await db.query('INSERT INTO masters (name, rating, city_id) VALUES ($1, $2, $3)', [name, rating, city_id])

        res.status(201).json(createMaster.rows)
    }


    async getMaster(req, res) {

        const readMaster = await db.query('SELECT * FROM masters')

        res.status(200).json(readMaster.rows)
    }


    async getAvailableMasters(req, res) {
        
        const {city_id, start_work_at, clocks_id} = req.query
        
        const installDuration = await db.query('SELECT installation_time FROM clocks WHERE id = $1', [clocks_id])
        const { installation_time } = installDuration.rows[0]

        let date = new Date(`${start_work_at}`)
        date.setUTCHours(date.getHours() + installation_time)
        const end_work_at = date.toISOString()

        const readBookedMasters = await db.query('SELECT master_id FROM orders WHERE ((start_work_at <= $1 AND end_work_at >= $1) OR (start_work_at <= $2 AND end_work_at >= $2))', [start_work_at, end_work_at])

        const bookedMastersId = readBookedMasters.rows.map((elem) => elem.master_id)


        if(bookedMastersId.length != 0) {

            const readAvailableMasters = await db.query(`SELECT * FROM masters WHERE city_id = ${city_id} AND id NOT IN (${bookedMastersId.join(',')})`)

            res.status(200).json(readAvailableMasters.rows)

        } else {

            const readAvailableMasters = await db.query(`SELECT * FROM masters WHERE city_id = ${city_id}`)

            res.status(200).json(readAvailableMasters.rows)
        }
    }


    async putMaster(req, res) {
        
        const {id, name, rating, city_id} = req.body

        const updateMaster = await db.query('UPDATE masters SET name = $2, rating = $3, city_id = $4 WHERE id = $1', [id, name, rating, city_id])

        res.status(201).json(updateMaster.rows)
    }


    async deleteMaster(req, res) {

        const {id} = req.body

        const deleteMaster = await db.query('DELETE FROM masters WHERE id = $1', [id])

        res.status(204).json(deleteMaster.rows)
    }
}


module.exports = new MasterController()