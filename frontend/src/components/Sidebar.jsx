import React, { useState } from "react";
import Inventory2Icon from "@mui/icons-material/Inventory2";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import AssessmentIcon from "@mui/icons-material/Assessment";
import clsx from "clsx";

const Sidebar = ({ selectedTab, setSelectedTab }) => {
  const tabs = [
    { label: "Stock Overview", icon: <Inventory2Icon /> },
    { label: "Product Management", icon: <ShoppingCartIcon /> },
    { label: "Analytics", icon: <AssessmentIcon /> },
  ];

  return (
    <div className="hidden flex-col sm:flex fixed top-[68px] bottom-4 left-4 bg-[#F5F7FF] rounded-lg text-[#626c8d]  shadow-[-10_10_10px_rgba(0,0,0,0.1)]">
      <nav className="p-4 space-y-2">
        {tabs.map((tab) => (
          <div
            key={tab.label}
            onClick={() => setSelectedTab(tab.label)}
            className={clsx(
              "flex items-center cursor-pointer hover:bg-[#4B49AC] p-2 rounded hover:text-white",
              selectedTab === tab.label && "bg-[#4B49AC] text-white"
            )}
          >
            <span className="mr-3">{tab.icon}</span>
            <span className="text-sm">{tab.label}</span>
          </div>
        ))}
      </nav>
    </div>
  );
};

export default Sidebar;
