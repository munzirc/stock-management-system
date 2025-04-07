import React, { useContext, useState } from "react";
import { Context } from "../context/ContextApi";
import Sidebar from "../components/Sidebar";
import StockOverview from "../components/Tabs/StockOverview";
import ProductManagement from "../components/Tabs/ProductManagement";
import Analytics from "../components/Tabs/Analytics";
import Header from "../components/Header";
import MobileNavBar from "../components/MobileNavBar";

const Dashboard = () => {
  const { isAuthenticated } = useContext(Context);

  const [selectedTab, setSelectedTab] = useState("Stock Overview");

  const renderTabContent = () => {
    switch (selectedTab) {
      case "Stock Overview":
        return <StockOverview />;
      case "Product Management":
        return <ProductManagement />;
      case "Analytics":
        return <Analytics />;
      default:
        return <div></div>;
    }
  };

  return (
    <div className="min-h-screen ">
      <Header />
      <div className="flex relative bg-white"> 
        <Sidebar selectedTab={selectedTab} setSelectedTab={setSelectedTab} />
        <MobileNavBar selectedTab={selectedTab} setSelectedTab={setSelectedTab} />
        <div className="fixed right-0 bottom-0 top-[52px] left-0 sm:left-[230px] ">
          {renderTabContent()}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
