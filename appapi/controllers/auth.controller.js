import {generateVerificationCode, genTokenSetCookies} from '../utils/auth.js'
import {sendVerificationEmail, sendWelcomeEmail, forgetpasswordEmail, resetPasswordConfirm} from '../utils/email.js'
import bcryptjs from 'bcryptjs'
import crypto from 'crypto'
import User from '../models/user.model.js'




//check auth

export const checkAuth = async (req, res) => {
  const userid = req.userId
	try {
    const user = await User.findById(userid).select("-password");
    if (!userid) {
  return res.status(401).json({ success: false, message: "Unauthorized - missing user ID" });
}
		if (!user) {
			return res.status(400).json({ success: false, message: "User not found" });
		}

		res.status(200).json({ success: true, user });
	} catch (error) {
		console.log("Error in checkAuth ", error);
		res.status(400).json({ success: false, message: error.message });
	}
};


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
    await sendVerificationEmail(user.email, verificationToken)
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


export const verifyemail = async (req, res) =>{

  const {code} = req.body
 
  
  try {
      const user = await User.findOne({
			verificationToken: code,
			verificationTokenExpiresAt: { $gt: Date.now() }
		  });
    
      if(!user){
    
       return res.status(401).json({
        success: false,
        message: "Invalid or expired verification code"
        })
      }
      user.isVarifide = true
      user.verificationToken = undefined
      user.verificationTokenExpiresAt = undefined
      
      await user.save()
      await sendWelcomeEmail(user.email, user.name)
      res.status(200).json({
      success: true,
      message: "Email verified successfully",
      user: {
        ...user._doc,
        password: undefined,
        }
      })
    
  } catch (error) {
    console.log("error in verifyEmail ", error);
		res.status(500).json({ success: false, message: "Server error" });
    
  }

}

//login

export const login = async (req, res) =>{
  const {email, password} = req.body
  try {
    const user = await User.findOne({email})
    if(!user){
      return res.status(400).json({
        success: false,
        message: "Invalid credentials"
        })
    }
  
  const isPassword = await bcryptjs.compare(password, user.password)
  if(!isPassword){
     return res.status(400).json({
        success: false,
        message: "Invalid credentials"
      })
  }

  genTokenSetCookies( res, user._id)
  user.lastlogin = new Date()
  await user.save()

  res.status(200).json({
      success: true,
      message: "Login successful",
      user: {
        ...user._doc,
        password: undefined,
        }
      })


    
  } catch (error) {
    console.log("error in login ", error);
		res.status(500).json({ success: false, message: "Server error" });
  }
}

//logout

export const logout = async (req, res) => {
  res.clearCookie('token')
  res.status(200).json({
      success: true,
      message: "Logged out successfully",
      })

}


export const forgetpassword = async (req, res) => {
  const {email} = req.body
  try {
    const user = await User.findOne({email})
    if(!user){
      return res.status(400).json({
        success: false,
        message: "Email don't exit"
      })
    }

    const resetToken = crypto.randomBytes(20).toString('base64')
    const urlSafeToken = resetToken.replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
    const resetTokenExpiresAt = Date.now() + 1 * 60 * 60 * 1000

    user.resetPasswordToken = urlSafeToken
    user.resetPasswordExpiresAt = resetTokenExpiresAt

    await user.save()
    await forgetpasswordEmail(user.email,`${process.env.BASE_URL}/reset-password/${urlSafeToken}`)
    res.status(200).json({
      success: true,
      message: "Password reset link send to your email",
      })

  } catch (error) {
    console.log("error sending password ", error);
		res.status(500).json({ success: false, message: "Server error" });
  }
  

}

export const resetpassword = async (req, res) => {
  
  try {
    const {token} = req.params
    const { password } = req.body;
    
    const user = await User.findOne({
      resetPasswordToken : token,
      resetPasswordExpiresAt: { $gt: Date.now()}
    })
    
    if(!user){
      return res.status(401).json({
        success: false,
        message: "Invalid or expired verification token"
      })
    }
    
  const hashedPassword = await bcryptjs.hash(password, 10);
  console.log(hashedPassword);
  user.password = hashedPassword
  user.resetPasswordToken = undefined
  user.resetPasswordExpiresAt = undefined
  await user.save()
  await resetPasswordConfirm(user.email)
  res.status(200).json({
      success: true,
      message: "Password reset successful",
    })
   
  } catch (error) {
    console.log("error in reset password ", error);
		res.status(500).json({ success: false, message: "Server error" });
  }

}