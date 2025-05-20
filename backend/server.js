const express = require("express");
const dotenv = require("dotenv");
const UserRoutes = require("./src/routes/UserRoutes")
const ParkingRoutes = require("./src/routes/ParkingRoutes")
const CarRoutes=require("./src/routes/CarRoutes")
const cors = require("cors");
const swaggerSetup = require('./swagger');

dotenv.config();

const PORT = process.env.PORT || 4001;

const app = express();

app.use(express.json());
swaggerSetup(app);

app.use(cors());
app.use("/api/auth", UserRoutes);
app.use("/api/parking",ParkingRoutes);
app.use("/api/cars",CarRoutes);

app.listen(PORT,() => {
  console.log(`Server running on port ${PORT}`)
})

