import express from 'express'
import dotenv from 'dotenv'
import mongoose from 'mongoose'

const app = express()


// Config env
  dotenv.config()

// Database Connection
mongoose.connect(process.env.MONGO_URI).then(()=>{
  console.log('Connected to database')
}) 
.catch((err)=>{
  console.log(err);
})


// Middlewares

// Use Routes





//port setup
const PORT = process.env.PORT || 3000
app.listen(PORT, () =>{
  console.log(`Server is running on port http://localhost:${PORT}`);
});