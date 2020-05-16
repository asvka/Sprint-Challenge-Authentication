const bcrypt = require('bcryptjs')
const db = require('../database/dbConfig')

async function findBy(filter) {
	return db("users")
		.select("id", "username", "password")
        .where(filter)
        .first()
}

async function findById(id) {
	return db("users")
		.select("id", "username")
		.where({ id })
		.first()
}

async function add(user) {
    user.password = await bcrypt.hash(user.password, 14)

    const [id] = await db('users').insert(user)
    return findById(id)
}


module.exports = {
    findBy,
    findById,
    add
}