"use client";
import React, { useState } from "react";
import Title from "../component/title/Title";
import ingredients from "../../../ingredients.json";
import Multiselect from "multiselect-react-dropdown";

const AddRecipe = () => {
  const [selection, setSelection] = useState({
    options: ingredients.map((ingredient) => ingredient.label),
    selectedIngredients: [],
  });

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
    console.log(formData);
    fetch("https://recipe-server-wine.vercel.app/recipes", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        alert("Recipe added")
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <div className="container mx-auto">
      <Title title="add recipe" />
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
          />
        </div>
        <div className="space-y-2">
          <label className="font-medium">Ingredients</label>
          <Multiselect
            isObject={false}
            options={selection.options}
            onSelect={handleSelect}
          />
        </div>
        <div className="space-y-2">
          <label className="font-medium">Instruction</label>
          <textarea
            className="border-[1px] border-gray-500 rounded-md p-3 w-full"
            name="instruction"
            required
            rows="5"
          ></textarea>
        </div>
        <div className="space-y-2">
          <input
            type="submit"
            value="add recipe"
            className="w-full py-3 bg-primary text-white font-bold rounded-md capitalize cursor-pointer"
          />
        </div>
      </form>
    </div>
  );
};

export default AddRecipe;
