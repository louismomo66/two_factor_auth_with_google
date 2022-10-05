import React, { useReducer, useContext } from "react";
import reducer from "./reducer";
import axios from "axios";
import {
  CLEAR_ALERT,
  DISPLAY_ALERT,
  TOGGLE_SIDEBAR,
  LOGOUT_USER,
} from "./actions";

const initialState = {
  isLoading: false,
  showAlert: false,
  alertType: "",
  alertText: "",
  showSidebar: false,
};

const AppContext = React.createContext();

const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const displayAlert = () => {
    dispatch({ type: DISPLAY_ALERT });
    clearAlert();
  };
  const clearAlert = () => {
    setTimeout(() => {
      dispatch({ type: CLEAR_ALERT });
    }, 3000);
  };
    const toggleSidebar = () => {
      dispatch({ type: TOGGLE_SIDEBAR });
    };
    const logoutUser = () => {
      dispatch({ type: LOGOUT_USER });
    };

  return (
    <AppContext.Provider
      value={{
        ...state,
        displayAlert,
        clearAlert,
        toggleSidebar,
        logoutUser,
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
