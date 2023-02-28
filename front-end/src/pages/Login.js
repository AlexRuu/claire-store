import { useState } from "react";
import axios from "axios";
import FormRow from "../components/FormRow";
import { useAuthContext } from "../context/auth-context";
import { useNavigate, Link } from "react-router-dom";
import { useSelector } from "react-redux";

const Login = () => {
  const { user } = useSelector((state) => state.auth);

  // const { saveUser, user, fetchUser } = useAuthContext();
  const navigate = useNavigate();
  const [values, setValues] = useState({ email: "", password: "" });

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const { email, password } = values;
    const loginUser = { email, password };
    try {
      const data = await axios.post("/api/auth/login", loginUser);
      fetchUser();
      saveUser(data.user);
      setValues({ email: "", password: "" });
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };
  if (user) {
    return <h1>You're already logged in...</h1>;
  } else {
    return (
      <section>
        <form className="login-form" onSubmit={onSubmit}>
          <FormRow
            type="email"
            name="email"
            values={values.email}
            onChange={handleChange}
          />
          <FormRow
            type="password"
            name="password"
            value={values.password}
            onChange={handleChange}
          />
          <button type="submit">Login</button>
          <p>
            <Link to="/register">Register</Link>
          </p>
        </form>
      </section>
    );
  }
};

export default Login;
