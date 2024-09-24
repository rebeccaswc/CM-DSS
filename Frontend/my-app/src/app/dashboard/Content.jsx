"use client";
import React from "react";
import { Chart } from "react-google-charts";


function Content() {

  const data_level = [
    ["Task", "Level Count"],
    ["5", 5534],
    ["10", 462],
    ["3", 301],
    ["7", 39],
    ["8", 13],
    ["4", 1],
  ];

  const options_level = {
    pieHole: 0.4,
    is3D: false,
  }

  const data_technique = [
    ["Task", "MITRE ATT&CK Technique Count"],
    ['SSH', 3815],
    ['Password Guessing', 1690],
    ['Brute Force', 475],
    ['Valid Accounts', 103],
    ['Sudo and Sudo Caching', 94],
    ['Stored Data Manipulation', 3],
    ['File Deletion,Data Destruction', 2],
    ['Disable or Modify Tools', 1],
    ['Valid Accounts,Remote Services', 1],
  ]

  const data_timestamp = [
    ["Date", "Alert"],
    ["Arp 01 11:00", 1000],
    ["Arp 01 11:30", 1170],
    ["Arp 01 12:00", 660],
    ["Arp 01 12:30", 1000],
    ["Arp 11 13:00", 1030],
    ["Arp 11 13:30", 1000],
    ["Arp 11 14:00", 340],
    ["Arp 11 14:30", 1220],
    ["Arp 11 15:00", 2000],
    ["Arp 11 15:30", 460],
    ["Arp 11 16:00", 300],
    ["Arp 11 16:30", 2020],
  ];


  const renderChange = (change, trend) => {
    return (
      <span className={`text-${trend === 'up' ? 'green' : 'red'}-500`}>
        {change}
      </span>
    );
  };

  return (
    <div className="min-h-screen bg-[#1d203e] flex flex-col mx-4">
      <div className="max-w-7xl w-full p-4">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mt-8">
          <div className="bg-white p-4 rounded-lg shadow">
            <h2 className="text-lg font-semibold">Number Of Alert</h2>
            <div className="mt-20 flex justify-center items-center">
              <div className="text-8xl font-bold text-blue-800 ">
                6350
              </div>
            </div>
          </div>
          <div className="bg-white p-4 rounded-lg shadow">
            <h2 className="text-lg font-semibold">Level of Severity</h2>
            <div className="mt-4">
              <Chart chartType="PieChart"
                data={data_level}
                options={options_level}
                width={"100%"}
                height={"300px"}
              />
            </div>
          </div>
          <div className="bg-white p-4 rounded-lg shadow">
            <h2 className="text-lg font-semibold">MITRE ATT&CK Technique</h2>
            <div className="mt-4">
              <Chart chartType="PieChart"
                data={data_technique}
                width={"100%"}
                height={"300px"}
              />
            </div>
          </div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow my-8">
        <Chart
          chartType="ColumnChart"
          width="100%"
          height="200px"
          data={data_timestamp}
        />
        </div>
      </div>
    </div>
  );

}

export default Content;
