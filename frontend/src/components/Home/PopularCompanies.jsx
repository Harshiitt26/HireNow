import React from "react";
import { FaMicrosoft, FaApple } from "react-icons/fa";
import { SiTesla } from "react-icons/si";

const PopularCompanies = () => {
  const companies = [
    {
      id: 1,
      title: "Google",
      location: "",
      openPositions: 16,
      icon: <FaMicrosoft />,
    },
    {
      id: 2,
      title: "Microsoft",
      location: "",
      openPositions: 12,
      icon: <SiTesla />,
    },
    {
      id: 3,
      title: "Facebook",
      location: "",
      openPositions: 18,
      icon: <FaApple />,
    },
  ];
  return (
    <div className="companies">
      <div className="container">
        <h3>TOP COMPANIES</h3>
        <div className="banner">
          {companies.map((element) => {
            return (
              <div className="card" key={element.id}>
                <div className="content">
                  <div className="icon">{element.icon}</div>
                  <div className="text">
                    <p>{element.title}</p>
                    <p>{element.location}</p>
                  </div>
                </div>
                <button>{element.openPositions} Open Positions</button>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default PopularCompanies;