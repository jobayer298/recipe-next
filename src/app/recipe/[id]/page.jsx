"use client";
import { useEffect, useState } from "react";
import Title from "../../component/title/Title";

const SingleRecipe = ({ params }) => {
  const [data, setData] = useState({});
  useEffect(() => {
    fetch(`https://recipe-server-wine.vercel.app/recipe/${params.id}`)
      .then((res) => res.json())
      .then((data) => setData(data));
  }, []);
  console.log(data);
  return (
    <div className="container mx-auto">
      <Title title="Recipe Details" />
      <div className="w-1/2 mx-auto shadow-md rounded-md p-10 my-10 font-bold capitalize">
        <h1 className="text-[17px] text-gray-600 mb-3">
          <span className="text-md text-primary">Name:</span> {data.title}
        </h1>
        <p className="text-[17px] text-gray-600 mb-3">
          <span className="text-md text-primary">price:</span> {data.price} tk
        </p>
        <ul className="text-[17px] text-gray-600 mb-3">
          <span className="text-md text-primary">Ingredients:</span>
          {data.ingredients.map((item, index) => (
            <li key={item}>
              {(index += 1)}. {item}
            </li>
          ))}
        </ul>
        <p className="text-[17px] text-gray-600 mb-3">
          <span className="text-md text-primary">instruction:</span>{" "}
          {data.instruction}
        </p>
      </div>
    </div>
  );
};

export default SingleRecipe;
