import React, { useState, useEffect } from "react";
import axios from "axios";
import moment from "moment";
import { message, Table } from "antd";
import Layout from "../../component/Layout";

const DoctorAppointments = () => {
  const [appointments, setAppointments] = useState([]);
  const [filteredAppointments, setFilteredAppointments] = useState([]);
  const [filter, setFilter] = useState("all");

  const getAppointments = async () => {
    try {
      const res = await axios.get("http://localhost:9090/api/doctor/DocAppointment", {
        withCredentials: true,
      });
      if (res.data.success) {
        const data = res.data.data;

        if (Array.isArray(data)) {
          const appointmentsWithKey = data.map((item) => ({
            ...item,
            key: item._id,
          }));
          setAppointments(appointmentsWithKey);
          setFilteredAppointments(appointmentsWithKey);
        } else {
          console.error("Invalid data format");
          setAppointments([]);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAppointments();
  }, []);

  useEffect(() => {
    if (filter === "all") {
      setFilteredAppointments(appointments);
    } else {
      setFilteredAppointments(appointments.filter((appointment) => appointment.status === filter));
    }
  }, [filter, appointments]);

  const handleStatus = async (record, status) => {
    try {
      const res = await axios.post(
        "http://localhost:9090/api/doctor/updateStatusController",
        { appointmentsId: record._id, status },
        { withCredentials: true }
      );
      if (res.data.success) {
        message.success(res.data.message);
        getAppointments();
      }
    } catch (error) {
      console.log(error);
      message.error("Something Went Wrong");
    }
  };

  const columns = [
    {
      title: "No.",
      render: (_, __, index) => (
        <span className="text-gray-700 font-medium">{index + 1}</span>
      ),
    },
    {
      title: "Date & Time",
      dataIndex: "date",
      render: (text, record) => (
        <span className="text-gray-700">
          {moment(record.date).format("DD-MM-YYYY")} &nbsp;
          {moment(record.time).format("HH:mm")}
        </span>
      ),
    },
    {
      title: "Status",
      dataIndex: "status",
      className: "text-gray-700",
    },
    {
      title: "Actions",
      dataIndex: "actions",
      render: (text, record) => (
        <div className="flex items-center gap-3">
          {record.status === "pending" && (
            <div className="flex gap-3">
              <button
                className="bg-green-500 hover:bg-green-600 text-white font-medium px-4 py-2 rounded-md"
                onClick={() => handleStatus(record, "approved")}
              >
                Approve
              </button>
              <button
                className="bg-red-500 hover:bg-red-600 text-white font-medium px-4 py-2 rounded-md"
                onClick={() => handleStatus(record, "rejected")}
              >
                Reject
              </button>
            </div>
          )}
        </div>
      ),
    },
  ];

  return (
    <Layout>
      <div className="container mx-auto p-6">
        <h1 className="text-2xl font-semibold text-gray-800 mb-6">Appointments List</h1>

        {/* Filter Buttons */}
        <div className="flex gap-4 mb-6">
          <button
            className={`px-4 py-2 rounded-md font-medium ${
              filter === "all"
                ? "bg-blue-500 text-white"
                : "bg-gray-200 text-gray-800 hover:bg-gray-300"
            }`}
            onClick={() => setFilter("all")}
          >
            All
          </button>
          <button
            className={`px-4 py-2 rounded-md font-medium ${
              filter === "pending"
                ? "bg-blue-500 text-white"
                : "bg-gray-200 text-gray-800 hover:bg-gray-300"
            }`}
            onClick={() => setFilter("pending")}
          >
            Pending
          </button>
          <button
            className={`px-4 py-2 rounded-md font-medium ${
              filter === "approved"
                ? "bg-blue-500 text-white"
                : "bg-gray-200 text-gray-800 hover:bg-gray-300"
            }`}
            onClick={() => setFilter("approved")}
          >
            Approved
          </button>
          <button
            className={`px-4 py-2 rounded-md font-medium ${
              filter === "rejected"
                ? "bg-blue-500 text-white"
                : "bg-gray-200 text-gray-800 hover:bg-gray-300"
            }`}
            onClick={() => setFilter("rejected")}
          >
            Rejected
          </button>
        </div>

        {/* Table */}
        <Table
          columns={columns}
          dataSource={Array.isArray(filteredAppointments) ? filteredAppointments : []}
          className="bg-white shadow-md rounded-md"
        />
      </div>
    </Layout>
  );
};

export default DoctorAppointments;
