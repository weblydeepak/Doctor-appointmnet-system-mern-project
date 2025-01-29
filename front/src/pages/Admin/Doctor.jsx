import React, { useEffect, useState } from "react";
import Layout from "../../component/Layout";
import axios from "axios";
import { message, notification, Table } from "antd";
const Doctor = () => {
  const [Doctor, setDoctor] = useState([]);

  //getUsers
  const getAllDoctor = async () => {

    try {  
        const res = await axios.get(
          "http://localhost:9090/api/admin/getAllDoctors",
          {
            withCredentials: true,
          }
        );
        
        if (res.data.success) {
          message.success(res.data.success);
          setDoctor(res.data.data);
          
        } else {
          message.error(res.data.success);
        }
      } catch (error) {
       
        console.log(error);
        message.error("Somthing Went Wrrong ");
      }
    
  };

  const handleAccountStatus = async(record,status)=>{
    console.log(record,status);
    

    try {
      const res = await axios.post("http://localhost:9090/api/admin/changeAccount",
        { doctorId: record._id, userId: record.userId, status: status },
        {
          withCredentials: true,
        }
      )
       if (res.data.success) {
        message.success(res.data.success);
        getAllDoctor();
        window.location.reload();
       } else {
        message.error(res.data.success);
       }
   

    } catch (error) {
      message.error("Somthing Went Wrrong ");
    }

  }




  useEffect(() => {
    getAllDoctor();
  }, []);

  
  const columns = [
    {
        title: "Name",
        dataIndex: "name",
        render: (text, record) => (
          <span>
            {record.firstName} {record.lastName}
          </span>
        ),
      },
      {
        title: "Status",
        dataIndex: "status",
      },
      {
        title: "phone",
        dataIndex: "phone",
      },
      {
        title: "Actions",
        dataIndex: "actions",
        render: (text, record) => (
          <div className="d-flex">
            {record.status === "pending" ? (
                <button className="btn bg-green-400 text-sm py-2 px-3 rounded-sm text-white font-semibold"
                onClick={()=>handleAccountStatus(record, "approved")}
                >Approve</button>
            ) : (
                <button className="btn bg-red-600 text-sm py-2 px-3 rounded-sm text-white font-semibold"
                onClick={()=>handleAccountStatus(record, "rejected")}
                >Reject</button>
            )}
          </div>
        ),
      },
    ];
  return (
    <Layout>
      <h1 className="text-center m-2">Users List</h1>
      <Table columns={columns} dataSource={Doctor} />
    </Layout>
  );
};

export default Doctor;