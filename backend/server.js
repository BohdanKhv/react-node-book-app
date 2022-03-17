const path = require('path')
const express = require('express')

const app = express()

// Body parser
app.use(express.json({ limit: '1mb' }))
app.use(express.urlencoded({ limit: '1mb', extended: false }))

// Routes
app.use('/api/books', require('./routes/bookRoutes'))

app.listen(5000, () => {
    console.log("Server is runnig")
})