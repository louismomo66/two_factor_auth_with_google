import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Logo, FormRow, Alert } from "../components";
import Wrapper from "../assets/wrappers/RegisterPage";
import { useDispatch } from "react-redux";
import { registerUser } from "../store/actions/authActions";
import { isValidEmail } from "../utils/utils";

const initialState = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
};
const Register = () => {
  const [values, setValues] = useState(initialState);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setError("");
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const { firstName, lastName, email, password } = values;

    if (!email || !password || (!firstName && !lastName)) {
      setError("Please fill all the field");
      return;
    }
    if (!isValidEmail(email)) {
      setError("Please enter a valid email");
      return;
    }
    if (password.length < 6) {
      setError("Password should have more than 5 characters");
      return;
    }

    try {
      setLoading(true);
      const data = {
        firstName,
        lastName,
        email,
        password,
      };
      await dispatch(registerUser(data, navigate));
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };

  return (
    <Wrapper className="full-page">
      <form className="form" onSubmit={onSubmit}>
        <Logo />
        <h3>Register</h3>
        {error && <Alert alertType="danger" alertText={error} />}
        {/* name input */}

        <FormRow
          type="text"
          name="firstName"
          labelText="First Name"
          value={values.firstName}
          handleChange={handleChange}
        />
        <FormRow
          type="text"
          name="lastName"
          labelText="Last Name"
          value={values.lastName}
          handleChange={handleChange}
        />

        {/* email input */}
        <FormRow
          type="email"
          name="email"
          value={values.email}
          handleChange={handleChange}
        />
        {/* password input */}
        <FormRow
          type="password"
          name="password"
          value={values.password}
          handleChange={handleChange}
        />
        <button type="submit" className="btn btn-block" disabled={loading}>
          {loading ? "creating..." : "Create Account"}
        </button>
        <p>
          Already a member? &nbsp;&nbsp;
          <Link to="../login">Login</Link>
        </p>
      </form>
    </Wrapper>
  );
};

export default Register;
