import ReactPaginate from "react-paginate";

const Pagination = ({ pageCount, handlePageChange }) => {
  return (
    <ReactPaginate
      breakLabel="..."
      nextLabel="→"
      onPageChange={handlePageChange}
      pageRangeDisplayed={3}
      pageCount={pageCount}
      previousLabel="←"
      renderOnZeroPageCount={null}
      containerClassName="flex justify-center gap-2 cursor-pointer"
      pageClassName="px-3 py-1 border rounded text-blue-600 hover:bg-blue-100"
      activeClassName="bg-blue-500 text-white"
      previousClassName="px-3 py-1 border rounded hover:bg-blue-100"
      nextClassName="px-3 py-1 border rounded hover:bg-blue-100"
      breakClassName="px-3 py-1"
    />
  );
};

export default Pagination;
