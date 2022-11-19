import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

import { Logo, FormRow, Alert } from "../components";
import Wrapper from "../assets/wrappers/RegisterPage";
import { useDispatch } from "react-redux";
import { isValidEmail } from "../utils/utils";
import { loginUser } from "../store/actions/authActions";

const initialState = {
  email: "",
  password: "",
};
const Login = () => {
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
    const { email, password } = values;

    if (!email || !password) {
      setError("Please fill all the field");
      return;
    }
    if (!isValidEmail(email)) {
      setError("Please enter a valid email");
      return;
    }
    const currentUser = { email, password };
    loginUser(currentUser);

    try {
      setLoading(true);
      const data = {
        email,
        password,
      };
      await dispatch(loginUser(data, navigate));
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };

  return (
    <Wrapper className="full-page">
      <form className="form" onSubmit={onSubmit}>
        <Logo />
        <h3> Login</h3>
        {error && <Alert alertType="danger" alertText={error} />}

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
          {loading ? "Logging in..." : "Login"}
        </button>
        <p>
          Not a member yet? &nbsp;&nbsp;
          <Link to="../register">Register</Link>
        </p>
      </form>
    </Wrapper>
  );
};

export default Login;
