const { fdatasync } = require('fs')
const db = require('../db')


    
const postCity = async (req, res) => {

    try {
        const {name} = req.body

        const createCity = await db.query('INSERT INTO cities (name) VALUES ($1)', [name])

        res.status(201).json(createCity.rows)

    } catch(error) {
        
        res.status(500).send(error)
    }
    
}


const getCity = async (req, res) => {

    try {
        const readCity = await db.query('SELECT * FROM cities')

        res.status(200).json(readCity.rows)

    } catch(error) {

        res.status(500).send(error)
    }
}


const putCity = async (req, res) => {

    try {
        const {id,name} = req.body.data

        const updateCity = await db.query('UPDATE cities SET name = $2 WHERE id = $1', [id, name])

        res.status(200).json(updateCity.rows)

    } catch(error) {

        res.status(500).send(error)
    }
}


const deleteCity = async (req, res) => {

    try {
        const {id} = req.body

        const deleteCity = await db.query('DELETE FROM cities WHERE id = $1', [id])

        res.status(204).json(deleteCity.rows)

    } catch(error) {

        res.status(500).send(error)
    }
} 



module.exports = {postCity, getCity, putCity, deleteCity}