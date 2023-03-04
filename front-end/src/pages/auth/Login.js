import { useState } from "react";
import FormRow from "../../components/FormRow";
import { useNavigate, Link } from "react-router-dom";
import { fetchUser, loginUser } from "../../slices/authSlice";
import { useDispatch, useSelector } from "react-redux";

const Login = () => {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  // const { saveUser, user, fetchUser } = useAuthContext();
  const navigate = useNavigate();
  const [values, setValues] = useState({ email: "", password: "" });

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const { email, password } = values;
    const user = { email, password };
    try {
      dispatch(loginUser(user));
      dispatch(fetchUser());
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
      <section className="login">
        <form className="login-form" onSubmit={onSubmit}>
          <FormRow
            type="email"
            name="email"
            values={values.email}
            placeholder="example@email.com"
            onChange={handleChange}
          />
          <FormRow
            type="password"
            name="password"
            value={values.password}
            onChange={handleChange}
          />
          <button type="submit" className="login-button">
            Login
          </button>
          <p>
            <Link to="/register">Sign Up</Link>
          </p>
        </form>
      </section>
    );
  }
};

export default Login;
