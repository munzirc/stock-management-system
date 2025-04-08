import React, { useContext, useEffect, useState } from "react";
import { getAllCategories, getAllProducts } from "../../services/product.api";
import { Box } from "@mui/material";
import ProductCard from "../Cards/ProductCard";
import { Context } from "../../context/ContextApi";
import ProductModal from "../Modal/ProductModal";
import Pagination from "../Pagination";
import DeleteConfirmModal from "../Modal/DeleteConfirm";
import CircularProgress from "@mui/material/CircularProgress";
import ReportDownloadButtons from "../Buttons/ReportDownloadButtons";
import ProductFilter from "../Filters/ProductFilter";
import AddProductButton from "../Buttons/AddProductButton";
import MobileAddButton from "../Buttons/MobileAddButton";
import MobileProductFilter from "../Filters/MobileProductFilter";
import ToggleFilter from "../Filters/ToggleFilter";

const ProductManagement = () => {
  const [filters, setFilters] = useState({
    category: "",
    keyword: "",
    minPrice: 0,
    maxPrice: 100000,
    page: 1,
    limit: 12,
  });

  const { setOpen, setMode, setActiveProduct, setModalOpen } =
    useContext(Context);

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState([]);
  const [totalPages, setTotalPages] = useState(0);

  const handlePriceChange = (event, newValue) => {
    setFilters({ ...filters, minPrice: newValue[0], maxPrice: newValue[1] });
  };

  const fetchProducts = async (filters) => {
    try {
      setLoading(true);
      const data = await getAllProducts(filters);
      setProducts(data.products || []);
      setTotalPages(data.totalPages);
      setFilters({ ...filters, page: data.currentPage });
    } catch (error) {
      console.error("Error fetching products:", error.message);
    } finally {
      setLoading(false);
    }
  };

  const fetchCategories = async () => {
    try {
      const data = await getAllCategories();
      setCategories(data || []);
    } catch (error) {
      console.error("Error fetching products:", error.message);
    }
  };

  const handleAddProduct = () => {
    setMode("create");
    setOpen(true);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFilters({ ...filters, [name]: value });
  };

  const handleClear = () => {
    const clearedFilters = {
      category: "",
      keyword: "",
      minPrice: 0,
      maxPrice: 100000,
      page: 1,
      limit: 12,
    };
    setFilters(clearedFilters);
    fetchProducts(clearedFilters);
  };

  useEffect(() => {
    document.title = "Product Management";
    fetchProducts(filters);
    fetchCategories();
  }, []);

  const applyFilters = () => {
    fetchProducts(filters);
  };

  const handleUpdate = async (product) => {
    setMode("update");
    setActiveProduct(product);
    setOpen(true);
  };

  const handleDelete = async (product) => {
    setActiveProduct(product);
    setModalOpen(true);
  };

  useEffect(() => {
    fetchProducts(filters);
  }, [filters.page]);

  const handlePageChange = (e) => {
    setFilters({ ...filters, page: e.selected + 1 });
  };

  return (
    <div className="w-full pb-[68px] sm:p-4 h-full flex flex-col relative">
      <div className="flex flex-row sm:gap-5 md:flex-row bg-[#F5F7FF] sm:rounded-t-lg flex-1 p-4 relative">
        <div className="flex flex-col pt-4 sm:pt-0 sm:gap-4 lg:gap-0 lg:flex-row lg:items-center relative">
          {/*Buttons *******************************************************88888 */}
          <ReportDownloadButtons />
          <AddProductButton handleAddProduct={handleAddProduct} />
          <MobileAddButton handleAddProduct={handleAddProduct} />
        </div>

        {/* Mobile Filter */}
        <MobileProductFilter
          handleChange={handleChange}
          handlePriceChange={handlePriceChange}
          handleClear={handleClear}
          filters={filters}
          categories={categories}
          applyFilters={applyFilters}
        />
        <ToggleFilter
          handleChange={handleChange}
          handlePriceChange={handlePriceChange}
          handleClear={handleClear}
          filters={filters}
          categories={categories}
          applyFilters={applyFilters}
        />
      </div>

      {/* Filters */}
      <div className="hidden lg:flex w-full flex-1 items-center px-2 md:px-6 bg-[#F5F7FF] border-b-2 border-gray-300 shadow-[0_4px_6px_-1px_rgba(0,0,0,0.1)]">
        <ProductFilter
          handleChange={handleChange}
          handlePriceChange={handlePriceChange}
          handleClear={handleClear}
          filters={filters}
          categories={categories}
          applyFilters={applyFilters}
        />
      </div>
      {/* Proucts cards */}
      <div className="flex-9 bg-[#F5F7FF] rounded-b-lg relative overflow-auto">
        <>
          {loading ? (
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "100%",
                width: "100%",
              }}
            >
              <CircularProgress />
            </Box>
          ) : products.length > 0 ? (
            <div className="grid gap-4 p-4 sm:gap-6 sm:p-6 bg-[#F5F7FF]  sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
              {products.map((product) => (
                <ProductCard
                  key={product._id}
                  product={product}
                  onUpdate={handleUpdate}
                  onDelete={handleDelete}
                />
              ))}
            </div>
          ) : (
            <div className="w-full h-full flex items-center justify-center text-3xl font-bold">
              <span>No products Available!</span>
            </div>
          )}
        </>
      </div>
      <div className="flex-1 flex items-center justify-center bottom-0 left-0 right-0 bg-[#F5F7FF] sm:rounded-b-lg">
        <Pagination
          pageCount={totalPages}
          handlePageChange={handlePageChange}
        />
      </div>
      <ProductModal
        categories={categories}
        products={products}
        setProducts={setProducts}
      />
      <DeleteConfirmModal setProducts={setProducts} />
    </div>
  );
};

export default ProductManagement;
