import React from "react";
import { useNavigate } from "react-router-dom";

const DoctorList = ({ doctor }) => {
  const navigate = useNavigate();
  // console.log(doctor.userId);
  

  return (
    <div
      className="bg-white shadow-lg rounded-2xl p-4 m-2 cursor-pointer transition-transform transform hover:scale-105 hover:shadow-xl"
      onClick={() => navigate(`/Doctor/booking-appointment/${doctor._id}`)}
    >
      <div className="bg-black text-white text-lg font-semibold rounded-t-2xl px-4 py-2">
        Dr. {doctor.firstName} {doctor.lastName}
      </div>
      <div className="p-4">
        <p className="text-gray-700 font-medium">
          <b className="text-black">Specialization:</b> {doctor.specialization}
        </p>
        <p className="text-gray-700 font-medium">
          <b className="text-black">Experience:</b> {doctor.experience} years
        </p>
        <p className="text-gray-700 font-medium">
          <b className="text-black">Fees Per Consultation:</b> ₹{doctor.feesPerCunsaltation}
        </p>
        <p className="text-gray-700 font-medium">
          <b className="text-black">Timings:</b> {doctor.timings[0]} - {doctor.timings[1]}
        </p>
      </div>
    </div>
  );
};

export default DoctorList;
