import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FaSearch } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const CarsEntered = () => {
  const [firstName, setFirstName] = useState("Loading...");
  const [enteredCars, setEnteredCars] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [carsPerPage] = useState(3);
  const navigate = useNavigate();

  const fetchEnteredCars = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        toast.error("Please log in to view entered cars");
        return;
      }

      const response = await axios.get("http://localhost:4000/api/cars/entered-cars", {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      const carsArray = Array.isArray(response.data.data) ? response.data.data : [];
      setEnteredCars(carsArray);
    } catch (error) {
      toast.error(`${error.response?.data?.error || error.message}`);
      console.error("Error fetching entered cars:", error.message);
      setEnteredCars([]);
    }
  };

  const fetchUserProfile = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return;

      const response = await axios.get("http://localhost:4000/api/auth/users/current", {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      setFirstName(response.data.firstName || "User");
    } catch (error) {
      console.log("Error fetching user data:", error);
      setFirstName("User");
    }
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
    setCurrentPage(1);
  };

  const filteredCars = enteredCars.filter((car) =>
    car.plateNumber?.toLowerCase().includes(searchQuery.trim().toLowerCase()) ||
    car.parkingCode?.toLowerCase().includes(searchQuery.trim().toLowerCase())
  );

  const indexOfLastCar = currentPage * carsPerPage;
  const indexOfFirstCar = indexOfLastCar - carsPerPage;
  const currentCars = filteredCars.slice(indexOfFirstCar, indexOfLastCar);
  const totalPages = Math.ceil(filteredCars.length / carsPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  useEffect(() => {
    fetchUserProfile();
    fetchEnteredCars();
  }, []);

  return (
    <div className="min-h-screen p-5">
      <div className="flex items-center space-x-4 mb-10">
        <div className="w-12 h-12 bg-cyan-700 rounded-full flex items-center justify-center text-white font-semibold">
          {firstName.charAt(0).toUpperCase()}
        </div>
        <span className="text-lg font-semibold text-gray-700">Hi, {firstName}</span>
      </div>

      <div className="flex items-center justify-between mb-10">
        <div className="flex items-center space-x-4">
          <h2 className="text-xl text-cyan-600 font-semibold">Entered Cars Report</h2>
          <button
            onClick={() => navigate("/entry")}
            className="px-4 py-2 bg-cyan-600 text-white rounded hover:bg-cyan-700 transition text-sm font-medium"
          >
            Register Car Entry
          </button>
        </div>
        <div className="relative flex items-center w-64">
          <input
            type="text"
            placeholder="Search by plate or parking code..."
            onChange={handleSearchChange}
            className="w-full px-4 py-2 bg-gray-100 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-cyan-600"
          />
          <FaSearch className="absolute right-3 text-cyan-700" />
        </div>
      </div>

      <div className="overflow-x-auto">
        {currentCars.length > 0 ? (
          <>
            <table className="min-w-full bg-white border border-gray-200 shadow-sm rounded">
              <thead className="bg-cyan-600 text-white">
                <tr>
                  <th className="py-2 px-4 text-left">Entry ID</th>
                  <th className="py-2 px-4 text-left">Plate Number</th>
                  <th className="py-2 px-4 text-left">Parking Code</th>
                  <th className="py-2 px-4 text-left">Entry Time</th>
                </tr>
              </thead>
              <tbody>
                {currentCars.map((car) => (
                  <tr key={car.id} className="border-t hover:bg-gray-100">
                    <td className="py-2 px-4">{car.id}</td>
                    <td className="py-2 px-4">{car.plateNumber}</td>
                    <td className="py-2 px-4">{car.parkingCode}</td>
                    <td className="py-2 px-4">
                      {new Date(car.entryDateTime).toLocaleString("en-RW", {
                        timeZone: "Africa/Kigali",
                      })}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            <div className="flex justify-between items-center mt-4">
              <div className="text-sm text-gray-600">
                Showing {indexOfFirstCar + 1} to{" "}
                {Math.min(indexOfLastCar, filteredCars.length)} of{" "}
                {filteredCars.length} cars
              </div>
              <div className="flex space-x-2">
                <button
                  onClick={() => paginate(currentPage - 1)}
                  disabled={currentPage === 1}
                  className={`px-3 py-1 rounded ${
                    currentPage === 1
                      ? "bg-gray-300 cursor-not-allowed"
                      : "bg-cyan-600 text-white hover:bg-cyan-700"
                  }`}
                >
                  Previous
                </button>
                {Array.from({ length: totalPages }, (_, index) => (
                  <button
                    key={index + 1}
                    onClick={() => paginate(index + 1)}
                    className={`px-3 py-1 rounded ${
                      currentPage === index + 1
                        ? "bg-cyan-600 text-white"
                        : "bg-gray-200 hover:bg-gray-300"
                    }`}
                  >
                    {index + 1}
                  </button>
                ))}
                <button
                  onClick={() => paginate(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className={`px-3 py-1 rounded ${
                    currentPage === totalPages
                      ? "bg-gray-300 cursor-not-allowed"
                      : "bg-cyan-600 text-white hover:bg-cyan-700"
                  }`}
                >
                  Next
                </button>
              </div>
            </div>
          </>
        ) : (
          <p className="text-gray-500 text-center">
            No entered cars found or search: {searchQuery}
          </p>
        )}
        <ToastContainer position="top-right" autoClose={3000} />
      </div>
    </div>
  );
};

export default CarsEntered;






// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { toast, ToastContainer } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import { FaSearch } from "react-icons/fa";

// const CarsEntered = () => {
//   const [firstName, setFirstName] = useState("Loading...");
//   const [enteredCars, setEnteredCars] = useState([]);
//   const [searchQuery, setSearchQuery] = useState("");
//   const [currentPage, setCurrentPage] = useState(1);
//   const [carsPerPage] = useState(3);

//   const fetchEnteredCars = async () => {
//     try {
//       const token = localStorage.getItem("token");
//       if (!token) {
//         toast.error("Please log in to view entered cars");
//         return;
//       }

//       const response = await axios.get("http://localhost:4000/api/cars/entered-cars", {
//         headers: {
//           Authorization: `Bearer ${token}`,
//           "Content-Type": "application/json",
//         },
//       });

//       const carsArray = Array.isArray(response.data.data) ? response.data.data : [];
//       setEnteredCars(carsArray);
//     } catch (error) {
//       toast.error(`${error.response?.data?.error || error.message}`);
//       console.error("Error fetching entered cars:", error.message);
//       setEnteredCars([]);
//     }
//   };

//   const fetchUserProfile = async () => {
//     try {
//       const token = localStorage.getItem("token");
//       if (!token) return;

//       const response = await axios.get("http://localhost:4000/api/auth/users/current", {
//         headers: {
//           Authorization: `Bearer ${token}`,
//           "Content-Type": "application/json",
//         },
//       });

//       setFirstName(response.data.firstName || "User");
//     } catch (error) {
//       console.log("Error fetching user data:", error);
//       setFirstName("User");
//     }
//   };

//   const handleSearchChange = (e) => {
//     setSearchQuery(e.target.value);
//     setCurrentPage(1);
//   };

//   const filteredCars = enteredCars.filter((car) =>
//     car.plateNumber?.toLowerCase().includes(searchQuery.trim().toLowerCase()) ||
//     car.parkingCode?.toLowerCase().includes(searchQuery.trim().toLowerCase())
//   );

//   const indexOfLastCar = currentPage * carsPerPage;
//   const indexOfFirstCar = indexOfLastCar - carsPerPage;
//   const currentCars = filteredCars.slice(indexOfFirstCar, indexOfLastCar);
//   const totalPages = Math.ceil(filteredCars.length / carsPerPage);

//   const paginate = (pageNumber) => setCurrentPage(pageNumber);

//   useEffect(() => {
//     fetchUserProfile();
//     fetchEnteredCars();
//   }, []);

//   return (
//     <div className="min-h-screen p-5">
//       <div className="flex items-center space-x-4 mb-10">
//         <div className="w-12 h-12 bg-cyan-700 rounded-full flex items-center justify-center text-white font-semibold">
//           {firstName.charAt(0).toUpperCase()}
//         </div>
//         <span className="text-lg font-semibold text-gray-700">Hi, {firstName}</span>
//       </div>

//       <div className="flex items-center justify-between mb-10">
//         <h2 className="text-xl text-cyan-600 font-semibold">Entered Cars Report</h2>
//         <div className="relative flex items-center w-64">
//           <input
//             type="text"
//             placeholder="Search by plate or parking code..."
//             onChange={handleSearchChange}
//             className="w-full px-4 py-2 bg-gray-100 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-cyan-600"
//           />
//           <FaSearch className="absolute right-3 text-cyan-700" />
//         </div>
//       </div>

//       <div className="overflow-x-auto">
//         {currentCars.length > 0 ? (
//           <>
//             <table className="min-w-full bg-white border border-gray-200 shadow-sm rounded">
//               <thead className="bg-cyan-600 text-white">
//                 <tr>
//                   <th className="py-2 px-4 text-left">Entry ID</th>
//                   <th className="py-2 px-4 text-left">Plate Number</th>
//                   <th className="py-2 px-4 text-left">Parking Code</th>
//                   <th className="py-2 px-4 text-left">Entry Time</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {currentCars.map((car) => (
//                   <tr key={car.id} className="border-t hover:bg-gray-100">
//                     <td className="py-2 px-4">{car.id}</td>
//                     <td className="py-2 px-4">{car.plateNumber}</td>
//                     <td className="py-2 px-4">{car.parkingCode}</td>
//                     <td className="py-2 px-4">
//                       {new Date(car.entryDateTime).toLocaleString("en-RW", {
//                         timeZone: "Africa/Kigali",
//                       })}
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>

//             <div className="flex justify-between items-center mt-4">
//               <div className="text-sm text-gray-600">
//                 Showing {indexOfFirstCar + 1} to{" "}
//                 {Math.min(indexOfLastCar, filteredCars.length)} of{" "}
//                 {filteredCars.length} cars
//               </div>
//               <div className="flex space-x-2">
//                 <button
//                   onClick={() => paginate(currentPage - 1)}
//                   disabled={currentPage === 1}
//                   className={`px-3 py-1 rounded ${
//                     currentPage === 1
//                       ? "bg-gray-300 cursor-not-allowed"
//                       : "bg-cyan-600 text-white hover:bg-cyan-700"
//                   }`}
//                 >
//                   Previous
//                 </button>
//                 {Array.from({ length: totalPages }, (_, index) => (
//                   <button
//                     key={index + 1}
//                     onClick={() => paginate(index + 1)}
//                     className={`px-3 py-1 rounded ${
//                       currentPage === index + 1
//                         ? "bg-cyan-600 text-white"
//                         : "bg-gray-200 hover:bg-gray-300"
//                     }`}
//                   >
//                     {index + 1}
//                   </button>
//                 ))}
//                 <button
//                   onClick={() => paginate(currentPage + 1)}
//                   disabled={currentPage === totalPages}
//                   className={`px-3 py-1 rounded ${
//                     currentPage === totalPages
//                       ? "bg-gray-300 cursor-not-allowed"
//                       : "bg-cyan-600 text-white hover:bg-cyan-700"
//                   }`}
//                 >
//                   Next
//                 </button>
//               </div>
//             </div>
//           </>
//         ) : (
//           <p className="text-gray-500 text-center">
//             No entered cars found or search: {searchQuery}
//           </p>
//         )}
//         <ToastContainer position="top-right" autoClose={3000} />
//       </div>
//     </div>
//   );
// };

// export default CarsEntered;
