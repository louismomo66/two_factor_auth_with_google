import {
  DISPLAY_ALERT,
  CLEAR_ALERT,
  TOGGLE_SIDEBAR,
  LOGOUT_USER,
  REGISTER_USER_BEGIN,
  REGISTER_USER_SUCCESS,
  REGISTER_USER_ERROR,
  LOGIN_USER_BEGIN,
  LOGIN_USER_SUCCESS,
  LOGIN_USER_ERROR,  
} from "./actions";
import { initialState } from "./appContext";
const reducer = (state, action) => {
  if (action.type === DISPLAY_ALERT) {
    return {
      ...state,
      showAlert: true,
      alertType: "danger",
      alertText: "Please provide all values!",
    };
  }
  if (action.type === CLEAR_ALERT) {
    return {
      ...state,
      showAlert: false,
      alertType: "",
      alertText: "",
    };
  }
  // register user
  if (action.type === REGISTER_USER_BEGIN) {
    return {
      ...state,
      isLoading: true,
    };
  }
  if (action.type === REGISTER_USER_SUCCESS) {
    return {
      ...state,
      isLoading: false,      
      user: action.payload.user,      
      showAlert: true,
      alertType: "success",
      alertText: "User Created Redirecting...",
    };
  }
  if (action.type === REGISTER_USER_ERROR) {
    return {
      ...state,
      isLoading: false,
      showAlert: true,
      alertType: "danger",
      alertText: "Email already exists",
    };
  }
  // login user
   if (action.type === LOGIN_USER_BEGIN) {
     return {
       ...state,
       isLoading: true,
     };
   }
   if (action.type === LOGIN_USER_SUCCESS) {
     return {
       ...state,
       isLoading: false,
       token: action.payload.token,
       user: action.payload.user,       
       showAlert: true,
       alertType: "success",
       alertText: "Login Successful! Redirecting... ",
     };
   }
   if (action.type === LOGIN_USER_ERROR) {
     return {
       ...state,
       isLoading: false,
       showAlert: true,
       alertType: "danger",
       alertText: 'Enter valid credentials!',
     };
   }
  // setup user
  // if (action.type === SETUP_USER_BEGIN) {
  //   return {
  //     ...state,
  //     isLoading: true,
  //   };
  // }
  // if (action.type === SETUP_USER_SUCCESS) {
  //   return {
  //     ...state,
  //     isLoading: false,
  //     user: action.payload.user,
  //     token: action.payload.token,
  //     showAlert: true,
  //     alertType: "success",
  //     alertText: action.payload.alertText,
  //   };
  // }
  // if (action.type === SETUP_USER_ERROR) {
  //   return {
  //     ...state,
  //     isLoading: false,
  //     showAlert: true,
  //     alertType: "danger",
  //     alertText: "Provide correct credentials!",
  //   };
  // }
  //toggle sidebar
  if (action.type === TOGGLE_SIDEBAR) {
    return {
      ...state,
      showSidebar: !state.showSidebar,
    };
  }
  //logout
  if (action.type === LOGOUT_USER) {
    return {
      ...initialState,
      user: null,
      token: null,
    };
  }

  throw new Error(`no such action: ${action.type}`);
};

export default reducer;
