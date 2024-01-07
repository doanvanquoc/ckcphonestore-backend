import pool from "../config/database.js";

const getAllUsers = (req, res) => {
    pool.query('select * from users', (err, result, field) => {
        if (err) throw err
        res.json(result)
    })
}

const createUser = (req, res) => {
    var {username, password, fullname} = req.body
    pool.query(`insert into users (username, password, fullname) values ('${username}', '${password}', '${fullname}')`, (err, result, field) => {
        if (err) throw err
        pool.query('select * from users', (err, result, field) => {
            if (err) throw err
            res.json(result)
        })
    })
}

export default {getAllUsers, createUser}