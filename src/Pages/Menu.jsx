import React, { useEffect, useState } from "react";
import axios from "axios";
import NavbarMenu from "../Components/NavbarMenu";

const Menu = ({ token }) => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.post(
          "https://soal.staging.id/api/menu",
          { show_all: "1" },
          {
            headers: {
              Authorization: `${token.token_type} ${token.access_token}`,
              "Content-Type": "application/json",
            },
          }
        );
        setData(response.data.result);
      } catch (error) {
        setError(error.response ? error.response.data : error.message);
      }
    };

    fetchData();
  }, [token]);

  if (error) {
    return <div>Error: {error.message || error}</div>;
  }

  if (!data) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <NavbarMenu categories={data.categories}/>
      <div className="p-4">
        {data.categories.map((category, index) => (
          <div key={index} className="mb-8" id={category.category_name  }>
            <h4 className="text-2xl font-semibold mb-4">
              {category.category_name}
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {category.menu.map((item, idx) => (
                <div key={idx} className="border rounded-lg p-4 shadow-md">
                  <img
                    src={item.photo}
                    alt={item.name}
                    className="w-full h-48 object-cover rounded-t-lg"
                  />
                  <div className="mt-4">
                    <h5 className="text-lg font-bold">{item.name}</h5>
                    <p className="text-gray-700">{item.description}</p>
                    <p className="text-indigo-600 font-semibold mt-2">
                      Price: {item.price}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default Menu;
