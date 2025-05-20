const prisma = require('../config/db.js')
const  bcrypt = require("bcryptjs");
const jwt =  require("jsonwebtoken");
const  {registerSchema} = require("../schemas/RegisterSchema.js")



// Registering controller 


const register = async (req, res) => {
  try {
    const {firstName ,lastName,email,password,role}=req.body

    // Validate registration input
    const { error } = registerSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }

    const currentUser = await prisma.user.findUnique({ where: { email } });
    if (currentUser) {
      return res.status(409).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await prisma.user.create({
      data: {
        firstName,
        lastName,
        email,
        password: hashedPassword,
        role
      },
    });

    // Delete the OTP record after successful registration
    // await prisma.otp.delete({ where: { id: otpRecord.id } });

    res.status(201).json({ message: "User registered successfully", data: newUser });

  } catch (error) {
    console.error("Error in registration:", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};


//Login controller

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: "Please fill in all fields " });
    }
    const currentUser = await prisma.user.findUnique({ where: { email } });

    if (!currentUser) {
      return res.status(401).json({ message: "Email or password invalid" });
    }

    const passwordMatch = await bcrypt.compare(password, currentUser.password);

    if (!passwordMatch) {
      return res.status(401).json({ message: "Email or password invalid" });
    }

    const accessToken = jwt.sign(
      { id: currentUser.id, email: currentUser.email,role:currentUser.role },
      process.env.ACCESS_JWT_SECRET,
      { expiresIn: "60m" }
    );


    res
      .status(200)
      .json({ id: currentUser.id, email: currentUser.email, accessToken});
  } catch (error) {
    res.status(500).json({ message: "Internal sever error" });
    console.error("Error:", error.message);
  }
};


const getUserProfile = async (req, res) => {
  try {
    // console.log("User from token:",req.user)

    if (!req.user || !req.user.id) {
      return res
        .status(400)
        .json({ message: "Invalid token or missing user ID" });
    }
    const currentUser = await prisma.user.findUnique({ where: { id: req.user.id } });
    if (!currentUser) {
      return res.status(404).json({ message: "User not found" });
    }
    
    res
      .status(200)
      .json({
        id: currentUser.id,
        firstName:currentUser.firstName,
        email: currentUser.email,
      });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
    console.error("Error:", error.message);
  }
};


const getUserCount = async (req, res) => {
  try {
    const count = await prisma.user.count();
    res.status(200).json({ count });
  } catch (error) {
    console.error("Error in fetching user count:", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports ={register,login,getUserProfile}












 
 