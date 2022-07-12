import React, { useEffect, useState } from "react";
import Container from "./Container";
import SideNav from "./SideNav";
import "./adminpanel.css";
import { useRecoilState } from "recoil";
import ToggleAtom from "../Recoil/ToggleAtom";
import Header from "./Header";
import candidates from "../MockData/candidates.json";
import companydata from "../MockData/compdata.json";
import topjobs from "../MockData/topjobs.json";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Legend,
  BarChart,
  Bar,
  CartesianGrid,
} from "recharts";

const piedata = [
  { name: "Jobs Posted", value: 400, fill: "#57c0e8" },
  { name: "Candidates Hired", value: 280, fill: "rgb(0 28 104)" },
  { name: "No. of Clients", value: 300, fill: "#f94648" },
];
const AdminDashboard = () => {
  const [toggle, setToggle] = useRecoilState(ToggleAtom);

  console.log(candidates);

  useEffect(() => {
    console.log(toggle);
  }, [toggle]);

  // custom tool tip for the recharts graph if whenever want to implement.....

  /* const CustomizedTooltip = ({ active, payload, label }) => {
    console.log(active, payload, label);

    if (active) {
      return (
        <div className="chart-tooltip">
          <div className="">
            <span>Original: {payload[0].month}</span>
            <span>{payload[0].payload.count}</span>
          </div>
          <div className="">
            <span>Compared</span>
          </div>
        </div>
      );
    }

    return null;
  };
  */

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      // console.log(payload);
      return (
        <div className="custom-tooltip">
          {payload?.map((data) => (
            <div key={Math.random()}>
              <p
                className="label"
                style={{
                  border: "1px solid #fff",
                  backgroundColor: "#8884d8",
                  padding: "10px",
                  color: "white",
                  borderRadius: "4px",
                  boxShadow:
                    "rgba(0, 0, 0, 0.3) 0px 19px 38px, rgba(0, 0, 0, 0.22) 0px 15px 12px",
                }}
              >
                {`${data.name} : ${data.value}`}
              </p>
            </div>
          ))}
        </div>
      );
    }

    return null;
  };

  const BarTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      // console.log(payload);
      return (
        <div className="custom-tooltip">
          {payload?.map((data) => (
            <div key={Math.random()}>
              <p
                className="label"
                style={{
                  border: "1px solid #fff",
                  backgroundColor: "#8884d8",
                  padding: "10px",
                  color: "white",
                  borderRadius: "4px",
                  boxShadow:
                    "rgba(0, 0, 0, 0.3) 0px 19px 38px, rgba(0, 0, 0, 0.22) 0px 15px 12px",
                }}
              >
                <span>No. of Job per months </span> <br />
                {`${data.name} : ${data.value}`}
              </p>
            </div>
          ))}
        </div>
      );
    }

    return null;
  };

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
                <h6>Candidates Per Month</h6>
              </div>
              <div className="resp-container">
                <ResponsiveContainer>
                  <AreaChart
                    data={candidates}
                    margin={{
                      top: 10,
                      right: 30,
                      left: 0,
                      bottom: 0,
                    }}
                    width={1250}
                    height={250}
                  >
                    {/* <CartesianGrid /> */}

                    <XAxis dataKey="month" axisLine={false} tickLine={false} />
                    <YAxis axisLine={false} tickLine={false} />
                    <Tooltip
                      className="area-tooltip"
                      contentStyle={{
                        backgroundColor: "#8884d8",
                        color: "#fff",
                        borderRadius: "4px",
                        boxShadow:
                          "rgba(0, 0, 0, 0.3) 0px 19px 38px, rgba(0, 0, 0, 0.22) 0px 15px 12px",
                      }}
                      itemStyle={{ color: "#fff" }}
                      cursor={false}
                    />
                    <defs>
                      <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                        <stop
                          offset="5%"
                          stopColor="#1616b1"
                          stopOpacity={0.8}
                        />
                        <stop
                          offset="95%"
                          stopColor="#1616b1"
                          stopOpacity={0}
                        />
                      </linearGradient>
                    </defs>
                    <Area
                      type="monotone"
                      dataKey="count"
                      stroke="#8884d8"
                      // stroke={false}
                      // strokeWidth={2}
                      fillOpacity={1}
                      fill="url(#colorUv)"
                      // dot={{
                      //   fill: "#2e4355",
                      //   stroke: "#8884d8",
                      //   strokeWidth: 2,
                      //   r: 5,
                      // }}
                      activeDot={{
                        fill: "white",
                        stroke: "#8884d8",
                        strokeWidth: 5,
                        r: 6,
                      }}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>
            <div className="charts-right">
              <div className="pie">
                <ResponsiveContainer className="resp-container-pie">
                  <PieChart>
                    <Pie
                      dataKey="value"
                      data={piedata}
                      // cx={210}
                      // cy={100}
                      cx="50%"
                      cy="50%"
                      innerRadius={50}
                      outerRadius={90}
                      fill="#8884d8"
                      paddingAngle={2}
                      layout="middle"
                    />
                    <Tooltip content={CustomTooltip} />

                    <Legend
                      className="legend"
                      layout="horizontal"
                      verticalAlign="bottom"
                      align="middle"
                      width="80%"
                      left="15px"
                      fontSize="10px"
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
          <div className="admin-charts">
            <div className="charts-left">
              <div className="chart-head">
                <h6>List Of Top 10 Clients</h6>
              </div>
              <div className="table">
                <table className="table">
                  <tr>
                    <th>Id</th>
                    <th>Company</th>
                    <th>Name</th>
                    <th>Designation</th>
                    <th>Email</th>
                    <th>Avatar</th>
                  </tr>
                  {companydata.map((data, idx) => (
                    <tr>
                      <td>{data.id}</td>
                      <td>{data.company}</td>
                      <td>{data.name}</td>
                      <td>{data.designation}</td>
                      <td>{data.email}</td>
                      <td>
                        <div className="avatar">
                          <img
                            src={data.avatar}
                            className="round-img"
                            alt="avatar"
                          />
                        </div>
                      </td>
                    </tr>
                  ))}
                </table>
              </div>
            </div>
            <div className="charts-left">
              <div className="chart-head">
                <h6>Jobs Per Month</h6>
              </div>
              <div className="resp-container-bar">
                <ResponsiveContainer>
                  <BarChart
                    data={topjobs}
                    margin={{
                      top: 5,
                      right: 30,
                      left: 20,
                      bottom: 5,
                    }}
                  >
                    {/* <CartesianGrid strokeDasharray="3 3" /> */}
                    <XAxis dataKey="month" axisLine={false} tickLine={false} />
                    <YAxis axisLine={false} tickLine={false} />
                    <Tooltip
                      content={BarTooltip}
                      cursor={{ fill: "transparent" }}
                    />
                    <Legend />
                    <Bar
                      dataKey="count"
                      fill="#8884d8"
                      radius={[6, 6, 6, 6]}
                      barSize={40}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminDashboard;
