"use client";
import { useState, useEffect } from "react";

export const useRecipeData = () => {
  const [reciPeData, setRecipeData] = useState([]);

  useEffect(() => {
    fetch("https://recipe-server-wine.vercel.app/all-recipe")
      .then((response) => {
        return response.json();
      })
      .then((jsonData) => {
        setData(jsonData);
      })
      .catch((error) => {
        console.error("Error fetching recipe data:", error);
      });
  }, []);

  return { reciPeData, setRecipeData };
};
