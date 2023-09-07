import React from "react";
import { Link } from "react-router-dom";
import ".././App.css";

const Header = () => {
  return (
    <header
      style={{
        background: "transparent",
        borderBottomWidth: "1px",
        borderColor: "#a80000",
      }}
      className="w-full flex flex-row justify-between h-16 pt-0 mt-0 pb-0 mb-6 pl-6 pr-6"
    >
      <div className="w-2/3 h-full flex flex-row justify-center items-center">
        <div className="w-5/6 h-full">
          <Link
            to="/"
            className="flex flex-row items-center justify-left p-0 m-0 h-full"
          >
            <div className="p-0 m-0 h-full">
              <img
                alt="company logo"
                className="h-full object-contain"
                src="/logo.png"
              />
            </div>
            <h1>The Daily Noodle</h1>
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
