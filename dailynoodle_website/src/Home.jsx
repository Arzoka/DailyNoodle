import React, { useEffect, useState } from "react";
import { Link, json } from "react-router-dom"; // Import Link from react-router-dom
import axios from "axios";
import "./App.css";
import colors from "./colors.json";
import Header from "./components/header";
import SideBar from "./components/sidebar";

const Work = () => {
  const [data, setData] = useState([]);
  const [latestData, setLatestData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://notuko.com/dailynoodle_API/index.php",
          {}
        );

        if (response.data.length > 0) {
          let latest = response.data.pop();
          setLatestData(latest);
          setData(response.data);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        console.log(data);
        console.log(latestData);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <Header />
      <figure className="w-full flex flex-row pl-6 pr-6">
        <div className="w-2/3 flex flex-row justify-center items-center">
          <div className="w-5/6">
            <h2 className="text-xl font-bold">Latest news</h2>
          </div>
        </div>
        <div className="w-1/3 flex flex-row justify-center items-center">
          <div className="w-5/6">
            <h2 className="text-xl font-bold">Other news</h2>
          </div>
        </div>
      </figure>
      <main className="w-full flex flex-row pl-6 pr-6 pb-6 pt-6">
        <section className="w-2/3 min-h-screen gap-2 flex flex-col items-center ">
          <Link
            style={{ backgroundImage: `url(${latestData.image})` }}
            to={`/articles/${latestData.id}`}
            key={latestData.id}
            className="w-5/6 aspect-video p-0 m-0 bg-cover flex flex-col justify-end items-center bg-gray-300"
          >
            <div
              style={{ background: "#00000050" }}
              className="flex flex-col items-start justify-center gap-1 w-full"
            >
              <h3 className="text-white font-bold">{latestData.title}</h3>
              <h3 className="text-white">{latestData.date}</h3>
            </div>
          </Link>
        </section>
        <SideBar takeOutItemId={latestData.id - 1} Page="Home" />
      </main>
    </>
  );
};

export default Work;
