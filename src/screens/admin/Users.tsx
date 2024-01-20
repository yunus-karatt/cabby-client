import { ChevronLeft, ChevronRight, Search } from "lucide-react";
import Navbar from "../../components/admin/Navbar";
import SideBar from "../../components/admin/SideBar";
import { useEffect, useState } from "react";
import { adminAxios } from "../../constraints/axios/adminAxios";
import adminApi from "../../constraints/api/adminApi";
import { UserData } from "../../interface/user/userInterface";

const Users = () => {
  const [users, setUsers] = useState<UserData[]>([]);
  const [totalPage, setTotalPage] = useState<number>();
  const [itPageNum, setItPageNum] = useState<number[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);

  const changePage=(page:number)=>{
    console.log("clicked")
    setCurrentPage(()=>page)
  }

  useEffect(() => {
    async function fetchUsers() {
      const data = await adminAxios.get(`${adminApi.getUsers}?page=${currentPage}`);
      setUsers(() => data.data.users);
      setTotalPage(() => data.data.totalPage);
      totalPage &&
        setItPageNum(() =>
          Array.from({ length: totalPage }, (_, index) => index + 1)
        );
    }
    fetchUsers();
    console.log({ users, totalPage });
  }, [currentPage,totalPage,currentPage]);

  return (
    <>
      <Navbar />
      <div className="flex overflow-y-hidden">
        <SideBar />
        <div className="bg-hover w-full flex flex-col gap-y-5">
          <div className="md:p-5 mx-2">
            <h1 className="font-bold text-4xl">Users</h1>
          </div>
          <div className="mx-2 flex items-center gap-x-5">
            <div className="flex items-center bg-white p-3 rounded-lg">
              <input type="search" placeholder="search..." />
              <button>
                <Search />
              </button>
            </div>
            <div>
              <select className="p-3 px-5 rounded-lg" name="status" id="status">
                <option value="">Status</option>
                <option value="blocked">Blocked</option>
                <option value="active">Active</option>
              </select>
            </div>
          </div>
          <div className="bg-white h-[100vh] mx-2 rounded-md p-10 flex justify-center ">
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
                      Total Trips
                    </th>
                    <th scope="col" className="px-6 py-3">
                      <span className="sr-only">Edit</span>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((user, index) => {
                    return (
                      <tr
                        key={user._id}
                        className="bg-white border-b   text-black hover:bg-gray-600 hover:text-white"
                      >
                        <td className="px-6 py-4">{index + 1}</td>

                        <th
                          scope="row"
                          className="px-6 py-4 font-medium  whitespace-nowrap "
                        >
                          {user.firstName + " " + user.lastName}
                        </th>
                        <td className="px-6 py-4">
                          {user.mobile ? user.mobile : "Mobile Not provided"}
                        </td>
                        <td className="px-6 py-4">{user.email}</td>
                        <td className="px-6 py-4">$2999</td>
                        <td className="px-6 py-4 text-right">
                          <a
                            href="#"
                            className={`font-medium  hover:underline ${user.isBlocked ? "text-success":"text-danger"}`}
                          >
                            {user.isBlocked ? "unblock":"block"}
                          </a>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>

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
                      onClick={()=>changePage(currentPage-1)}
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
                            currentPage === page
                              ? "dark:bg-gray-700"
                              : "dark:bg-gray-800"
                          }`}
                          onClick={()=>changePage(page)}
                        >
                          {page}
                        </button>
                      </li>
                    );
                  })}

                  <li>
                    <button
                      className={`${
                        currentPage == totalPage
                          ? "opacity-50 cursor-not-allowed"
                          : ""
                      }flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white`}
                      onClick={()=>changePage(currentPage+1)}
                    >
                      <span className="sr-only">Next</span>
                      <ChevronRight />
                    </button>
                  </li>
                </ul>
              </nav>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Users;
