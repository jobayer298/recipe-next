"use client";
import Link from "next/link";
import React from "react";
import { FaEdit, FaEye, FaTrash } from "react-icons/fa";
import Title from "../title/Title";

async function getRecipeData() {
  const res = await fetch("http://localhost:5000/all-Recipe", {
    next: { revalidate: 1000 },
  });
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return res.json();
}

const MyRecipe = async () => {
  const myData = await getRecipeData();
  return (
    <div className="container mx-auto my-10">
      <Title title="My recipe" />
      <table className="w-full bg-white border rounded-lg shadow-md text-sm mb-9">
        <thead>
          <tr className="bg-gray-100 text-gray-700 font-semibold">
            <th className="py-2 px-4">Title</th>
            <th className="py-2 px-4">Price</th>
            <th className="py-2 px-4">Action</th>
          </tr>
        </thead>
        <tbody className="text-center">
          {myData.map((item) => (
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
                <Link href="/">
                  <FaTrash className="text-red-500" />
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default MyRecipe;
