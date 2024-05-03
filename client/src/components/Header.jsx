import React from "react";
import { FaSearch } from "react-icons/fa";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="bg-slate-200 shadow-md">
      <div className="flex justify-between p-3 items-center max-w-6xl mx-auto">
        <Link to="/">
          <h1 className="font-bold text-sm sm:text-xl ">
            <span className="bg-slate-500">Ashok</span>
            <span className="bg-slate-700">Estate</span>
          </h1>
        </Link>
        <form
          action=""
          className="flex bg-slate-100 rounded-lg items-center p-3"
        >
          <input
            type="text"
            placeholder="Search..."
            className="bg-transparent focus:outline-none w-24 sm:w-64"
          />
          <FaSearch className="text-slate-600" />
        </form>
        <ul className="flex gap-4">
          <Link to={"/"}>
            <li className="text-slate-700 hover:underline hidden sm:inline">
              Home
            </li>
          </Link>
          <Link to={"/about"}>
            <li className="text-slate-700 hover:underline hidden sm:inline">
              About
            </li>
          </Link>
          <Link to={"/sign-in"}>
            <li className="text-slate-700 hover:underline ">Signin</li>
          </Link>
        </ul>
      </div>
    </header>
  );
};

export default Header;
