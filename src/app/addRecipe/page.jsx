"use client";
import React, { useState } from "react";
import Title from "../component/title/Title";
import ingredients from "../../../ingredients.json";
import Multiselect from "multiselect-react-dropdown";

const AddRecipe = () => {
  const [titleError, setTitleError] = useState(false);
  const [priceError, setPriceError] = useState(false);
  const [instructionError, setInstructionError] = useState(false);
  const [ingredientError, setIngredientError] = useState(false);
  const alphabetRegex = /^[a-zA-Z\s]+$/;
  const instructionRegex = /^[a-zA-Z\s.,?]{1,400}$/;
  const [selection, setSelection] = useState({
    options: ingredients.map((ingredient) => ingredient.label),
    selectedIngredients: [],
  });

  const handleSelect = (selectedList) => {
    setSelection((prevSelection) => ({
      ...prevSelection,
      selectedIngredients: selectedList,
    }));
    setIngredientError(false);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (selection.selectedIngredients.length === 0) {
      setIngredientError(true);
      return;
    } else {
      setIngredientError(false);
    }
    if (titleError || priceError || instructionError || ingredientError) {
      alert("provide valid input")
      return;
    }
    const price = e.target.price.value;
    const title = e.target.title.value;
    const instruction = e.target.instruction.value;
    const formData = {
      price,
      title,
      instruction,
      ingredients: selection.selectedIngredients,
    };
    e.target.reset();
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
        alert("Recipe added");
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const handleTitleError = (e) => {
    const value = e.target.value;
    if (!value.match(alphabetRegex)) {
      setTitleError(true);
    } else setTitleError(false);
  };
  const handPriceError = (e) => {
    const value = e.target.value;
    if (value < 1) {
      setPriceError(true);
    } else {
      setPriceError(false);
    }
  };
  const handleInstructionError = (e) => {
    const value = e.target.value;
    if (!value.match(instructionRegex)) {
      setInstructionError(true);
    } else setInstructionError(false);
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
            onChange={handleTitleError}
          />
          <br />
          {titleError && (
            <p className="text-red-600 text-sm mt-2 font-bold">
              Give a valid title
            </p>
          )}
        </div>
        <div className="space-y-2">
          <label className="font-medium">Price</label>
          <input
            className="border-[1px] border-gray-500 rounded-md p-3 w-full"
            type="number"
            placeholder="price"
            name="price"
            min={1}
            required
            onChange={handPriceError}
          />
          <br />
          {priceError && (
            <p className="text-red-600 text-sm mt-2 font-bold">
              Give a valid price
            </p>
          )}
        </div>
        <div className="space-y-2">
          <label className="font-medium">Ingredients</label>
          <Multiselect
            isObject={false}
            options={selection.options}
            onSelect={handleSelect}
          />
          {ingredientError && (
            <p className="text-red-600 text-sm mt-2 font-bold">
              Please select at least one ingredient.
            </p>
          )}
        </div>
        <div className="space-y-2">
          <label className="font-medium">Instruction</label>
          <textarea
            className="border-[1px] border-gray-500 rounded-md p-3 w-full"
            name="instruction"
            required
            rows="5"
            onChange={handleInstructionError}
          ></textarea>
          {instructionError && (
            <p className="text-red-600 text-sm mt-2 font-bold">
              instruction should be in 400 character maximum
            </p>
          )}
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
