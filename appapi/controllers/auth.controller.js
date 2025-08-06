import User from '../models/user.model.js'
import {generateVerificationCode, genTokenSetCookies} from '../utils/auth.js'
import bcryptjs from 'bcryptjs'




//user signuo

export const signup = async(req, res) => {
  
  const {name, email, password} = req.body
  try {
    if(!name || !email || !password ){
      return  res.status(400).json({success: false,message: "All fields are required"})
    }
    const isUser = await User.findOne({email})
    if(isUser){
     return  res.status(400).json({success: false,message: "User already exists"})
    }
    const hashedPassword = bcryptjs.hashSync(password, 10)
    const verificationToken = generateVerificationCode()
    const user = new User({
			email,
			password: hashedPassword,
			name,
			verificationToken,
			verificationTokenExpiresAt: Date.now() + 24 * 60 * 60 * 1000, // 24 hours
		});
    await user .save()
    //jwt
    genTokenSetCookies(res, user ._id)
    res.status(200).json({
		success: true,
		message: "Email verified successfully",
		user: {
      ...user._doc,
      password: undefined,
    },
		});
  } catch (error) {
    console.log("error in verifyEmail ", error);
		res.status(500).json({ success: false, message: "Server error" });
  }
}



export const forgetpassword = async(req, res, next) => {
  const {email} = req.body
  console.log(`Your email is ${email}`);
  

}