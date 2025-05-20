
const express = require("express");
const {isAuthenticated} = require("../middlewares/isAuthenticated");
const { register, login,getUserProfile } =    require("../controllers/Usercontrollers");



const router = express.Router()


router.post('/register',register)
router.post('/login',login)




router.use(isAuthenticated)
router.get('/users/current',getUserProfile);

// router.get("/count", getUserCount);

// router.get('/users/current',getUserProfile);


module.exports= router;