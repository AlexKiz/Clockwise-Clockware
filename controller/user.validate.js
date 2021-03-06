const db = require('../db')
const validName = new RegExp(/^([(A-Za-zА-Яа-я]{3,49})$|^([A-Za-zА-Яа-я]{3,49}[\s]{1}[A-Za-zА-Яа-я]{3,50})$/)
const validEmail = new RegExp(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)

const postUserValidate = async(req, res, next) => {

    const {name, email} = req.body

    const validationErrors = []

    if(!validName.test(name)) {

        validationErrors.push('Invalid user name')
    }

    if(!validEmail.test(email)) {

        validationErrors.push('Invalid user email')
    }

    if(validationErrors.length) {

        res.status(400).json(validationErrors)

    } else {

        return next()
    }

}


const putUserValidate = async(req, res, next) => {
    
    const {id, name, email} = req.body.data

    const validationErrors = []

    const validUser = await db.query('SELECT * FROM users WHERE id = $1', [id])

    if(!validUser.rows.length) {

        validationErrors.push('User with current id does not exist')

    }

    if(!validName.test(name)) {

        validationErrors.push('Invalid user name')

    }

    if(!validEmail.test(email)) {

        validationErrors.push('Invalid user email')

    }

    if(validationErrors.length) {

        res.status(400).json(validationErrors)

    } else {

        return next()

    }
}


const deleteUserValidate = async(req, res, next) => {
    
    const {id} = req.body

    const validationErrors = []

    const validUser = await db.query('SELECT * FROM users WHERE id = $1', [id])

    if(!validUser.rows.length) {
        
        validationErrors.push('User with current id does not exist')
    }

    if(validationErrors.length) {

        res.status(400).json(validationErrors)
    } else {

        return next()
    }
}



module.exports = {postUserValidate, putUserValidate, deleteUserValidate}