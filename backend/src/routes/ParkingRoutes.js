
const express = require("express");
const {isAuthenticated} = require("../middlewares/isAuthenticated");
const { carEntry,carExit,outgoingCars,enteredCars} =require("../controllers/CarController");
const { createParking, getParkings } = require("../controllers/ParkingControllers");


const router = express.Router()

router.use(isAuthenticated)


router.post('/create',createParking)
router.get('/',getParkings)




module.exports= router;