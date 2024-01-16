import Link from 'next/link';
import React from 'react';
import { FaEdit, FaEye, FaTrash } from "react-icons/fa";
import data from "../../../../public/data/data.json"

const MyRecipe = () => {
    return (
      <div className="container mx-auto my-10">
        <h1 className="text-center text-3xl font-bold">My recipe</h1>
        <table className="w-full bg-white border rounded-lg shadow-md text-sm my-9">
          <thead>
            <tr className="bg-gray-100 text-gray-700 font-semibold">
              <th className="py-2 px-4">Image</th>
              <th className="py-2 px-4">Title</th>
              <th className="py-2 px-4">Price</th>
              <th className="py-2 px-4">Action</th>
            </tr>
          </thead>
          <tbody className="text-center">
            {data.recipe.map((item) => (
              <tr
                key={item.id}
                className="border-b border-gray-200 hover:bg-gray-100"
              >
                <td className="py-2 px-4">{item.image}</td>
                <td className="py-2 px-4">{item.title}</td>
                <td className="py-2 px-4">{item.price}</td>
                <td className="py-2 px-4 flex items-center gap-4 text-[17px] justify-center">
                  <Link href={`/recipe/${item.id}`}>
                    <FaEye className="text-blue-500" />
                  </Link>
                  <Link href="/">
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