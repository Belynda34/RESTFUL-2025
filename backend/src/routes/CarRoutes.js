
const express = require("express");
const {isAuthenticated} = require("../middlewares/isAuthenticated");
const { outgoingCars, carEntry, carExist, enteredCars } = require("../controllers/CarController.js")




const router = express.Router()

router.use(isAuthenticated)


router.post('/car-entry',carEntry)
router.post('/car-exit/:entryId',carExist)
router.get('/outgoing-cars',outgoingCars)
router.get('/entered-cars',enteredCars)




module.exports= router;