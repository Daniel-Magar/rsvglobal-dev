import React, { useState, useEffect, useMemo } from "react";
import ToggleAtom from "../Recoil/ToggleAtom";
import { useRecoilState } from "recoil";
import SideNav from "./SideNav";
import Header from "./Header";
import mockdata from "../MockData/MOCK_DATA.json";
import Pagination from "../Pagination/Pagination";
import "../AdminPanel/search.css";

let PageSize = 20;
const Client = () => {
  const [toggle, setToggle] = useRecoilState(ToggleAtom);

  const [currentPage, setCurrentPage] = useState(1);
  const [search, setSearch] = useState("");

  const currentTableData = useMemo(() => {
    const firstPageIndex = (currentPage - 1) * PageSize;
    const lastPageIndex = firstPageIndex + PageSize;
    return mockdata.slice(firstPageIndex, lastPageIndex);
  }, [currentPage]);

  const [isActive, setIsActive] = useState(false);
  const [sortingData, setSortingData] = useState(currentTableData);
  console.log("finding Id", sortingData);

  console.log("current data", mockdata);

  useEffect(() => {
    console.log(toggle);
  }, [toggle]);

  // const [order, setOrder] = useState("ASC");
  // const sorting = (col) => {
  //   console.log("col", col);
  //   if (order == "ASC") {
  //     const sorted = [...sortingData].sort((a, b) =>
  //       a[col].toLowerCase() > b[col].toLowerCase() ? 1 : -1
  //     );
  //     setSortingData(sorted);
  //     setOrder("DSC");
  //     setIsActive(!isActive);
  //   }
  //   if (order == "DSC") {
  //     const sorted = [...sortingData].sort((a, b) =>
  //       a[col].toLowerCase() < b[col].toLowerCase() ? 1 : -1
  //     );
  //     setSortingData(sorted);
  //     setOrder("ASC");
  //     setIsActive(!isActive);
  //   }
  // };
  // const sortingId = (col) => {
  //   console.log("col", col);
  //   if (order == "ASC") {
  //     const sorted = [...sortingData].sort((a, b) =>
  //       a[col] > b[col] ? 1 : -1
  //     );
  //     setSortingData(sorted);
  //     setOrder("DSC");
  //     setIsActive(!isActive);
  //   }
  //   if (order == "DSC") {
  //     const sorted = [...sortingData].sort((a, b) =>
  //       a[col] < b[col] ? 1 : -1
  //     );
  //     setSortingData(sorted);
  //     setOrder("ASC");
  //     setIsActive(!isActive);
  //   }
  // };

  return (
    <>
      <SideNav />

      <div
        className={`content-admin ${
          toggle ? "admin-active" : "admin-inactive"
        }`}
      >
        <Header />
        <div>
          <div className="searchbox">
            <input
              type="text"
              name="search"
              className="searchInput"
              placeholder="Search..."
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>

        <div>
          <div className="main-container">
            <div className="my-table">
              <div className="my-table-body">
                <div className="my-table-row">
                  <div class="my-table-body-cell thead">ID</div>
                  <div class="my-table-body-cell thead">First Name</div>
                  <div class="my-table-body-cell thead">Last Name</div>
                  <div class="my-table-body-cell thead">Email</div>
                  <div class="my-table-body-cell thead">Gender</div>

                  <div class="my-table-body-cell thead">IP Address</div>
                </div>
                {currentTableData
                  .filter((data) => {
                    if (search == "") {
                      return data;
                    } else if (
                      data.first_name
                        .toLowerCase()
                        .includes(search.toLowerCase()) ||
                      data.last_name
                        .toLowerCase()
                        .includes(search.toLowerCase()) ||
                      data.email.toLowerCase().includes(search.toLowerCase()) ||
                      data.gender
                        .toLowerCase()
                        .includes(search.toLowerCase()) ||
                      data.ip_address
                        .toLowerCase()
                        .includes(search.toLowerCase())
                    ) {
                      return data;
                    }
                  })
                  .map((data, idx) => (
                    <div className="my-table-row" key={idx}>
                      <div class="my-table-body-cell">{data.id}</div>
                      <div class="my-table-body-cell">{data.first_name}</div>
                      <div class="my-table-body-cell">{data.last_name}</div>
                      <div class="my-table-body-cell">{data.email}</div>
                      <div class="my-table-body-cell">{data.gender}</div>

                      <div class="my-table-body-cell">{data.ip_address}</div>
                    </div>
                  ))}
              </div>
            </div>
            <Pagination
              className="pagination-bar"
              currentPage={currentPage}
              totalCount={mockdata.length}
              pageSize={PageSize}
              onPageChange={(page) => setCurrentPage(page)}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Client;
