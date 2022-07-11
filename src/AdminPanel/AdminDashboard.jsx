import React, { useEffect, useState } from "react";
import Container from "./Container";
import SideNav from "./SideNav";
import "./adminpanel.css";
import { useRecoilState } from "recoil";
import ToggleAtom from "../Recoil/ToggleAtom";
import Header from "./Header";
import candidates from "../MockData/candidates.json";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const AdminDashboard = () => {
  const [toggle, setToggle] = useRecoilState(ToggleAtom);

  console.log(candidates);

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
        <div className="main-dashboard">
          <div className="admin-top-gridbox">
            <div className="admin-grid-item">
              <div className="box">
                <div className="box-title">
                  <h5>Job Posted</h5>
                </div>
                <div className="box-body">
                  <div>
                    <i className="bx bxs-briefcase-alt box-body-icn"></i>
                  </div>
                  <div>
                    <span className="box-text">2</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="admin-grid-item">
              <div className="box">
                <div className="box-title">
                  <h5>Candidates</h5>
                </div>
                <div className="box-body">
                  <div>
                    <i className="bx bxs-group box-body-icn"></i>
                  </div>
                  <div>
                    <span className="box-text">2</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="admin-grid-item">
              <div className="box">
                <div className="box-title">
                  <h5>Jobs Provided</h5>
                </div>
                <div className="box-body">
                  <div>
                    <i className="bx bxs-hard-hat box-body-icn"></i>
                  </div>
                  <div>
                    <span className="box-text">2</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="admin-grid-item">
              <div className="box">
                <div className="box-title">
                  <h5>Clients</h5>
                </div>
                <div className="box-body">
                  <div>
                    <i className="bx bxs-building-house box-body-icn"></i>
                  </div>
                  <div>
                    <span className="box-text">2</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="admin-charts">
            <div className="charts-left">
              <div className="chart-head">
                <h6>Customers Per Month</h6>
              </div>

              <ResponsiveContainer width={1200} height={400}>
                <AreaChart
                  data={candidates}
                  margin={{
                    top: 10,
                    right: 30,
                    left: 0,
                    bottom: 0,
                  }}
                >
                  {/* <CartesianGrid /> */}
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <defs>
                    <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#1616b1" stopOpacity={0.8} />
                      <stop offset="95%" stopColor="#1616b1" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <Area
                    type="monotone"
                    dataKey="count"
                    stroke={false}
                    // stroke="#001A66 "
                    // strokeWidth={2}
                    fillOpacity={1}
                    fill="url(#colorUv)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
            <div className="charts-right">2</div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminDashboard;
