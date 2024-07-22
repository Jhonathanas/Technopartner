import React, { useEffect, useState } from "react";
import axios from "axios";

const Home = ({ token }) => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [showPopup, setShowPopup] = useState(false);
  const [currentBannerIndex, setCurrentBannerIndex] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("https://soal.staging.id/api/home", {
          headers: {
            Authorization: `${token.token_type} ${token.access_token}`,
          },
        });
        setData(response.data.result);
      } catch (error) {
        setError(error.response ? error.response.data : error.message);
      }
    };

    fetchData();
  }, [token]);

  useEffect(() => {
    if (data && data.banner) {
      const interval = setInterval(() => {
        setCurrentBannerIndex((prevIndex) => (prevIndex + 1) % data.banner.length);
      }, 2000); 
      return () => clearInterval(interval);
    }
  }, [data]);
  if (error) {
    return (
      <div className="text-red-500 text-center mt-4">
        Error: {error.message || error}
      </div>
    );
  }

  if (!data) {
    return <div className="text-center mt-4">Loading...</div>;
  }

  return (
    <div className="h-screen mx-auto p-4">
      {showPopup && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-4 rounded w-24 text-center">
            <p className="mb-4">Show the QR Code below to the cashier</p>
            <img className="w-32 h-32 mb-4" src={data.qrcode} alt="QR Code" />
            <button
              onClick={() => setShowPopup(false)}
              className="bg-blue-500 text-white px-4 py-2 rounded"
            >
              Close
            </button>
          </div>
        </div>
      )}
      <div className="bg-gray-300 rounded-full flex items-center justify-evenly align-middle">
        <div>
          <h4 className="text-2xl font-bold text-center mb-4 mt-5">
            {data.greeting}
          </h4>
          <h4 className="text-xl text-center mb-4">{data.name}</h4>
          <img
            className="w-32 h-32 mb-4 cursor-pointer"
            src={data.qrcode}
            alt="QR Code"
            onClick={() => setShowPopup(true)}
          />
        </div>
        <div className="flex flex-col items-center mb-8">
          <p className="text-lg">Saldo: {data.saldo}</p>
          <p className="text-lg">Points: {data.point}</p>
        </div>
      </div>
      <div className="flex justify-center m-10">
        <img
          className="p-2"
          src={data.banner[currentBannerIndex]}
          alt="Banner"
        />
      </div>
    </div>
  );
};

export default Home;
