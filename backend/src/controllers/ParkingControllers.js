const prisma = require("../config/db")
const {parkingSchema } = require("../schemas/ParkingSchema")


//Controller for creating parking

const createParking = async (req, res) => {
  const { code, name, totalSpaces, location, feePerHour } = req.body;
   const { error } = parkingSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }
  try {
    const parkingEXist = await prisma.parking.findUnique({where: { code}})
    if(parkingEXist){
      return res.status(400).json({ error: "Parking already exists" });
    }
    const parking = await prisma.parking.create({
      data: { code, name, totalSpaces, availableSpaces: totalSpaces, location, feePerHour },
    });
    res.status(201).json({ message: "Parking created succesfully",data:parking})
  } catch (error) {
    console.error("Error in creating parking:",error)
    res.status(500).json({ message:"Internal server error"});
  }
};




// Get All Parkings
const getParkings =async (req, res) => {
  try {
    const parkings = await prisma.parking.findMany({});
    res.status(200).json({message:"All Parkings",data:parkings})
  } catch (error) {
     console.error("Error in getting parking:",error)
    res.status(500).json({ message:"Internal server error"})
  }
};


module.exports={createParking,getParkings}