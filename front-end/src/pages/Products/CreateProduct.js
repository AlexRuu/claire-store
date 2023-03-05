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
  const [styleValue, setStyleValue] = useState("");
  const [style, setStyle] = useState([]);
  const [detailsValue, setDetailsValue] = useState("");
  const [details, setDetails] = useState([]);

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const handleDesignChange = (e) => {
    setDesignValue(e.target.value);
  };

  const handleStyleChange = (e) => {
    setStyleValue(e.target.value);
  };

  const handleDetailsChange = (e) => {
    setDetailsValue(e.target.value);
  };

  const addDesign = (e) => {
    e.preventDefault();
    design.push(designValue);
    setDesignValue("");
  };

  const addStyle = (e) => {
    e.preventDefault();
    style.push(styleValue);
    setStyleValue("");
  };

  const addDetails = (e) => {
    e.preventDefault();
    details.push(detailsValue);
    setDetailsValue("");
  };

  const createProduct = (e) => {
    e.preventDefault();
    const { name, price } = values;
    setToCreate({ name, price, design, style });
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
        <button onClick={addDesign}>Add</button>
        <ul>
          {design.map((item, index) => {
            return <li key={index}>{item}</li>;
          })}
        </ul>
        <FormRow
          type="text"
          name="style"
          value={styleValue}
          onChange={handleStyleChange}
        />
        <button onClick={addStyle}>Add</button>
        <ul>
          {style.map((item, index) => {
            return <li key={index}>{item}</li>;
          })}
        </ul>
        <FormRow
          type="text"
          name="details"
          value={detailsValue}
          onChange={handleDetailsChange}
        />
        <button onClick={addDetails}>Add</button>
        <ul>
          {details.map((item, index) => {
            return <li key={index}>{item}</li>;
          })}
        </ul>
        <FormRow type="file" />
        <button type="submit" onClick={createProduct}>
          Create
        </button>
      </form>
    </div>
  );
};

export default CreateProduct;
