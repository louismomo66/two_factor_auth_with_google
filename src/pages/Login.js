import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";

import { Logo, FormRow, Alert } from "../components";
import Wrapper from "../assets/wrappers/RegisterPage";
import { useAppContext } from "../context/appContext";

const initialState = {
  email: "",
  password: "",
};
const Login = () => {
  const [values, setValues] = useState(initialState);
  const { user,token,tokenExpiry, showAlert, displayAlert, loginUser,logoutUser } = useAppContext();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const {  email, password} = values;

    if (!email || !password) {
      displayAlert();
      return;
    }
    const currentUser = { email, password };
    loginUser(currentUser)
  };
  useEffect(() => {
    if(tokenExpiry < Date.now()) {
      logoutUser()
      // navigate('/register')
      
    }
    console.log(tokenExpiry,Date.now());
    if (user && token) {
      setTimeout(() => {
        navigate("/dashboard");
      }, 3000);
    }
  }, [user, token,navigate,tokenExpiry]);
  return (
    <Wrapper className='full-page'>
      <form className='form' onSubmit={onSubmit}>
        <Logo />
        <h3> Login</h3>
        {showAlert && <Alert />}

        {/* email input */}
        <FormRow
          type='email'
          name='email'
          value={values.email}
          handleChange={handleChange}
        />
        {/* password input */}
        <FormRow
          type='password'
          name='password'
          value={values.password}
          handleChange={handleChange}
        />
        <button type='submit' className='btn btn-block'>
          submit
        </button>
        <p>
          Not a member yet? &nbsp;&nbsp;
          <Link to='../register'>Register</Link>
        </p>
      </form>
    </Wrapper>
  );
};

export default Login;
