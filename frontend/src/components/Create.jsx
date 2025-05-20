import React, { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import axios from "axios";
import "react-toastify/dist/ReactToastify.css";

const Create = () => {
  const [parking, setParking] = useState({
    code: "",
    name: "",
    totalSpaces: "",
    location: "",
    feePerHour: "",
  });

  const token = localStorage.getItem("token");

  if (!token) {
    return (
      <div className="text-center text-red-600 p-4">
        Unauthorized. Please log in to access this page.
      </div>
    );
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    const preparedParking = {
      code: parking.code,
      name: parking.name,
      location: parking.location,
      totalSpaces: parseInt(parking.totalSpaces),
      feePerHour: parseFloat(parking.feePerHour),
    };

    try {
      const response = await axios.post(
        "http://localhost:4000/api/parking/create",
        preparedParking,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("Parking created:", response.data);

      toast.success(response.data.message || "Parking created successfully! 🎉");

      setParking({
        code: "",
        name: "",
        totalSpaces: "",
        location: "",
        feePerHour: "",
      });
    } catch (error) {
      console.error("Error creating parking:", error.response || error.message);
      toast.error(
        error.response?.data?.error || "Failed to create parking. Check console for details."
      );
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-sm border border-gray-200">
      <ToastContainer />
      <h2 className="text-xl text-cyan-600 font-semibold mb-4">Create Parking Lot</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="Parking Code (e.g., PARK1)"
          value={parking.code}
          onChange={(e) => setParking({ ...parking, code: e.target.value })}
          className="w-full px-4 py-2 bg-gray-100 border border-gray-300 rounded"
        />
        <input
          type="text"
          placeholder="Name (e.g., Nyarugenge Central Lot)"
          value={parking.name}
          onChange={(e) => setParking({ ...parking, name: e.target.value })}
          className="w-full px-4 py-2 bg-gray-100 border border-gray-300 rounded"
        />
        <input
          type="number"
          placeholder="Total Spaces (e.g., 100)"
          value={parking.totalSpaces}
          onChange={(e) => setParking({ ...parking, totalSpaces: e.target.value })}
          className="w-full px-4 py-2 bg-gray-100 border border-gray-300 rounded"
        />
        <input
          type="text"
          placeholder="Location (e.g., downtown)"
          value={parking.location}
          onChange={(e) => setParking({ ...parking, location: e.target.value })}
          className="w-full px-4 py-2 bg-gray-100 border border-gray-300 rounded"
        />
        <input
          type="number"
          step="0.01"
          placeholder="Fee per Hour (RWF)"
          value={parking.feePerHour}
          onChange={(e) => setParking({ ...parking, feePerHour: e.target.value })}
          className="w-full px-4 py-2 bg-gray-100 border border-gray-300 rounded"
        />
        <button
          type="submit"
          className="w-full px-4 py-2 bg-cyan-600 text-white rounded hover:bg-cyan-700 transition"
        >
          Create Parking
        </button>
      </form>
    </div>
  );
};

export default Create;
