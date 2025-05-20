const prisma = require("../config/db");

// Car entry controller
const carEntry = async (req, res) => {
  const { plateNumber, parkingCode } = req.body;
  try {
    const parking = await prisma.parking.findUnique({ where: { code: parkingCode } });
    if (!parking || parking.availableSpaces <= 0) {
      return res.status(400).json({ error: 'No available spaces or invalid parking code' });
    }

    const entry = await prisma.carEntry.create({
      data: {
        plateNumber,
        parkingCode,
        entryDateTime: new Date(),
        exitDateTime: null,
        chargedAmount: 0,
      },
    });

    await prisma.parking.update({
      where: { code: parkingCode },
      data: { availableSpaces: parking.availableSpaces - 1 },
    });

    const ticket = `Ticket ID: ${entry.id}\nPlate: ${plateNumber}\nParking: ${parkingCode}\nEntry: ${entry.entryDateTime}`;
    res.status(201).json({ entry, ticket });
  } catch (error) {
    console.error("Error in registering car entry:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Car exit controller
const carExist = async (req, res) => {
  const { entryId } = req.params;
  try {
    const entry = await prisma.carEntry.findUnique({ where: { id: parseInt(entryId) } });
    if (!entry || entry.exitDateTime) {
      return res.status(400).json({ error: 'Invalid entry or already exited' });
    }

    const parking = await prisma.parking.findUnique({ where: { code: entry.parkingCode } });
    const exitDateTime = new Date();
    const hoursParked = Math.ceil((exitDateTime - entry.entryDateTime) / (1000 * 60 * 60));
    const chargedAmount = hoursParked * parking.feePerHour;

    const updatedEntry = await prisma.carEntry.update({
      where: { id: parseInt(entryId) },
      data: { exitDateTime, chargedAmount },
    });

    await prisma.parking.update({
      where: { code: entry.parkingCode },
      data: { availableSpaces: parking.availableSpaces + 1 },
    });

    const bill = `Bill for Entry ID: ${entryId}\nPlate: ${entry.plateNumber}\nDuration: ${hoursParked} hours\nTotal: $${chargedAmount}`;
    res.json({ entry: updatedEntry, bill });
  } catch (error) {
    console.error("Error in processing car exit:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};



// Get outgoing cars 
const outgoingCars = async (req, res) => {
  const { startDate, endDate } = req.query;


  if (!startDate || !endDate) {
    return res.status(400).json({ error: "startDate and endDate are required." });
  }

 
  const start = new Date(startDate);
  const end = new Date(endDate);

  if (isNaN(start) || isNaN(end)) {
    return res.status(400).json({ error: "Invalid startDate or endDate format." });
  }

  try {
    const entries = await prisma.carEntry.findMany({
      where: {
        exitDateTime: {
          gte: start,
          lte: end,
        },
      },
    });

    res.json(entries);
  } catch (error) {
    console.error("Error fetching outgoing cars:", error);
    res.status(500).json({ error: "Error fetching outgoing cars" });
  }
};



// Getting all entered cars
const enteredCars = async (req, res) => {
  const entries = await prisma.carEntry.findMany({
    where: { exitDateTime: null },
  });
  res.json({data:entries})
};

module.exports = { carEntry, carExist, outgoingCars, enteredCars };
