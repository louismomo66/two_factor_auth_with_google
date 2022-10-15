import React, { useReducer, useContext } from "react";
import reducer from "./reducer";
import axios from "axios";

import {
  CLEAR_ALERT,
  DISPLAY_ALERT,
  TOGGLE_SIDEBAR,
  LOGOUT_USER,
  REGISTER_USER_BEGIN,
  REGISTER_USER_SUCCESS,
  REGISTER_USER_ERROR,
  LOGIN_USER_BEGIN,
  LOGIN_USER_SUCCESS,
  LOGIN_USER_ERROR,
  UPDATE_USER_BEGIN,
  UPDATE_USER_SUCCESS,
  UPDATE_USER_ERROR,
  HANDLE_CHANGE,
} from "./actions";

const token = localStorage.getItem("token");
const user = localStorage.getItem("user");

const initialState = {
  isLoading: false,
  showAlert: false,
  alertType: "",
  alertText: "",
  showSidebar: false,
  user: user ? JSON.parse(user) : null,
  token: token,
  phone:'',
  country:'',
  city:'',
  street:'',
  institution:'',
  institutionOptions:[],
};

const AppContext = React.createContext();

const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  // axios
  const authFetch = axios.create({
    baseURL: "http://localhost:3003/api/v1/auth",
  });
  //request
  authFetch.interceptors.request.use(
    (config) => {
      config.headers.common["Authorization"] = `Bearer ${state.token}`;
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );
  //response
  authFetch.interceptors.response.use(
    (response) => {
      return response;
    },
    (error) => {
      console.log(error.response);
      if (error.response.status === 401) {
        logoutUser();
      }
      return Promise.reject(error);
    }
  );
  const displayAlert = () => {
    dispatch({ type: DISPLAY_ALERT });
    clearAlert();
  };
  const clearAlert = () => {
    setTimeout(() => {
      dispatch({ type: CLEAR_ALERT });
    }, 3000);
  };
  const addUserToLocalStorage = ({ user, token }) => {
    localStorage.setItem("user", JSON.stringify(user));
    localStorage.setItem("token", token);
  };
  const removeUserFromLocalStorage = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
  };

  const registerUser = async (currentUser) => {
    dispatch({ type: REGISTER_USER_BEGIN });
    try {
      const base_url = "http://localhost:3003/api/v1/auth";
      const response = await axios.post(`${base_url}/register`, currentUser);
      const { user } = response.data;
      dispatch({
        type: REGISTER_USER_SUCCESS,
        payload: {
          user,
        },
      });

      
    } catch (error) {
      console.log(error.response);
      dispatch({
        type: REGISTER_USER_ERROR,
        payload: { msg: error.response.data.msg },
      });
    }
    clearAlert();
  };
  //getPartners
  // const getPartners = async ()=> {
  //   const { data } = await axios.get("http://localhost:3003/api/v1/partners", {
  //     headers: {
  //       Authorization: `Bearer ${token}`,
  //     },
  //   });
  //   return data
  // }

  const loginUser = async (currentUser) => {
    dispatch({ type: LOGIN_USER_BEGIN });
    try {
      const base_url = "http://localhost:3003/api/v1/auth";
      const response = await axios.post(`${base_url}/login`, currentUser);
      console.log(response);

      const { user, token } = response.data;
      dispatch({
        type: LOGIN_USER_SUCCESS,
        payload: { user, token },
      });

      addUserToLocalStorage({ user, token });
    } catch (error) {
      dispatch({
        type: LOGIN_USER_ERROR,
        payload: { msg: error.response.data.msg },
      });
    }
    clearAlert();
  };

  const toggleSidebar = () => {
    dispatch({ type: TOGGLE_SIDEBAR });
  };
  const logoutUser = () => {
    dispatch({ type: LOGOUT_USER });
    removeUserFromLocalStorage();
  };

 

  //update user
  const updateUser = async (currentUser) => {
    dispatch({ type: UPDATE_USER_BEGIN });
    try {
      const { data } = await authFetch.patch(`/updateuser`, currentUser);      
      
      const { user,phone,country,city,street, token } = data;
      // console.log(token);
      dispatch({
        type: UPDATE_USER_SUCCESS,
        payload: { user, phone,country,city,street, token },
      });
      addUserToLocalStorage({ user, token });
    } catch (error) {
      if (error.response.status !== 401) {
        dispatch({
          type: UPDATE_USER_ERROR,
          payload: { msg: error.response.data.msg },
        });
      }
    }
    clearAlert();
  

  };
  // handle change
   const handleChange = ({ name, value }) => {
     dispatch({
       type: HANDLE_CHANGE,
       payload: { name, value },
     });
   };
  return (
    <AppContext.Provider
      value={{
        ...state,
        displayAlert,
        clearAlert,
        loginUser,
        registerUser,
        updateUser,
        toggleSidebar,
        logoutUser,
        handleChange,
        
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
const useAppContext = () => {
  return useContext(AppContext);
};
export { AppProvider, initialState, useAppContext };
