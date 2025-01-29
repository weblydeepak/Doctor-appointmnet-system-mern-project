import React, { useEffect, useState } from 'react'
import Layout from '../component/Layout'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { DatePicker, message, TimePicker } from 'antd';
import axios from 'axios';
import moment from 'moment';


const Booking = () => {
    const params = useParams();
    const navigate = useNavigate();
    const {user } = useSelector(state=>state.user)
    const [doctors, setDoctors] = useState([]);
    const [isAvailable, setIsAvailable] = useState(false);
    const [date, setDate] = useState(null); // Change to null initially
    const [time, setTime] = useState(null); // Change to null initially


    
    
    const getDocDataById = async () => {
      try {
        console.log(params);
        const res = await axios.post(
          `http://localhost:9090/api/doctor/getDocById`,
          { doctorId: params.id}, 
          { withCredentials: true, }
        );
        
        if (res.data.success) {
            setDoctors(res.data.data);
        } else {
          console.error(res.data.error);
        }
      } catch (error) {
        console.error(error);
      }
    };

    const handleAvailability = async () => {
        try {
            const res = await axios.post("http://localhost:9090/api/user/bookingAvailability",
                { doctorId: params.id,
                  date: date,
                  time: time, },
                { withCredentials: true, }
            )            
            if(res.data.success) {
                message.success(res.data.success);
                setIsAvailable(true);
            }


        } catch (error) {
            console.error(error);
        }
    };

    const handleBooking = async () => {
        
    //    console.log({ doctorId: params.id,
    //     userId: user._id,
    //     doctorInfo: doctors,
    //     userInfo: user,
    //     date: date,
    //     time: time,
    //   }, );
       
        
        try {
            setIsAvailable(true);
          const res = await axios.post("http://localhost:9090/api/user/bokking-appointment",
            { doctorId: params.id,
                userId: user._id,
                doctorInfo: doctors,
                userInfo: user,
                date: date,
                time: time,
              }, 
           { withCredentials: true });
          if (res.data.success) {
            console.log(res);
            message.success(res.data.error);
            setDate(null);
            setTime(null);
            navigate("/")
          } else {
            console.error(res.data.error);
          }
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
      getDocDataById();
    }, []);

    return (
       
        <Layout>
        <h3 className='text-center text-5xl font-bold my-8'>Booking Page</h3>
        <div className="container w-3/4 m-auto ">
          {doctors && (
            <div className='flex flex-col gap-4'>
              <h4  className='text-3xl font-semibold'>
                Dr.{doctors.firstName} {doctors.lastName}
              </h4>
              <h4 className='text-xl font-semibold'>Fees : {doctors.feesPerCunsaltation}</h4>
              <h4 className='text-xl font-semibold'>
  Timings:{" "}
  {doctors.timings &&
    new Date(doctors.timings[0]).toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    })}{" "}
  -{" "}
  {doctors.timings &&
    new Date(doctors.timings[1]).toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    })}
</h4>
              <div className="flex flex-col w-1/2 gap-3">
                <DatePicker
                  className="m-2"
                  format="DD-MM-YYYY"
                  onChange={(value,dateString) =>{
                    setDate(dateString)}
                  }
                />
                <TimePicker
                  format="HH:mm"
                  className="m-2"
                  onChange={(value,time) => {
                    setTime(time);
                  }}
                />
               {!   isAvailable?( <button className="btn bg-blue-400 mt-2 rounded-sm py-2 px-1 text-white font-semibold" onClick={handleAvailability}>
                  Check Availability
                </button>)
               :(
                 <button className="btn bg-black mt-2 rounded-sm py-2 px-1 text-white font-semibold" onClick={handleBooking}>
                 Book Now
               </button>)}
    
              </div>
            </div>
          )}
        </div>
      </Layout>
    );
};

export default Booking;
