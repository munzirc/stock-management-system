import React from "react";
import Inventory2Icon from "@mui/icons-material/Inventory2";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import AssessmentIcon from "@mui/icons-material/Assessment";
import clsx from "clsx";

const MobileNavBar = ({ selectedTab, setSelectedTab }) => {
  const tabs = [
    { label: "Stock Overview", icon: <Inventory2Icon /> },
    { label: "Product Management", icon: <ShoppingCartIcon /> },
    { label: "Analytics", icon: <AssessmentIcon /> },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-[#F5F7FF] border-t sm:hidden shadow-md">
      <nav className="flex justify-around items-center py-2">
        {tabs.map((tab) => (
          <button
            key={tab.label}
            onClick={() => setSelectedTab(tab.label)}
            className={clsx(
              "flex flex-col items-center text-sm px-2 py-1",
              selectedTab === tab.label ? "text-[#4B49AC]" : "text-[#626c8d]"
            )}
          >
            <span>{tab.icon}</span>
            <span>{tab.label.split(" ")[0]}</span>
          </button>
        ))}
      </nav>
    </div>
  );
};

export default MobileNavBar;
