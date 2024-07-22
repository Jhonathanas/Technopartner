import React from "react";

const NavbarMenu = ({ categories }) => {
  return (
    <nav>
      <h1 className="text-center bg-gray-300 p-4 font-bold border border-y-black">
        Menu
      </h1>
      <ul className="flex justify-around p-4">
        {categories.map((c, index) => (
          <li
            key={index}
            className="font-semibold bg-slate-200  hover:bg-gray-200 p-2 rounded"
          >
            <a href={`#${c.category_name.replace(/\s+/g, '')}`} className="no-underline text-black">
              {c.category_name}</a>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default NavbarMenu;
