const express = require('express')
const mongoose = require('mongoose')
const app = express()
const port = 3000
const cors = require('cors')
const categoryRoutes = require('./routes/category')
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }));
app.get('/', (req, res) => {
  res.send('server running')
})
app.use("/category",categoryRoutes)
// Connect to MongoDB
async function connectDB() {
  await mongoose.connect('mongodb://localhost:27017/Agriconnect_main',); {
  }
  console.log('Connected to MongoDB')}
connectDB().catch(err => {
  console.error('Database connection error:', err)
})
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})