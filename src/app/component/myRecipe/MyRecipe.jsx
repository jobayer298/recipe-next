"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { FaEdit, FaEye, FaTrash } from "react-icons/fa";
import Title from "../title/Title";

const MyRecipe = () => {
  const [recipeData, setRecipeData] = useState([]);
  useEffect(() => {
    fetch("https://recipe-server-wine.vercel.app/all-recipe")
      .then((res) => res.json())
      .then((data) => setRecipeData(data));
  }, []);
  const handleDelete = (id) => {
    fetch(`https://recipe-server-wine.vercel.app/recipe/${id}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.deletedCount > 0) {
          alert("Recipe deleted");
        }
      })
      .catch((error) => {
        console.log(error);
      });
    const updateRecipe = recipeData.filter((item) => item._id !== id);
    setRecipeData(updateRecipe);
  };
 const handleSearch = async (e) => {
   try {
     const title = e.target.value;
     if (!title) {
       const allRecipesResponse = await fetch(
         "https://recipe-server-wine.vercel.app/all-recipe"
       );
       const allRecipesData = await allRecipesResponse.json();
       setRecipeData(allRecipesData);
     } else {
       const response = await fetch(`https://recipe-server-wine.vercel.app/search/${title}`);
       if (response.ok) {
         const result = await response.json();
         if (result) {
           setRecipeData(result);
         }
       } else{
        console.log(response.status);
       }
     }
   } catch (error) {
     console.error(error);
   }
 };


  return (
    <div className="container mx-auto my-10">
      <Title title="My recipe" />
      <div className="w-1/2 mx-auto">
        <input
          className="border-[1px] border-gray-500 rounded-md p-2 w-full mb-5"
          type="text"
          placeholder="search by title"
          onChange={handleSearch}
        />
      </div>
      {recipeData.length !== 0 ? (
        <table className="w-full bg-white border rounded-lg shadow-md text-sm mb-9">
          <thead>
            <tr className="bg-gray-100 text-gray-700 font-semibold">
              <th className="py-2 px-4">Title</th>
              <th className="py-2 px-4">Price</th>
              <th className="py-2 px-4">Action</th>
            </tr>
          </thead>
          <tbody className="text-center">
            {recipeData.map((item) => (
              <tr
                key={item._id}
                className="border-b border-gray-200 hover:bg-gray-100"
              >
                <td className="py-2 px-4">{item.title}</td>
                <td className="py-2 px-4">{item.price}</td>
                <td className="py-2 px-4 flex items-center gap-4 text-[17px] justify-center">
                  <Link href={`/recipe/${item._id}`}>
                    <FaEye className="text-blue-500" />
                  </Link>
                  <Link href={`/update/${item._id}`}>
                    <FaEdit />
                  </Link>
                  <Link onClick={() => handleDelete(item._id)} href="/">
                    <FaTrash className="text-red-500" />
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <h1 className="text-red-500 font-bold text-3xl text-center">
          there is no recipe
        </h1>
      )}
    </div>
  );
};

export default MyRecipe;
