import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './index.css'
import App from './App.jsx'
import Home from './pages/Home.jsx'
import Login from './pages/Login.jsx'
import { Provider } from 'react-redux'
import ProtectedRoute from './component/ProtectedRoutes.jsx'
import PublicRoute from './component/publicRoutes.jsx'
import store from './Store.js'
import ApplyDoc from './pages/ApplyDoc.jsx'
import Notification from './pages/Notification.jsx'
import Users from './pages/Admin/user.jsx'
import Doctor from './pages/Admin/doctor.jsx'
import DoctorProfile from './pages/Doctor/DoctorProfile.jsx'
import Booking from './pages/Booking.jsx'
import Appointments from './pages/Appointments.jsx'
import DoctorAppointments from './pages/Doctor/DocAppointmnts.jsx'



const createRouter = createBrowserRouter([

  {
    path: '/',
    element:<App/>,
    children:[
 
      {
        path: '/',
        element:(
        <ProtectedRoute>
          <Home/>,
        </ProtectedRoute>),
      },
      {
        path: '/apply-doctor',
        element:(
        <ProtectedRoute>
          <ApplyDoc/>,
        </ProtectedRoute>),
      },
      {
        path: '/notification',
        element:(
        <ProtectedRoute>
          <Notification/>,
        </ProtectedRoute>),
      },
      {
        path: '/admin/users',
        element:(
        <ProtectedRoute>
          <Users/>,
        </ProtectedRoute>),
      },
      {
        path: '/admin/Doctor',
        element:(
        <ProtectedRoute>
          <Doctor/>,
        </ProtectedRoute>),
      },
      {
        path: '/Doctor/profile/:id',
        
        element:(
        <ProtectedRoute>
          <DoctorProfile/>
        </ProtectedRoute>),
      },
      {
        path: '/Doctor/booking-appointment/:id',
        element:(
        <ProtectedRoute>
          <Booking/>
        </ProtectedRoute>),
      },
      {
        path: '/appointments',
        element:(
        <ProtectedRoute>
          <Appointments/>
        </ProtectedRoute>),
      },
      {
        path: '/doctor-appointments',
        element:(
        <ProtectedRoute>
          <DoctorAppointments/>
        </ProtectedRoute>),
      },
      {
        path: '/login',
        element:(
          <PublicRoute>
            <Login/>
          </PublicRoute>
        ),
      },
      {
        path:"*",
        element:(
          <div>
            <h1>Page Not Found</h1>
          </div>
        ),
      },
    ]
  }

])



createRoot(document.getElementById('main')).render(
  <Provider store={store} >
    <RouterProvider router={createRouter}/>
  </Provider>
)
