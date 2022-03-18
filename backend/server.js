const path = require('path')
const express = require('express')

const app = express()

// Body parser
app.use(express.json({ limit: '1mb' }))
app.use(express.urlencoded({ limit: '1mb', extended: false }))

// Routes
app.use('/api/books', require('./routes/bookRoutes'))

// Serv frontend
if(process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '../client/build')))

    app.get('*', (req, res) => res.sendFile(path.resolve(__dirname, '../', 'client', 'build', 'index.html')))
} else {
    app.get('/', (req, res) => res.send('Please set to production'))
}

app.listen(5000, () => {
    console.log("Server is runnig")
})