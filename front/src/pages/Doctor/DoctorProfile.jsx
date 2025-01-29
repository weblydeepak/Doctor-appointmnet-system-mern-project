import React, { useEffect, useState } from 'react';
import Layout from '../../component/Layout';
import { useNavigate, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { Col, Form, Input, message, Row, TimePicker } from 'antd';
import moment from 'moment';

const DoctorProfile = () => {
  const { user } = useSelector((state) => state.user);
  const [doctor, setDoctor] = useState(null);
  const navigate = useNavigate();
  const params = useParams();

  const getAllDoctorInfo = async () => {
    try {
      const res = await axios.get(`http://localhost:9090/api/doctor/getDoctorsInfo`, {
        withCredentials: true,
      });
      if (res.data.success) {
        message.success(res.data.success);
        setDoctor(res.data.data);
      } else {
        message.error(res.data.success);
      }
    } catch (error) {
      console.error(error);
      message.error("Something went wrong.");
    }
  };

  const handleFinish = async (values) => {
    try {
      const res = await axios.post(
        "http://localhost:9090/api/doctor/updateDoctorInfo",
        { ...values, userId: user._id },
        {
          withCredentials: true,
        }
      );
      if (res.data.success) {
        message.success(res.data.success);
        window.location.reload();
        navigate("/");
      } else {
        message.error(res.data.success);
      }
    } catch (error) {
      console.log(error);
      message.error("Something went wrong.");
    }
  };

  useEffect(() => {
    getAllDoctorInfo();
  }, []);

  return (
    <Layout>
      <h1 className="text-center mt-12 text-4xl font-semibold text-black mb-8">Manage Profile</h1>
      {doctor && (
        <div className="max-w-5xl mx-auto bg-white shadow-2xl rounded-lg p-8">
          <Form
            layout="vertical"
            onFinish={handleFinish}
            initialValues={{
              ...doctor,
              timings: [
                moment(doctor.timings[0], "HH:mm"),
                moment(doctor.timings[1], "HH:mm"),
              ],
            }}
          >
            <h4 className="text-xl font-semibold text-gray-800 mb-6">Personal Details:</h4>
            <Row gutter={24}>
              <Col xs={24} sm={12} md={8}>
                <Form.Item
                  label="First Name"
                  name="firstName"
                  required
                  rules={[{ required: true, message: 'First name is required' }]}
                >
                  <Input
                    type="text"
                    placeholder="Your first name"
                    className="p-4 rounded-md border border-gray-300 focus:ring-2 focus:ring-blue-500 w-full h-12"
                  />
                </Form.Item>
              </Col>
              <Col xs={24} sm={12} md={8}>
                <Form.Item
                  label="Last Name"
                  name="lastName"
                  required
                  rules={[{ required: true, message: 'Last name is required' }]}
                >
                  <Input
                    type="text"
                    placeholder="Your last name"
                    className="p-4 rounded-md border border-gray-300 focus:ring-2 focus:ring-blue-500 w-full h-12"
                  />
                </Form.Item>
              </Col>
              <Col xs={24} sm={12} md={8}>
                <Form.Item
                  label="Phone No"
                  name="phone"
                  required
                  rules={[{ required: true, message: 'Phone number is required' }]}
                >
                  <Input
                    type="text"
                    placeholder="Your contact no"
                    className="p-4 rounded-md border border-gray-300 focus:ring-2 focus:ring-blue-500 w-full h-12"
                  />
                </Form.Item>
              </Col>
              <Col xs={24} sm={12} md={8}>
                <Form.Item
                  label="Email"
                  name="email"
                  required
                  rules={[{ required: true, message: 'Email is required' }]}
                >
                  <Input
                    type="email"
                    placeholder="Your email address"
                    className="p-4 rounded-md border border-gray-300 focus:ring-2 focus:ring-blue-500 w-full h-12"
                  />
                </Form.Item>
              </Col>
              <Col xs={24} sm={12} md={8}>
                <Form.Item label="Website" name="website">
                  <Input
                    type="text"
                    placeholder="Your website"
                    className="p-4 rounded-md border border-gray-300 focus:ring-2 focus:ring-blue-500 w-full h-12"
                  />
                </Form.Item>
              </Col>
              <Col xs={24} sm={12} md={8}>
                <Form.Item
                  label="Address"
                  name="address"
                  required
                  rules={[{ required: true, message: 'Address is required' }]}
                >
                  <Input
                    type="text"
                    placeholder="Your clinic address"
                    className="p-4 rounded-md border border-gray-300 focus:ring-2 focus:ring-blue-500 w-full h-12"
                  />
                </Form.Item>
              </Col>
            </Row>

            <h4 className="text-xl font-semibold text-gray-800 mt-8 mb-6">Professional Details:</h4>
            <Row gutter={24}>
              <Col xs={24} sm={12} md={8}>
                <Form.Item
                  label="Specialization"
                  name="specialization"
                  required
                  rules={[{ required: true, message: 'Specialization is required' }]}
                >
                  <Input
                    type="text"
                    placeholder="Your specialization"
                    className="p-4 rounded-md border border-gray-300 focus:ring-2 focus:ring-blue-500 w-full h-12"
                  />
                </Form.Item>
              </Col>
              <Col xs={24} sm={12} md={8}>
                <Form.Item
                  label="Experience"
                  name="experience"
                  required
                  rules={[{ required: true, message: 'Experience is required' }]}
                >
                  <Input
                    type="text"
                    placeholder="Your experience"
                    className="p-4 rounded-md border border-gray-300 focus:ring-2 focus:ring-blue-500 w-full h-12"
                  />
                </Form.Item>
              </Col>
              <Col xs={24} sm={12} md={8}>
                <Form.Item
                  label="Fees Per Consultation"
                  name="feesPerCunsaltation"
                  required
                  rules={[{ required: true, message: 'Fees is required' }]}
                >
                  <Input
                    type="text"
                    placeholder="Your consultation fees"
                    className="p-4 rounded-md border border-gray-300 focus:ring-2 focus:ring-blue-500 w-full h-12"
                  />
                </Form.Item>
              </Col>
              <Col xs={24} sm={12} md={8}>
                <Form.Item label="Timings" name="timings" required>
                  <TimePicker.RangePicker
                    format="HH:mm"
                    className="w-full p-4 rounded-md border border-gray-300 focus:ring-2 focus:ring-blue-500 h-12"
                  />
                </Form.Item>
              </Col>
            </Row>

            <div className="text-center mt-8">
              <button
                className="bg-blue-500 text-white py-3 px-6 rounded-md text-lg font-semibold hover:bg-blue-600 focus:ring-4 focus:ring-blue-300"
                type="submit"
              >
                Update Profile
              </button>
            </div>
          </Form>
        </div>
      )}
    </Layout>
  );
};

export default DoctorProfile;
   