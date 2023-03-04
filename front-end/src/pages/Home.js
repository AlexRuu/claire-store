import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllProducts } from "../slices/productsSlice";
import HomeItem from "./Products/HomeItem";

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
        return <HomeItem key={item.id} {...item} />;
      })}
    </div>
  );
};

export default Home;
