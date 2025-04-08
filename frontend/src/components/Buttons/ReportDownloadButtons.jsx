import React, { useContext, useState } from "react";
import {
  downloadProductReport,
  downloadSalesReport,
} from "../../services/report.api";
import { Context } from "../../context/ContextApi";
import CircularProgress from "@mui/material/CircularProgress";
import Inventory2Icon from "@mui/icons-material/Inventory2";
import InsertChartIcon from "@mui/icons-material/InsertChart";

const ReportDownloadButtons = () => {
  const [downloading, setDownloading] = useState({
    product: false,
    sales: false,
  });

  const { showSnackbar } = useContext(Context);

  const handleDownload = async (type) => {
    setDownloading((prev) => ({ ...prev, [type]: true }));

    try {
      const response =
        type === "product"
          ? await downloadProductReport()
          : await downloadSalesReport();

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const filename =
        type === "product" ? "products_report.csv" : "sales_report.csv";

      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", filename);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      showSnackbar({
        message: error.message || "Failed to download report",
        severity: error.severity || "error",
      });
      console.error(error);
    } finally {
      setDownloading((prev) => ({ ...prev, [type]: false }));
    }
  };

  return (
    <div className="flex flex-col gap-4 lg:flex-row lg:p-4 ">
      <button
        onClick={() => handleDownload("product")}
        disabled={downloading.product}
        className={`px-4 py-2 max-w-fit rounded-lg text-white text-xs sm:text-sm font-semibold flex items-center justify-center transition  ${
          downloading.product
            ? "bg-gray-400 cursor-not-allowed"
            : "bg-green-600 hover:bg-green-700"
        }`}
      >
        {downloading.product ? (
          <>
            <CircularProgress size={16} color="inherit" />
            Downloading...
          </>
        ) : (
          <>
            <Inventory2Icon fontSize="small" />
            Download Product Report
          </>
        )}
      </button>

      <button
        onClick={() => handleDownload("sales")}
        disabled={downloading.sales}
        className={`px-4 py-2 max-w-fit rounded-lg text-white text-xs sm:text-sm font-semibold flex items-center justify-center transition ${
          downloading.sales
            ? "bg-gray-400 cursor-not-allowed"
            : "bg-blue-600 hover:bg-blue-700"
        }`}
      >
        {downloading.sales ? (
          <>
            <CircularProgress size={16} color="inherit" />
            Downloading...
          </>
        ) : (
          <>
            <InsertChartIcon fontSize="small" />
            Download Sales Report
          </>
        )}
      </button>
    </div>
  );
};

export default ReportDownloadButtons;
