const { fdatasync } = require('fs')
const db = require('../db')



const postMaster = async (req, res)  => {

    try {
        const {name, cities_id} = req.body

        const createMaster = await db.query('INSERT INTO masters (name) VALUES ($1) RETURNING id', [name])

        const createdMasterId = createMaster.rows[0].id

        const masterToCitiesValues = cities_id.map(function(elem) {return `(${createdMasterId},${elem})`}).join()

        const citiesOfMaster = await db.query(`INSERT INTO masters_cities (master_id, city_id) VALUES ${masterToCitiesValues}`) 
        
        res.status(201).json(createMaster.rows[0].id)

    } catch(error) {

        res.status(500).send(error)
    }
}


const getMaster = async (req, res) => {

    try {
        const readMasters = await db.query('SELECT masters.id AS "masterId", masters.name AS "masterName", masters.rating AS "rating" FROM masters')

        const readMasterCities = await db.query('SELECT masters_cities.master_id AS "masterId", masters_cities.city_id AS "cityId", cities.name AS "cityName" FROM masters_cities JOIN cities ON masters_cities.city_id = cities.id')
        
        const fullMasterData = readMasters.rows.map((master) => {

            const compareId = master.masterId;
            
            master.cities = readMasterCities.rows.filter(item => item.masterId === compareId);
            
            return master;
            
        });

        res.status(200).json(fullMasterData)
        
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

                const readAvailableMasters = await db.query(`SELECT * FROM masters JOIN masters_cities ON masters_cities.master_id = masters.id 
                                                                                                        AND city_id = ${city_id} 
                                                                                                        AND id NOT IN (${bookedMastersId.join(',')})`)

                res.status(200).json(readAvailableMasters.rows)

            } else {

                const readAvailableMasters = await db.query(`SELECT * FROM masters JOIN masters_cities ON masters_cities.master_id = masters.id 
                                                                                                        AND city_id = ${city_id}`)

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

            const readAvailableMasters = await db.query(`SELECT * FROM masters JOIN masters_cities ON masters_cities.master_id = masters.id 
                                                                                                    AND city_id = ${city_id} 
                                                                                                    AND id NOT IN (${bookedMastersId.join(',')})`)
            
            res.status(200).json(readAvailableMasters.rows)

        } else {

            const readAvailableMasters = await db.query(`SELECT * FROM masters JOIN masters_cities ON masters_cities.master_id = masters.id 
                                                                                                    AND city_id = ${city_id}`)
            
            res.status(200).json(readAvailableMasters.rows)
        }

    } catch(error) {

        res.status(500).send()
    }
}


const putMaster = async (req, res) => {
        
    try {
        const {id, name, cities_id} = req.body.data
        
        const updateMaster = await db.query('UPDATE masters SET name = $2 WHERE id = $1', [id, name])

        const masterToCitiesValues = cities_id.map(function(elem) {return `(${id},${elem})`}).join()

        const deleteOldData = await db.query('DELETE FROM masters_cities WHERE master_id = $1', [id])

        const updateCitiesOfMaster = await db.query(`INSERT INTO masters_cities (master_id, city_id) VALUES ${masterToCitiesValues}`)
        
        res.status(200).json(updateMaster.rows)

    } catch(error) {

        res.status(500).send()
    }
}


const deleteMaster = async (req, res) => {

    try {
        const {id} = req.body

        const deleteMasterToCities  = await db.query('DELETE FROM masters_cities WHERE master_id = $1', [id])

        const deleteMaster = await db.query('DELETE FROM masters WHERE id = $1', [id])

        res.status(204).json(deleteMaster.rows)

    } catch(error) {

        res.status(500).send()
    }
}



module.exports = {postMaster, getMaster, getAvailableMasters, getAvailableMastersForUpdate, putMaster, deleteMaster}