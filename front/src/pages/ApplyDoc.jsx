import React from 'react';
import { Form, Input, TimePicker, message } from "antd";
import Layout from '../component/Layout';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';

const ApplyDoc = () => {
  const { user } = useSelector(state => state.user);

  const handelFinish = async (values) => {
    try {
      const res = await axios.post(
        "http://localhost:9090/api/user/applyDoctor",
        { ...values, userId: user._id },
        {
          withCredentials: true,
        }
      );

      if (res.data.success) {
        message.success(res.data.success);
        window.location.reload();
      } else {
        message.error(res.data.success);
      }
    } catch (error) {
      console.log(error);
      message.error("Something Went Wrong");
    }
  };

  return (
    <Layout>
      <h1 className="text-center text-3xl font-bold my-6">Apply as Doctor</h1>
      <div className="bg-gray-50 p-6 rounded-lg shadow-md max-w-4xl mx-auto">
        <Form layout="vertical" onFinish={handelFinish} className="space-y-6">
          <div className="border-b pb-4">
            <h4 className="text-xl font-semibold mb-4">Personal Details</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <Form.Item
                label="First Name"
                name="firstName"
                required
                rules={[{ required: true, message: "Please enter your first name" }]}
              >
                <Input className="p-4 border rounded-lg w-full h-12" placeholder="Your first name" />
              </Form.Item>
              <Form.Item
                label="Last Name"
                name="lastName"
                required
                rules={[{ required: true, message: "Please enter your last name" }]}
              >
                <Input className="p-4 border rounded-lg w-full h-12" placeholder="Your last name" />
              </Form.Item>
              <Form.Item
                label="Phone No"
                name="phone"
                required
                rules={[{ required: true, message: "Please enter your contact number" }]}
              >
                <Input className="p-4 border rounded-lg w-full h-12" placeholder="Your contact number" />
              </Form.Item>
              <Form.Item
                label="Email"
                name="email"
                required
                rules={[{ required: true, type: "email", message: "Please enter a valid email address" }]}
              >
                <Input className="p-4 border rounded-lg w-full h-12" placeholder="Your email address" />
              </Form.Item>
              <Form.Item label="Website" name="website">
                <Input className="p-4 border rounded-lg w-full h-12" placeholder="Your website" />
              </Form.Item>
              <Form.Item
                label="Address"
                name="address"
                required
                rules={[{ required: true, message: "Please enter your clinic address" }]}
              >
                <Input className="p-4 border rounded-lg w-full h-12" placeholder="Your clinic address" />
              </Form.Item>
            </div>
          </div>

          <div className="border-b pb-4">
            <h4 className="text-xl font-semibold mb-4">Professional Details</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <Form.Item
                label="Specialization"
                name="specialization"
                required
                rules={[{ required: true, message: "Please enter your specialization" }]}
              >
                <Input className="p-4 border rounded-lg w-full h-12" placeholder="Your specialization" />
              </Form.Item>
              <Form.Item
                label="Experience"
                name="experience"
                required
                rules={[{ required: true, message: "Please enter your experience" }]}
              >
                <Input className="p-4 border rounded-lg w-full h-12" placeholder="Your experience" />
              </Form.Item>
              <Form.Item
                label="Fees Per Consultation"
                name="feesPerCunsaltation"
                required
                rules={[{ required: true, message: "Please enter your consultation fees" }]}
              >
                <Input className="p-4 border rounded-lg w-full h-12" placeholder="Your consultation fees" />
              </Form.Item>
              <Form.Item label="Timings" name="timings" required>
                <TimePicker.RangePicker format="HH:mm" className="w-full p-4 border rounded-lg h-12" />
              </Form.Item>
            </div>
          </div>

          <div className="text-center">
            <button
              type="submit"
              className="bg-blue-600 text-white font-semibold rounded-lg px-6 py-3 hover:bg-blue-700 transition"
            >
              Submit
            </button>
          </div>
        </Form>
      </div>
    </Layout>
  );
};

export default ApplyDoc;
