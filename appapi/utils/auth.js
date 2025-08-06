import jwt from 'jsonwebtoken'

//Varificarion code 

export const generateVerificationCode = ()=> Math.floor(1000000 + Math.random() * 90000).toString()


//Jwt Setup

export const genTokenSetCookies = (res, userid)=>{

  const token = jwt.sign({userid}, process.env.jwtSecret,{
    expiresIn:"7d",
  })

  res.cookie("token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
		maxAge: 7 * 24 * 60 * 60 * 1000,
  })
  return token;

}