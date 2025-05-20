import React, { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import axios from "axios";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

const CarEntry = () => {
  const [carEntry, setCarEntry] = useState({
    plateNumber: "",
    parkingCode: "",
  });
  


  const navigate = useNavigate();

  const handleCarEntry = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        toast.error("Please log in to register car entry");
        return;
      }

      const response = await axios.post(
        "http://localhost:4000/api/cars/car-entry",
        carEntry,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      toast.success(`Car entry registered! ${response.data.ticket}`);
      setCarEntry({ plateNumber: "", parkingCode: "" });
      navigate('/entered')
    } catch (error) {
      toast.error(error.response?.data?.error || "Error registering car entry");
      console.error("Error registering car entry:", error);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-sm border border-gray-200">
      <h2 className="text-xl text-cyan-600 font-semibold mb-4">Register Car Entry</h2>
      <form onSubmit={handleCarEntry} className="space-y-4">
        <div>
          <input
            type="text"
            placeholder="Plate Number (e.g., RAA123A)"
            value={carEntry.plateNumber}
            onChange={(e) => setCarEntry({ ...carEntry, plateNumber: e.target.value })}
            className="w-full px-4 py-2 bg-gray-100 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-cyan-600"
          />
        </div>
        <div>
          <input
            type="text"
            placeholder="Parking Code (e.g., NYAR1)"
            value={carEntry.parkingCode}
            onChange={(e) => setCarEntry({ ...carEntry, parkingCode: e.target.value })}
            className="w-full px-4 py-2 bg-gray-100 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-cyan-600"
          />
        </div>
        <button
          type="submit"
          className="w-full px-4 py-2 bg-cyan-600 text-white rounded hover:bg-cyan-700 transition"
        >
          Register Car Entry
        </button>
      </form>
      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
};

export default CarEntry;