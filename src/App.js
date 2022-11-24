import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import {
  Landing,
  Register,
  Error,
  ProtectedRoute,
  Login,
  ForgotPassword,
} from "./pages";
import {
  Home,
  Profile,
  Labs,
  Reports,
  SharedLayout,
  Schedules,
  Tests,
  LabAccess,
} from "./pages/dashboard";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { AutoAuthenticate } from "./store/actions/authActions";
import ResetPassword from "./pages/ResetPassword";
import VerifyAccount from "./pages/VerifyAccount";

function App() {
  const { isLoggedIn } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    AutoAuthenticate(dispatch);
  }, [dispatch]);

  return (
    <BrowserRouter>
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <Routes>
        <Route
          path="/dashboard/*"
          element={
            <ProtectedRoute>
              <SharedLayout />
            </ProtectedRoute>
          }
        >
          <Route path="user" element={<Home />} />
          <Route path="profile" element={<Profile />} />
          <Route path="labs" element={<Labs />} />
          <Route path="labaccess" element={<LabAccess />} />
          <Route path="reports" element={<Reports />} />
          <Route path="tests" element={<Tests />} />
          <Route path="schedules" element={<Schedules />} />
        </Route>

        <Route
          path="/"
          element={isLoggedIn ? <Navigate to="/dashboard" /> : <Landing />}
        />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/verify-account" element={<VerifyAccount />} />

        <Route path="*" element={<Error />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
