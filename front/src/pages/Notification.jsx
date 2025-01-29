import React, { useEffect } from 'react'
import Layout from '../component/Layout'
import { message, Tabs } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { loadUser } from '../Action/userAction';
// import { notificationUser } from '../Action/userAction';


const Notification = () => {
  const user = useSelector(state=>state.user);
  console.log(user);

  const dispatch = useDispatch();
  const handleMarkAllRead =async()=>{
    // dispatch(notificationUser( { userId: user._id },))
    try { 
      
      const res = await axios.post(
        "http://localhost:9090/api/user/getNotification",
        { userId: user._id },
        {
          withCredentials: true,
        }
      );
      
      if (res.data.success) {
        message.success(res.data.success);
        dispatch(loadUser())
        
      } else {
        message.error(res.data.success);
      }
    } catch (error) {
     
      console.log(error);
      message.error("Somthing Went Wrrong ");
    }


  console.log("hi");
  
  }

  const handleDeleteAllRead =async()=>{

    try { 
      
      const res = await axios.post(
        "http://localhost:9090/api/user/deleteAllNotification",
        { userId: user._id },
        {
          withCredentials: true,
        }
      );
      
      if (res.data.success) {
        message.success(res.data.success);
        dispatch(loadUser())
        
      } else {
        message.error(res.data.success);
      }
    } catch (error) {
     
      console.log(error);
      message.error("Somthing Went Wrrong ");
    }
    console.log(" hi ");
  }

  useEffect(()=>{
    dispatch(loadUser())
  },[])


  return (
    <Layout>
      <div className="">
       
      </div>
          <h4 className="p-3 text-center">Notification Page</h4>
      <Tabs>
        <Tabs.TabPane tab="unRead" key={0}>
          <div className="flex justify-end">
            <h4 className="p-2 cursor-pointer" onClick={handleMarkAllRead}>
              Mark All Read
            </h4>
          </div>
          {user?.user.notification.map((notificationMgs,index) => (
            <div key={index} className="card" style={{ cursor: "pointer" }}>
              <div
                className="card-text"
                onClick={() => navigate(notificationMgs.onClickPath)}
              >
                {notificationMgs.message}
              </div>
            </div>
          ))}
        </Tabs.TabPane>
        <Tabs.TabPane tab="Read" key={1}>
          <div className="flex justify-end">
            <h4 className="p-2  cursor-pointer" onClick={handleDeleteAllRead}>
              Delete All Read
            </h4>
          </div>
          {user?.user.
seennotification
.map((notificationMgs,index) => (
            <div key={index} className="card" style={{ cursor: "pointer" }}>
              <div
                className="card-text"
                onClick={() => navigate(notificationMgs.onClickPath)}
              >
                {notificationMgs.message}
              </div>
            </div>
          ))}
        </Tabs.TabPane>
      </Tabs>
    </Layout>
  )
}

export default Notification