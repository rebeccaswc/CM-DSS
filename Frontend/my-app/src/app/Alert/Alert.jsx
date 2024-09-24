"use client";

import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ChevronUpDownIcon } from "@heroicons/react/24/solid";
import { useRouter } from 'next/navigation';
import { getAlertList } from "../api/alert";

function Alert() {

  const [datas, setDatas] = useState([]);
  var sort = "";
  const [showAll, setShowAll] = useState(false);

  useEffect(() => {

    const fetchData = async() => {
      try{
        const data = await getAlertList(sort);
        setDatas(data);
      }catch(error){
        console.log('Error fetching response:', error);
      }
    }

    fetchData();

  }, []);

  const router = useRouter();
  var alertID;

  const handleClick = (index) => {
    alertID = datas[index]?.alertID;
    router.push(`/query?alertID=${alertID}`);
    console.log(alertID)
  }

  const sortClick = async (index) => {
    const sort_class = ["alertID", "alertID", "Source IP", "Severity Level", "Timestamp"];
    console.log(sort_class[index]);

    sort = sort_class[index];

    try {
      const data = await getAlertList(sort);
      setDatas(data);
    } catch (error) {
      console.error('Error fetching data:', error);
      setDatas([]);
    }
  };

  const toggleShowAll = () => {
    setShowAll(!showAll);
  };

  const displayedData = showAll ? datas : datas.slice(0, 9);
  console.log(displayedData);

  return (
    <div className="w-full bg-[#1d203e] p-12">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold text-white">Alert List</h2>
        <button className="text-white/60" onClick={toggleShowAll}>See all</button>
      </div>
      <div className="bg-black/50 rounded-[20px] border-2 border-[#64b5e2] overflow-hidden">
      
        <Table> 
          <TableHeader className="bg-gradient-to-b from-[#64DCE5] via-[#637CDC] via-[#624CD8] to-[#621CD3] rounded-t-[18px] ">
            <TableRow>
              {["No.", "Alert ID", "IP Address", "Level", "Alert Date"].map(
                (header, index) => (
                  <TableHead
                    key={index}
                    className="text-white px-4 py-3 items-center whitespace-nowrap"
                  >
                    <div className="flex items-center">
                      {header}
                      <button onClick={() => sortClick(index)}>
                        <ChevronUpDownIcon className="w-6 h-5 text-white" />
                      </button>
                    </div>
                  </TableHead>
                )
              )}
              <TableHead className="text-white px-4 py-3 items-center whitespace-nowrap"></TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {displayedData.map((data, index) => (
              <TableRow key={data.number}>
                <TableCell className="text-white px-8 py-3 items-center whitespace-nowrap">{data.number}</TableCell>
                <TableCell className="text-white px-4 py-3 items-center whitespace-nowrap">{data.alertID}</TableCell>
                <TableCell className="text-white px-4 py-3 items-center whitespace-nowrap">{data.ip}</TableCell>
                <TableCell className="text-white px-5 py-3 items-center whitespace-nowrap">{data.level}</TableCell>
                <TableCell className="text-white px-7 py-3 items-center whitespace-nowrap">{data.alertDate}</TableCell>
                <TableCell>
                  <button
                    className={`w-full max-w-[235px] h-[25px] rounded-[30px] border text-center text-white text-xs font-bold ${
                      index % 2 === 0 ? "bg-[#db61c6]" : "bg-[#72c7e8]"
                    } sm:max-w-[200px] sm:h-[30px] md:max-w-[220px] md:h-[35px] lg:max-w-[235px] lg:h-[40px] xl:max-w-[250px] xl:h-[45px]`}
                    onClick={() => handleClick(index)}
                  >
                    SUMMARY & QUERY
                  </button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}

export default Alert;
