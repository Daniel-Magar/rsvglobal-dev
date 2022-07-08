import React, { useState, useEffect, useMemo } from "react";
import ToggleAtom from "../Recoil/ToggleAtom";
import { useRecoilState } from "recoil";
import SideNav from "./SideNav";
import Header from "./Header";
import mockdata from "../MockData/MOCK_DATA.json";
import Pagination from "../Pagination/Pagination";

let PageSize = 20;
const Client = () => {
  const [toggle, setToggle] = useRecoilState(ToggleAtom);

  const [currentPage, setCurrentPage] = useState(1);

  const currentTableData = useMemo(() => {
    const firstPageIndex = (currentPage - 1) * PageSize;
    const lastPageIndex = firstPageIndex + PageSize;
    return mockdata.slice(firstPageIndex, lastPageIndex);
  }, [currentPage]);

  useEffect(() => {
    console.log(toggle);
  }, [toggle]);

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
                {currentTableData.map((data, idx) => (
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
