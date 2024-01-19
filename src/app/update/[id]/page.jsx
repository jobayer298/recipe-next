"use client";
import React, { useEffect, useState } from "react";
import ingredients from "../../../../ingredients.json";
import Multiselect from "multiselect-react-dropdown";
import Title from "../../../app/component/title/Title";

// const getData = async (params) => {
//   const response = await fetch(`http://localhost:5000/recipe/${params.id}`);
//   return response.json();
// };

const UpdatePage = ({ params }) => {
  const [data, setData] = useState({});
  const [selection, setSelection] = useState({
    options: ingredients.map((ingredient) => ingredient.label),
    selectedIngredients: [],
  });
  useEffect(() => {
    fetch(`http://localhost:5000/recipe/${params.id}`)
      .then((res) => res.json())
      .then((data) => setData(data));
  }, []);
  const handleSelect = (selectedList) => {
    setSelection((prevSelection) => ({
      ...prevSelection,
      selectedIngredients: selectedList,
    }));
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const price = e.target.price.value;
    const title = e.target.title.value;
    const instruction = e.target.instruction.value;
    const formData = {
      price,
      title,
      instruction,
      ingredients: selection.selectedIngredients,
    };
    fetch(`http://localhost:5000/recipe/${params.id}`, {
      method: "put",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.modifiedCount > 0) {
          alert("Recipe updated");
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <div className="container mx-auto">
      <Title title="update recipe" />
      <form
        onSubmit={handleSubmit}
        className="w-1/2 mx-auto shadow-lg p-10 space-y-3"
      >
        <div className="space-y-2">
          <label className="font-medium">Title</label>
          <input
            className="border-[1px] border-gray-500 rounded-md p-3 w-full"
            type="text"
            placeholder="title of recipe"
            name="title"
            required
            defaultValue={data.title}
          />
        </div>
        <div className="space-y-2">
          <label className="font-medium">Price</label>
          <input
            className="border-[1px] border-gray-500 rounded-md p-3 w-full"
            type="number"
            placeholder="price"
            name="price"
            required
            defaultValue={data.price}
          />
        </div>
        <div className="space-y-2">
          <label className="font-medium">Ingredients</label>
          <Multiselect
            isObject={false}
            options={selection.options}
            onSelect={handleSelect}
            selectedValues={data.ingredients}
          />
        </div>
        <div className="space-y-2">
          <label className="font-medium">Instruction</label>
          <textarea
            className="border-[1px] border-gray-500 rounded-md p-3 w-full"
            name="instruction"
            required
            rows="5"
            defaultValue={data.instruction}
          ></textarea>
        </div>
        <div className="space-y-2">
          <input
            type="submit"
            value="add update"
            className="w-full py-3 cursor-pointer bg-primary text-white font-bold rounded-md capitalize"
          />
        </div>
      </form>
    </div>
  );
};

export default UpdatePage;
