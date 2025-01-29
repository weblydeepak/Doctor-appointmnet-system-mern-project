import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { loadUser } from '../Action/userAction.js';
import Layout from '../component/Layout.jsx';
import axios from 'axios';
import { message, Row, Col } from 'antd';
import DoctorList from '../component/DocList.jsx';

const Home = () => {
  const dispatch = useDispatch();
  const [doctor, setDoctor] = useState([]);

  const getDocData = async () => {
    try {
      const res = await axios.get('http://localhost:9090/api/user/getaAllAproveDoc', {
        withCredentials: true,
      });
      if (res.data.success) {
        console.log(res);
        
        message.success(res.data.message || "Doctors loaded successfully");
        setDoctor(Array.isArray(res.data.data) ? res.data.data : []);
      } else {
        message.error(res.data.message || "Failed to load doctors");
      }
    } catch (error) {
      console.error(error);
      message.error("An error occurred while fetching doctor data");
    }
  };

  useEffect(() => {
    dispatch(loadUser());
    getDocData();
  }, []);

  return (
    <Layout>
    <h1 className="text-center text-3xl font-bold text-[#432004]">Home Page</h1>
    <Row gutter={[16, 16]} className="mt-5">
      {doctor?.length > 0 ? (
        doctor.map((doc) => <DoctorList key={doc._id} doctor={doc} />)
      ) : (
        <p className="text-center text-lg text-gray-600">No doctors available</p>
      )}
    </Row>
  </Layout>
  );
};

export default Home;
