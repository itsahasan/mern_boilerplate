import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
{
  username:{
    type: String,
    required : true,
    trim:true,
    min: 2,
    max: 20
  },
  email:{
    type: String,
    required: true,
    trim:true,
    unique: true
  },
  password:{
    type: String,
    required: true,
    min: 6,
    max: 64
  }
},
{ timestamps: true }
)

const User = mongoose.model('User', userSchema )
export default User