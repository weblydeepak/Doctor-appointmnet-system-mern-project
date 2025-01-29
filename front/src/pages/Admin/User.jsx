import React, { useEffect, useState } from "react";
import Layout from "../../component/Layout";
import axios from "axios";
import { message, Table } from "antd";

const Users = () => {
  const [users, setUsers] = useState([]);

  // Get Users
  const getUsers = async () => {
    try {
      const res = await axios.get("http://localhost:9090/api/admin/getAllUsers", {
        withCredentials: true,
      });
      console.log(res.data.data);

      if (res.data.success) {
        message.success(res.data.success);
        setUsers(res.data.data);
      } else {
        message.error(res.data.success);
      }
    } catch (error) {
      console.log(error);
      message.error("Something Went Wrong ");
    }
  };

  useEffect(() => {
    getUsers();
  }, []);

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
    },
    {
      title: "Email",
      dataIndex: "email",
    },
    {
      title: "Doctor",
      dataIndex: "isDoctor",
      render: (text, record) => <span>{record.isDoctor ? "Yes" : "No"}</span>,
    },
    {
      title: "Actions",
      dataIndex: "actions",
      render: (text, record) => (
        <div className="flex gap-2">
          <button
            className="bg-red-500 text-white py-2 px-4 rounded-md text-sm font-semibold hover:bg-red-600 focus:outline-none"
            onClick={() => console.log("Blocked user:", record)}
          >
            Block
          </button>
        </div>
      ),
    },
  ];

  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 py-8">
        <h1 className="text-center text-3xl font-bold text-black mb-6">Users List</h1>
        <div className="overflow-x-auto bg-white shadow-lg rounded-lg">
          <Table
            columns={columns}
            dataSource={users}
            pagination={false}
            rowClassName="hover:bg-gray-100"
            className="min-w-full"
          />
        </div>
      </div>
    </Layout>
  );
};

export default Users;
