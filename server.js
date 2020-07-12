// Configure dotenv
require('dotenv').config()
// Requiring dependancies
const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const app = express()
const path = require('path')

// Middleware
app.use(cors())
app.use(express.json())

//Database
mongoose.connect(String(process.env.MONGODB_URI), {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false,
})
mongoose.connection.once('open', () => console.log('Database connected'))

// Routes
const exerciseRouter = require('./routes/exercises')
const usersRouter = require('./routes/users')

app.use('/exercises', exerciseRouter)
app.use('/users', usersRouter)

PORT = process.env.PORT || 5000
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`)
})

app.use(express.static('client/build'))
app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
})
