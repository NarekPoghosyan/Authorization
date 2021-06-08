const { Schema, model } = require('mongoose')

const schema = new Schema({
    company: { type: String, required: true },
    price: { type: String, required: true },
    title: { type: String, required: true },
    desc: { type: String, required: true },
    tags: { type: String, required: true },
    date: { type: String, required: true }
})

module.exports = model('Vacancie', schema)