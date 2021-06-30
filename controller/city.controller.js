const { fdatasync } = require('fs')
const db = require('../db')

class CityController {
    
    async postCity(req, res) {

        const {name} = req.body

        const createCity = await db.query('INSERT INTO cities (name) VALUES ($1)', [name])

        res.status(201).json(createCity.rows)
    }


    async getCity(req, res) {

        const readCity = await db.query('SELECT * FROM cities')

        res.status(200).json(readCity.rows)
    }


    async putCity(req, res) {

        const {id,name} = req.body

        const updateCity = await db.query('UPDATE cities SET name = $2 WHERE id = $1', [id, name])

        res.status(201).json(updateCity.rows)
    }


    async deleteCity(req, res) {

        const {id} = req.body

        const deleteCity = await db.query('DELETE FROM cities WHERE id = $1', [id])

        res.status(204).json(deleteCity.rows)
    } 

}

module.exports = new CityController()