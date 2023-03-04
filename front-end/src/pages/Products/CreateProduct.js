import React from "react";
import FormRow from "../../components/FormRow";
import { useState } from "react";
// import { useSelector } from "react-redux";

const CreateProduct = () => {
  const [toCreate, setToCreate] = useState({});
  const [values, setValues] = useState({
    name: "",
    price: "",
  });
  const [designValue, setDesignValue] = useState("");
  const [design, setDesign] = useState([]);

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const handleDesignChange = (e) => {
    setDesignValue(e.target.value);
  };

  const addRow = () => {
    design.push(designValue);
    console.log(design);
  };
  return (
    <div>
      <h1>Add a New Product</h1>
      <form className="create-form">
        <FormRow
          name="name"
          type="text"
          value={values.name}
          onChange={handleChange}
        />
        <FormRow
          name="price"
          type="number"
          value={values.price}
          min="0"
          onChange={handleChange}
        />
        <FormRow
          type="text"
          name="design"
          value={designValue}
          onChange={handleDesignChange}
        />
      </form>
      <button onClick={addRow}>Add</button>
    </div>
  );
};

export default CreateProduct;
