import { useState } from "react";
import axios from "axios";
import FormRow from "../components/FormRow";
import { useAuthContext } from "../context/auth-context";
import { useNavigate, Link } from "react-router-dom";

const Login = () => {
  const { saveUser } = useAuthContext();
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
      const data = await axios.post(
        "http://localhost:4000/api/auth/login",
        loginUser
      );
      setValues({ email: "", password: "" });
      saveUser(data.user);
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

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
};

export default Login;
