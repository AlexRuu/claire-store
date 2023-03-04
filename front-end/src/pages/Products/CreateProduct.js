import React from "react";
import FormRow from "../../components/FormRow";

const CreateProduct = () => {
  return (
    <div>
      <h1>Add a New Product</h1>
      <form className="create-form">
        <FormRow name="name" type="text" />
      </form>
    </div>
  );
};

export default CreateProduct;
