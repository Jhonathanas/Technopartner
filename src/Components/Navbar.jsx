import React from "react";

const Navbar = ({ onLogOut }) => {
  return (
    <nav className="border-b-2 flex justify-between sticky top-0 bg-white align-middle">
      <img
        src="/src/assets/logo technopartner.png"
        alt=""
        className="w-32 m-3 "
      />
      <form onSubmit={onLogOut} className="flex">
        <button className="mr-10">Logout</button>
      </form>
    </nav>
  );
};

export default Navbar;
