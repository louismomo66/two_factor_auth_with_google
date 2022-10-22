import { useState, useEffect } from "react";
import { useNavigate,Link } from "react-router-dom";

import { Logo, FormRow, Alert } from "../components";
import Wrapper from "../assets/wrappers/RegisterPage";
import { useAppContext } from "../context/appContext";

const initialState = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
};
const Register = () => {
  const [values, setValues] = useState(initialState);
  const { user, showAlert, displayAlert, registerUser,tokenExpiry } = useAppContext();
  const navigate = useNavigate();

  
  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const { firstName, lastName, email, password } = values;

    if (!email || !password || (!firstName && !lastName)) {
      displayAlert();
      return;
    }
    const currentUser = { firstName, lastName, email, password };
  registerUser(currentUser)
  };
  useEffect(() => {
    if (user) {
      setTimeout(() => {
        navigate("/login");
      }, 3000);
    }
  }, [user, navigate]);
  return (
    <Wrapper className='full-page'>
      <form className='form' onSubmit={onSubmit}>
        <Logo />
        <h3>Register</h3>
        {showAlert && <Alert />}
        {/* name input */}

        <FormRow
          type='text'
          name='firstName'
          labelText='First Name'
          value={values.firstName}
          handleChange={handleChange}
        />
        <FormRow
          type='text'
          name='lastName'
          labelText='Last Name'
          value={values.lastName}
          handleChange={handleChange}
        />

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
          Already a member? &nbsp;&nbsp;
          <Link to='../login'>Login</Link>
        </p>
      </form>
    </Wrapper>
  );
};

export default Register;
