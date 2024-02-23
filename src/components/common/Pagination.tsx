import { ChevronLeft, ChevronRight } from "lucide-react";
import React, { useEffect, useState } from "react";

const Pagination = ({
  totalPage,
  currentPage,
  setCurrentPage,
}: {
  totalPage: number | undefined;
  currentPage: number;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
}) => {
  const [itPageNum, setItPageNum] = useState<number[]>([]);

  useEffect(() => {
    totalPage &&
      setItPageNum(() =>
        Array.from({ length: totalPage }, (_, index) => index + 1)
      );
  }, []);
  return (
    <nav
      aria-label="Page navigation example"
      className="flex justify-center my-5"
    >
      <ul className="flex items-center -space-x-px h-8 text-sm">
        <li>
          <button
            type="button"
            className={`${
              currentPage == 1 ? "opacity-50 cursor-not-allowed" : ""
            } flex items-center justify-center px-3 h-8 ms-0 leading-tight text-gray-500 bg-white border border-e-0 border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white`}
            disabled={currentPage === 1}
            onClick={() => setCurrentPage(currentPage - 1)}
          >
            <span className="sr-only">Previous</span>
            <ChevronLeft />
          </button>
        </li>

        {itPageNum.map((page) => {
          return (
            <li key={page}>
              <button
                className={`flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700  dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white ${
                  currentPage === page ? "dark:bg-gray-700" : "dark:bg-gray-800"
                }`}
                onClick={() => setCurrentPage(page)}
              >
                {page}
              </button>
            </li>
          );
        })}

        <li>
          <button
            className={`${
              currentPage == totalPage ? "opacity-50 cursor-not-allowed" : ""
            } flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white`}
            onClick={() => setCurrentPage(currentPage + 1)}
            disabled={currentPage === totalPage}
          >
            <span className="sr-only">Next</span>
            <ChevronRight />
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default Pagination;
