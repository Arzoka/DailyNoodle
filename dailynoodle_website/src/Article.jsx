import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Header from "./components/header";
import colors from "./colors.json";
import SideBar from "./components/sidebar";

const ArticleDetail = () => {
  const { id } = useParams();
  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    const fetchItemData = async () => {
      try {
        const response = await axios.get(
          `https://notuko.com/dailynoodle_API/index.php?id=${id}`,
          {}
        );
        setItem(response.data[0]);
        if (response.data[0] !== undefined) {
          setTimeout(() => {
            setLoading(false);
          }, 500);
        } else {
          setTimeout(() => {
            setNotFound(true);
          }, 500);
        }
      } catch (error) {
        console.error("Error fetching item data:", error);
      }
    };

    fetchItemData();
  }, [id]);

  if (loading) {
    return (
      <div className="h-screen flex flex-col">
        <Header />
        <div className="-z-10 absolute w-full h-full flex flex-col gap-6 justify-center items-center">
          <img
            className="w-36 aspect-square object-fit"
            alt="logo"
            src="/logo.png"
          ></img>
          <h2>{notFound === true ? "Page not found!" : "Loading..."}</h2>
        </div>
      </div>
    );
  }

  return (
    <div>
      <Header colors={colors} pagename={"work"} />
      <div className="pl-6 pr-6 pb-6 flex flex-col gap-2">
        <figure
          style={{ backgroundImage: `url(${item.image})` }}
          key={item.id}
          className="w-3/6 aspect-video p-0 m-0 bg-cover flex flex-col justify-end items-center bg-gray-300"
        ></figure>

        <h1 className="font-bold text-3xl">{item.title}</h1>
        <h2 className="text-sm opacity-75">
          Posted {item.date} by {item.author}
        </h2>

        <h3 className="mt-6">{item.desc}</h3>
        <SideBar takeOutItemId={item.id - 1} Page={"Article"} />
      </div>
    </div>
  );
};

export default ArticleDetail;
