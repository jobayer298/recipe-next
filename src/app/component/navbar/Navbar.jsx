import Link from "next/link";
import React from "react";
import data from "../../../../public/data/data.json";
import logo from "../../../../public/assets/image/Recipe_logo.jpeg"
import Image from "next/image";
const Navbar = () => {
  return (
    <div className="bg-slate-100 shadow-sm py-3">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/" className="h-16 w-16 rounded-full"><Image className="h-full w-full rounded-full" alt="recipe image" src={logo} /></Link>
        <ul className="flex items-center gap-5">
          {data.nav.map((item, index) => (
            <li key={index} className="font-medium capitalize">
              <Link href={item.url}>{item.text}</Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
