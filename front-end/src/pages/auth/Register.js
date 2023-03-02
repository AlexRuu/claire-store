import React from "react";
import FormRow from "../../components/FormRow";
import { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const Register = () => {
  const [values, setValues] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const { firstName, lastName, email, password } = values;
    const registerNewUser = { firstName, lastName, email, password };

    try {
      await axios.post("/api/auth/register", registerNewUser);
      setValues({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        confirmPassword: "",
      });
    } catch (error) {
      console.log(error.response.data);
    }
  };

  return (
    <div>
      <form onSubmit={onSubmit}>
        <div>
          <FormRow
            type="text"
            name="firstName"
            value={values.firstName}
            onChange={handleChange}
          />
          <FormRow
            type="text"
            name="lastName"
            value={values.lastName}
            onChange={handleChange}
          />
        </div>
        <FormRow
          type="email"
          name="email"
          value={values.email}
          onChange={handleChange}
        />
        <FormRow
          type="password"
          name="password"
          value={values.password}
          onChange={handleChange}
        />
        <FormRow
          type="password"
          name="confirmPassword"
          value={values.confirmPassword}
          onChange={handleChange}
        />
        <p>
          Already have an account? <Link to="/login">Login!</Link>
        </p>
        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default Register;
