const { fdatasync } = require('fs')
const db = require('../db')



const postMaster = async (req, res)  => {

    try {
        const {name, city_id} = req.body

        const createMaster = await db.query('INSERT INTO masters (name, city_id) VALUES ($1, $2)', [name, city_id])

        res.status(201).json(createMaster.rows)

    } catch(error) {

        res.status(500).send(error)
    }
}


const getMaster = async (req, res) => {

    try {
        const readMaster = await db.query('SELECT masters.id AS "masterId", masters.name AS "masterName", masters.city_id AS "cityId", masters.rating AS "rating", cities.name AS "cityName" FROM masters LEFT JOIN cities ON masters.city_id = cities.id')

        res.status(200).json(readMaster.rows)
        
    } catch(error) {

        res.status(500).send(error)
    }
}


const getAvailableMasters = async (req, res) => {
        
    try {
        const {city_id, start_work_on, clocks_id} = req.query
        
        const installDuration = await db.query('SELECT installation_time FROM clocks WHERE id = $1', [clocks_id])

        if(installDuration.rows.length) {

            const { installation_time } = installDuration.rows[0]
            
            let date = new Date(`${start_work_on}`)
            date.setUTCHours(date.getHours() + installation_time)
            const end_work_on = date.toISOString()
            
            const readBookedMasters = await db.query('SELECT master_id FROM orders WHERE ((start_work_on <= $1 AND end_work_on >= $1) OR (start_work_on <= $2 AND end_work_on >= $2))', [start_work_on, end_work_on])
            
            const bookedMastersId = readBookedMasters.rows.map((elem) => elem.master_id)
            

            if(bookedMastersId.length != 0) {

                const readAvailableMasters = await db.query(`SELECT * FROM masters WHERE city_id = ${city_id} AND id NOT IN (${bookedMastersId.join(',')})`)

                res.status(200).json(readAvailableMasters.rows)

            } else {

                const readAvailableMasters = await db.query(`SELECT * FROM masters WHERE city_id = ${city_id}`)

                res.status(200).json(readAvailableMasters.rows)
            }
        }
        
    } catch(error) {

        res.status(500).send()
    }
}


const getAvailableMastersForUpdate = async (req, res) => {
        
    try {
        const {currentOrderId, city_id, start_work_on, clocks_id} = req.query


        const installDuration = await db.query('SELECT installation_time FROM clocks WHERE id = $1', [clocks_id])
        const { installation_time } = installDuration.rows[0]

        let date = new Date(`${start_work_on}`)
        date.setUTCHours(date.getHours() + installation_time)
        const end_work_on = date.toISOString()


        const readBookedMasters = await db.query('SELECT master_id FROM orders WHERE ((start_work_on <= $1 AND end_work_on >= $1) OR (start_work_on <= $2 AND end_work_on >= $2)) AND id != $3', [start_work_on, end_work_on, currentOrderId])

        const bookedMastersId = readBookedMasters.rows.map((elem) => elem.master_id)


        if(bookedMastersId.length != 0) {

            const readAvailableMasters = await db.query(`SELECT * FROM masters WHERE city_id = ${city_id} AND id NOT IN (${bookedMastersId.join(',')})`)

            res.status(200).json(readAvailableMasters.rows)

        } else {

            const readAvailableMasters = await db.query(`SELECT * FROM masters WHERE city_id = ${city_id}`)

            res.status(200).json(readAvailableMasters.rows)
        }

    } catch(error) {

        res.status(500).send()
    }
}


const putMaster = async (req, res) => {
        
    try {
        const {id, name, city_id} = req.body.data
        
        const updateMaster = await db.query('UPDATE masters SET name = $2, city_id = $3 WHERE id = $1', [id, name, city_id])
        
        res.status(200).json(updateMaster.rows)

    } catch(error) {

        res.status(500).send()
    }
}


const deleteMaster = async (req, res) => {

    try {
        const {id} = req.body

        const deleteMaster = await db.query('DELETE FROM masters WHERE id = $1', [id])

        res.status(204).json(deleteMaster.rows)

    } catch(error) {

        res.status(500).send()
    }
}



module.exports = {postMaster, getMaster, getAvailableMasters, getAvailableMastersForUpdate, putMaster, deleteMaster}