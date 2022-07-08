import React, { useEffect, useState } from "react";
import Container from "./Container";
import SideNav from "./SideNav";
import "./adminpanel.css";
import { useRecoilState } from "recoil";
import ToggleAtom from "../Recoil/ToggleAtom";
import Header from "./Header";
import mockdata from "../MockData/MOCK_DATA.json";
import paginator from "../AdminPanel/Paginator";
import TableFooter from "../AdminPanel/TableFooter";

const AdminDashboard = () => {
  const [toggle, setToggle] = useRecoilState(ToggleAtom);

  const rowsPerPage = 20;
  const [page, setPage] = useState(1);
  const { slice, range } = paginator(mockdata, page, rowsPerPage);

  useEffect(() => {
    console.log(toggle);
  }, [toggle]);
  useEffect(() => {
    console.log("mock data", mockdata);
  }, []);

  return (
    <>
      <SideNav />
      <div
        className={`content-admin ${
          toggle ? "admin-active" : "admin-inactive"
        }`}
      >
        <Header />
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
              {slice.map((data, idx) => (
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
        </div>
        <TableFooter
          range={range}
          slice={slice}
          setPage={setPage}
          page={page}
        />
      </div>
    </>
  );
};

export default AdminDashboard;
