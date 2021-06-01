const { Schema, model } = require('mongoose')

const schema = new Schema({
    name: { type: String, required: true },
    surname: { type: String, required: true },
    patron: { type: String, required: true },
    newUserDate: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
})

module.exports = model('User', schema)