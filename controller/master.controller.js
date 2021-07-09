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
        
        const {city_id} = req.query
        
        const readAvailableMasters = await db.query('SELECT masters.* FROM masters LEFT JOIN cities ON masters.city_id = cities.id WHERE masters.city_id = $1',[city_id])

        res.status(200).json(readAvailableMasters.rows)
        
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