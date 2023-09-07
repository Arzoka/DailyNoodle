import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom"; // Import Link from react-router-dom
import axios from "axios";
import "../App.css";

const SideBar = ({ takeOutItemId, Page }) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://notuko.com/dailynoodle_API/index.php",
          {}
        );
        let current_data = response.data;
        console.log(takeOutItemId);
        current_data.splice(takeOutItemId, 1);
        console.log(current_data.length);
        setData(current_data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  switch (Page) {
    case "Home":
      return (
        <section className="w-1/3 min-h-screen gap-2 flex flex-col items-center">
          <ul className="flex flex-col items-center justify-center p-0 m-0 gap-6 w-full">
            {data.map((article) => (
              <Link
                style={{ backgroundImage: `url(${article.image})` }}
                to={`/articles/${article.id}`}
                key={article.id}
                className="w-5/6 aspect-video bg-gray-300 p-0 m-0 bg-cover flex flex-col justify-end items-center"
              >
                <div
                  style={{ background: "#00000050" }}
                  className="flex flex-col items-start justify-center gap-1 w-full"
                >
                  <h3 className="text-white font-bold">{article.title}</h3>
                  <h3 className="text-white">{article.date}</h3>
                </div>
              </Link>
            ))}
          </ul>
        </section>
      );

    case "Article":
      return (
        <>
          <h2>Other news</h2>
          <section className="w-full gap-2 flex flex-row items-center pt-10 ">
            <ul className="flex flex-row items-center justify-center p-0 m-0 gap-6 w-full overflow-x-scroll">
              {data.map((article) => (
                <Link
                  style={{ backgroundImage: `url(${article.image})` }}
                  to={`/articles/${article.id}`}
                  key={article.id}
                  className="w-full aspect-video bg-gray-300 p-0 m-0 bg-cover flex flex-col justify-end items-center"
                >
                  <div
                    style={{ background: "#00000050" }}
                    className="flex flex-col items-start justify-center gap-1 w-full"
                  >
                    <h3 className="text-white font-bold">{article.title}</h3>
                    <h3 className="text-white">{article.date}</h3>
                  </div>
                </Link>
              ))}
            </ul>
          </section>
        </>
      );
    default:
      break;
  }
};

export default SideBar;
