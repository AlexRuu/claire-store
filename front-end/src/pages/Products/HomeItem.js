import React from "react";

const HomeItem = ({ name, price, image }) => {
  return (
    <div>
      <img src={image[0]} alt={name} width="250px" />
      <h3>{name}</h3>
      <h4>C${price.toFixed(2)}</h4>
      <button>Buy Now</button>
    </div>
  );
};

export default HomeItem;
