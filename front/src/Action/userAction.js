import axios from 'axios';

const baseURl = "http://localhost:9090/api/user";

export const Register = (name, email, password) => async (dispatch) => {
    try {
        dispatch({ type: "RegisterRequest" });

        const response = await axios.post(
            `${baseURl}/register`,
            { name, email, password },
            { withCredentials: true }
        );

        if (response) {
            dispatch({
                type: "RegisterSuccess",
                payload: response.data.user,
            });
        }
    } catch (error) {
        dispatch({
            type: "RegisterFailure",
            payload: error.response?.data?.message || error.message || "Something went wrong",
        });
    }
};

export const login = (email, password) => async (dispatch) => {
    try {
        dispatch({ type: "LoginRequest" });

        const response = await axios.post(
            `${baseURl}/Login`,
            { email, password },
            { withCredentials: true }
        );

        dispatch({
            type: "LoginSuccess",
            payload: response.data.user,
        });
    } catch (error) {
        dispatch({
            type: "LoginFailure",
            payload: error.response?.data?.message || error.message || "Something went wrong",
        });
    }
};

export const loadUser = () => async (dispatch) => {
    try {
        dispatch({ type: "LoadUserRequest" });

        const response = await axios.get(`${baseURl}/getUser`, {
            withCredentials: true,
        });

        dispatch({
            type: "LoadUserSuccess",
            payload: response.data.user,
        });
    } catch (error) {
        console.error("LoadUser Error:", error.response || error.message);

        dispatch({
            type: "LoadUserFailure",
            payload: error.response?.data?.message || error.message || "Could not fetch user data",
        });
    }
};
// export const notificationUser = () => async (dispatch) => {
//     try {
//         dispatch({ type: "notificationRequest" });

//         const response = await axios.post(`${baseURl}/getNotification`, { userId: user._id }, {
//             withCredentials: true,
//         });
//         dispatch({
//             type: "notificationSuccess",
//             payload: response.data.user,
//         });
//     } catch (error) {
//         console.error("LoadUser Error:", error.response || error.message);

//         dispatch({
//             type: "notificationFailure",
//             payload: error.response?.data?.message || error.message || "Could not fetch user data",
//         });
//     }
// };




// export const ApplyDoctor = (values) => async (dispatch) => {
//     try {
//         console.log({values},"from action");
        
//         dispatch({ type: "ApplyDocRequest" });

//         const response = await axios.post(`${baseURl}/applyDoctor`,{

//         } ,{
//             withCredentials: true,
//         });

//         dispatch({
//             type: "ApplyDocSuccess",
//             payload: response.data.user,
//         });
//     } catch (error) {
//         console.error("LoadUser Error:", error.response || error.message);

//         dispatch({
//             type: "ApplyDocFailure",
//             payload: error.response?.data?.message || error.message || "Could not fetch user data",
//         });
//     }


// }


export const logout = () => async (dispatch) => {
    try {
        await fetch(`${baseURl}/logout`, {
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include',
        });

        window.location.href = "/login";

        dispatch({ type: "LogoutSuccess" });
    } catch (error) {
        dispatch({
            type: "LogoutFailure",
            payload: error.response?.data?.message || error.message || "Failed to logout",
        });
    }
};
