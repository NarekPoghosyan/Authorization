const express = require('express')
const config = require('config')
const mongoose = require('mongoose')
const app = express()

app.use(express.json({ extended: true }))

// /auth
app.use('/auth', require('./routes/auth.routes'))

// /vacancies
app.use('/vacancies', require('./routes/vacancies.routes'))

const PORT = config.get('PORT') || 5010

async function start() {
    try {
        await mongoose.connect(config.get('mongoUri'), {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true
        })
        app.listen(PORT, () => {
            console.log(`App has been started on PORT ${PORT}...`)
        })
    } catch (error) {
        console.log("Error", error)
    }
}

start()


