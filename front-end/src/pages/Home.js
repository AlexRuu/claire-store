import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllProducts } from "../slices/productsSlice";

const Home = () => {
  const { items } = useSelector((store) => store.products);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllProducts());
    // eslint-disable-next-line
  }, []);

  return (
    <div>
      {items.map((item) => {
        return <h1>{item.name}</h1>;
      })}
    </div>
  );
};

export default Home;
