import { Search } from "lucide-react";
import Navbar from "../../components/admin/Navbar";
import SideBar from "../../components/admin/SideBar";
import { useEffect, useState } from "react";
import { adminAxios } from "../../constraints/axios/adminAxios";
import adminApi from "../../constraints/api/adminApi";
import Loader from "../../components/common/Loader";
import Swal from "sweetalert2";
import { DriverData } from "../../interface/driver/driverInterface";
import Pagination from "../../components/common/Pagination";

const Drivers = () => {
  const [drivers, setDrivers] = useState<DriverData[]>([]);
  const [totalPage, setTotalPage] = useState<number>();
  // const [itPageNum, setItPageNum] = useState<number[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(true);
  const [searchQuery, setSearchQuery] = useState<string>();
  const [searchTPage, setSearchTpage] = useState<number>();
  const [searchCpage, setSearchCpage] = useState<number>(1);
  // const changePage = (page: number) => {
  //   setCurrentPage(() => page);
  // };

  const changeSearchQuery = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const handleSearch = async () => {
    try {
      if (!searchQuery) return;
      const res = await adminAxios.get(
        `${adminApi.searchDriver}?search=${searchQuery}&&?page=${searchCpage}`
      );
      const { driver, totalPage } = res.data;
      console.log({driver})
      setDrivers(() => driver);
      setSearchTpage(() => totalPage);
    } catch (error) {
      console.log(error);
    }
  };

  const handleBlock = async (id: string, isBlocked: boolean) => {
    Swal.fire({
      title: `Are you sure want to ${isBlocked ? "unblock" : "block"}?`,
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        await adminAxios.put(`${adminApi.blockDriver}/${id}`);
        Swal.fire({
          title: `${isBlocked ? "unblocked" : "Blocked"}`,
          // text: "Your file has been deleted.",
          icon: "success",
        });
        setDrivers((prev) =>
          prev.map((user) =>
            user._id === id ? { ...user, isBlocked: !user.isBlocked } : user
          )
        );
      }
    });
  };
  useEffect(() => {
    async function fetchUsers() {
      try {
        setLoading(true);
        const data = await adminAxios.get(
          `${adminApi.getDrivers}?page=${currentPage}`
        );
        setDrivers(() => data.data.drivers);
        setTotalPage(() => data.data.totalPage);
        // totalPage &&
        //   setItPageNum(() =>
        //     Array.from({ length: totalPage }, (_, index) => index + 1)
        //   );
      } catch (error) {
        console.log((error as Error).message);
      } finally {
        setLoading(false);
      }
    }
    fetchUsers();
  }, [currentPage, totalPage, currentPage]);

  return (
    <>
      <Navbar />
      <div className="flex overflow-y-hidden">
        <SideBar />
        <div className="bg-hover w-full flex flex-col gap-y-5">
          <div className="md:p-5 mx-2">
            <h1 className="font-bold text-4xl">Drivers</h1>
          </div>
          <div className="mx-2 flex items-center gap-x-5">
            <div className="flex items-center bg-white p-3 rounded-lg">
              <input
              className="outline-none"
                type="search"
                placeholder="search..."
                onChange={changeSearchQuery}
                value={searchQuery}
              />
              <button onClick={handleSearch}>
                <Search />
              </button>
            </div>
            {/* <div>
              <select className="p-3 px-5 rounded-lg" name="status" id="status">
                <option value="">Status</option>
                <option value="blocked">Blocked</option>
                <option value="active">Active</option>
              </select>
            </div> */}
          </div>
          <div className="bg-white h-[100vh] mx-2 rounded-md p-10 flex justify-center ">
            {loading ? (
              <Loader />
            ) : (
              <div className="relative overflow-x-auto shadow-md sm:rounded-lg h-fit">
                <table className="w-full text-sm text-left rtl:text-right text-gray-500 ">
                  <thead className="text-xs text-black uppercase bg-secondary ">
                    <tr>
                      <th scope="col" className="px-6 py-3">
                        Sr.No.
                      </th>
                      <th scope="col" className="px-6 py-3">
                        Name
                      </th>
                      <th scope="col" className="px-6 py-3">
                        Mobile
                      </th>
                      <th scope="col" className="px-6 py-3">
                        Email
                      </th>
                      <th scope="col" className="px-6 py-3">
                        Cab Model
                      </th>
                      <th scope="col" className="px-6 py-3">
                        Total Trips
                      </th>
                      <th scope="col" className="px-6 py-3">
                        <span className="sr-only">Edit</span>
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {drivers.map((driver, index) => {
                      return (
                        <tr
                          key={driver._id}
                          className="bg-white border-b   text-black hover:bg-gray-600 hover:text-white"
                        >
                          <td className="px-6 py-4">{index + 1}</td>

                          <th
                            scope="row"
                            className="px-6 py-4 font-medium  whitespace-nowrap "
                          >
                            {driver.firstName + " " + driver.lastName}
                          </th>
                          <td className="px-6 py-4">
                            {driver.mobile
                              ? driver.mobile
                              : "Mobile Not provided"}
                          </td>
                          <td className="px-6 py-4">{driver.email}</td>
                          <td className="px-6 py-4">
                            {driver.cabModel.cabType}
                          </td>
                          <td className="px-6 py-4">$2999</td>
                          <td className="px-6 py-4 text-right">
                            <p
                              onClick={() =>
                                handleBlock(driver._id, driver.isBlocked)
                              }
                              className={`cursor-pointer font-medium  hover:underline ${
                                driver.isBlocked
                                  ? "text-success"
                                  : "text-danger"
                              }`}
                            >
                              {driver.isBlocked ? "unblock" : "block"}
                            </p>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
                {
                  !loading && !searchTPage && (
                    <Pagination
                      currentPage={currentPage}
                      setCurrentPage={setCurrentPage}
                      totalPage={totalPage}
                    />
                  )
                  // <nav
                  //   aria-label="Page navigation example"
                  //   className="flex justify-center my-5"
                  // >
                  //   <ul className="flex items-center -space-x-px h-8 text-sm">
                  //     <li>
                  //       <button
                  //         type="button"
                  //         className={`${
                  //           currentPage == 1
                  //             ? "opacity-50 cursor-not-allowed"
                  //             : ""
                  //         } flex items-center justify-center px-3 h-8 ms-0 leading-tight text-gray-500 bg-white border border-e-0 border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white`}
                  //         disabled={currentPage === 1}
                  //         onClick={() => changePage(currentPage - 1)}
                  //       >
                  //         <span className="sr-only">Previous</span>
                  //         <ChevronLeft />
                  //       </button>
                  //     </li>

                  //     {itPageNum.map((page) => {
                  //       return (
                  //         <li key={page}>
                  //           <button
                  //             className={`flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700  dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white ${
                  //               currentPage === page
                  //                 ? "dark:bg-gray-700"
                  //                 : "dark:bg-gray-800"
                  //             }`}
                  //             onClick={() => changePage(page)}
                  //           >
                  //             {page}
                  //           </button>
                  //         </li>
                  //       );
                  //     })}

                  //     <li>
                  //       <button
                  //       disabled={currentPage === totalPage}
                  //         className={`${
                  //           currentPage == totalPage
                  //             ? "opacity-50 cursor-not-allowed"
                  //             : ""
                  //         } flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white`}
                  //         onClick={() => changePage(currentPage + 1)}
                  //       >
                  //         <span className="sr-only">Next</span>
                  //         <ChevronRight />
                  //       </button>
                  //     </li>
                  //   </ul>
                  // </nav>
                }
                {searchTPage && (
                  <Pagination
                    currentPage={searchCpage}
                    setCurrentPage={setSearchCpage}
                    totalPage={searchTPage}
                  />
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Drivers;
