"use client";

import React, { useState, useEffect } from "react";
import { Chart } from "react-google-charts";
import { getAlertAmount, getAlertSecurityLevelAmount, getAlertTechniqueAmount, getAlertTimeStampAmount } from "../api/info";


function Content() {

  const [alertAmount, setAlertAmount] = useState(null);
  const [alertLevelAmount, setAlertLevelAmount] = useState({});
  const [alertTechniqueAmount, setAlertTechniqueAmount] = useState({});
  const [alertTimeStampAmount, setAlertTimeStampAmount] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const alertAmountResponse = await getAlertAmount();
        setAlertAmount(alertAmountResponse); 

        const alertLevelAmountResponse = await getAlertSecurityLevelAmount();
        const alertLevelAmountStr = {};
        for (const [key, value] of Object.entries(alertLevelAmountResponse)) {
          alertLevelAmountStr[String(key)] = String(value);
        }
        setAlertLevelAmount(alertLevelAmountStr);

        const alertTechniqueAmountResponse = await getAlertTechniqueAmount();
        const alertTechniqueAmountStr = {};
        for (const [key, value] of Object.entries(alertTechniqueAmountResponse)) {
          alertTechniqueAmountStr[String(key)] = String(value);
        }
        setAlertTechniqueAmount(alertTechniqueAmountStr);

        const alertTimeStampResponse = await getAlertTimeStampAmount();
        const alertTimeStampAmountStr = {};
        for (const [key, value] of Object.entries(alertTimeStampResponse)) {
          alertTimeStampAmountStr[String(key)] = String(value);
        }

        setAlertTimeStampAmount(alertTimeStampAmountStr);
        console.log(alertTimeStampAmount);

      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const dataLevel = [
    ["Task", "Level Count"],
    ...Object.entries(alertLevelAmount).map(([key, value]) => [key, Number(value)]),
  ];

  const options_level = {
    pieHole: 0.4,
    is3D: false,
  }

  const data_technique = [
    ["Task", "MITRE ATT&CK Technique Count"],
    ...Object.entries(alertTechniqueAmount).map(([key, value]) => [key, Number(value)]),
  ]

  const data_timestamp = [
    ["Date", "Alert"],
    ...Object.entries(alertTimeStampAmount).map(([key, value]) => [key, Number(value)]).slice(-10),
  ]

  // const data_timestamp = [
  //   ["Date", "Alert"],
  //   ["Arp 01 11:00", 1000],
  //   ["Arp 01 11:30", 1170],
  //   ["Arp 01 12:00", 660],
  //   ["Arp 01 12:30", 1000],
  //   ["Arp 11 13:00", 1030],
  //   ["Arp 11 13:30", 1000],
  //   ["Arp 11 14:00", 340],
  //   ["Arp 11 14:30", 1220],
  //   ["Arp 11 15:00", 2000],
  //   ["Arp 11 15:30", 460],
  //   ["Arp 11 16:00", 300],
  //   ["Arp 11 16:30", 2020],
  // ];


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
                {alertAmount}
              </div>
            </div>
          </div>
          <div className="bg-white p-4 rounded-lg shadow">
            <h2 className="text-lg font-semibold">Level of Severity</h2>
            <div className="mt-4">
              <Chart chartType="PieChart"
                data={dataLevel}
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
