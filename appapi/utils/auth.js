import jwt from 'jsonwebtoken'

//Varificarion code 

export const generateVerificationCode = ()=> Math.floor(1000000 + Math.random() * 90000).toString()

//Jwt Setup

export const genTokenSetCookies = (res, user) => {

  const token = jwt.sign({ id: user._id }, process.env.jwtSecret, {
  expiresIn: "7d",
  });

  res.cookie("token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
		maxAge: 7 * 24 * 60 * 60 * 1000,
  })
  return token;

}

export const verifyToken = (req, res, next) => {
	const token = req.cookies.token;
  
	if (!token) return res.status(401).json({ success: false, message: "Unauthorized - no token provided" });
	try {
		const decoded = jwt.verify(token, process.env.jwtSecret);
		if (!decoded) return res.status(401).json({ success: false, message: "Unauthorized - invalid token" });
    
		req.userId = decoded.id;
		next();
	} catch (error) {
		console.log("Error in verifyToken ", error);
		return res.status(500).json({ success: false, message: "Server error" });
	}
}