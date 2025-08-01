import express from 'express'
import dotenv from 'dotenv'
import mongoose from 'mongoose'

//Routes import
import userRoutes from './routes/user.route.js'
import authRoutes from './routes/auth.route.js'

const app = express()
app.use(express.json())


// Config env
  dotenv.config()

// Database Connection
mongoose.connect(process.env.MONGO_URI).then(()=>{
  console.log('Connected to database')
}) 
.catch((err)=>{
  console.log(err);
})




//All Routes
app.use("/api/user", userRoutes)
app.use("/api/auth", authRoutes)


// Middlewares

app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500
  const message = err.message || "Internal server error";
  return res.status(statusCode).json({
    success: false,
    message,
    statusCode,
  })
})


//port setup
const PORT = process.env.PORT || 3000
app.listen(PORT, () =>{
  console.log(`Server is running on port http://localhost:${PORT}`);
});