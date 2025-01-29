import React, { useState, useEffect } from "react";
import axios from "axios";
import moment from "moment";
import { Table } from "antd";
import Layout from "../component/Layout";

const Appointments = () => {
  const [appointments, setAppointments] = useState([]);

  const getAppointments = async () => {
    try {
      const res = await axios.get("http://localhost:9090/api/user/userAppointments", {
        withCredentials: true,
      });
      if (res.data.success) {
        console.log(res.data.data);
        setAppointments(res.data.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAppointments();
  }, []);

  const columns = [
    {
      title: "S. No.",
      render: (text, record, index) => index + 1,  // Displaying index as Serial No.
    },
    {
      title: "Date & Time",
      dataIndex: "date",
      render: (text, record) => (
        <span>
          {moment(record.date).format("DD-MM-YYYY")} &nbsp;
          {moment(record.time).format("HH:mm")}
        </span>
      ),
    },
    {
      title: "Status",
      dataIndex: "status",
    },
  ];

  return (
    <Layout>
      <div className="max-w-6xl mx-auto px-4 py-8">
        <h1 className="text-center text-4xl font-bold my-5 text-black">Appointments List</h1>
        <div className="overflow-x-auto bg-white shadow-lg rounded-lg">
          <Table
            columns={columns}
            dataSource={appointments}
            pagination={false}
            rowClassName="hover:bg-gray-100"
            className="min-w-full"
          />
        </div>
      </div>
    </Layout>
  );
};

export default Appointments;
