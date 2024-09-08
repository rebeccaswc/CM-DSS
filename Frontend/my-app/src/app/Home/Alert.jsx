"use client";

import React from "react";
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

function Alert() {
  const datas = [
    {
      number: "1",
      id: "FIG-121",
      ip: "192.168.14.34",
      level: "High",
      date: "May 1",
    },
    {
      number: "2",
      id: "FIG-125",
      ip: "203.10.113.45",
      level: "Low",
      date: "May 5",
    },
    {
      number: "3",
      id: "FIG-129",
      ip: "172.16.254.12",
      level: "Medium",
      date: "May 8",
    },
    {
      number: "4",
      id: "FIG-132",
      ip: "198.51.100.22",
      level: "High",
      date: "May 2",
    },
    {
      number: "5",
      id: "FIG-136",
      ip: "191.46.120.31",
      level: "Medium",
      date: "May 5",
    },
    {
      number: "6",
      id: "FIG-139",
      ip: "192.17.11.123",
      level: "Low",
      date: "May 6",
    },
  ];

  const router = useRouter();

  const handleClick = () => {
    router.push('/Chat')
  }

  return (
    <div className="w-full h-screen bg-[#1d203e] p-12">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold text-white">Alert List</h2>
        <button className="text-white/60">See all</button>
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
                      <ChevronUpDownIcon className="w-6 h-5 text-white" />
                    </div>
                  </TableHead>
                )
              )}
              <TableHead className="text-white px-4 py-3 items-center whitespace-nowrap"></TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {datas.map((data, index) => (
              <TableRow key={data.number}>
                <TableCell className="text-white px-8 py-3 items-center whitespace-nowrap">{data.number}</TableCell>
                <TableCell className="text-white px-4 py-3 items-center whitespace-nowrap">{data.id}</TableCell>
                <TableCell className="text-white px-4 py-3 items-center whitespace-nowrap">{data.ip}</TableCell>
                <TableCell className="text-white px-5 py-3 items-center whitespace-nowrap">{data.level}</TableCell>
                <TableCell className="text-white px-7 py-3 items-center whitespace-nowrap">{data.date}</TableCell>
                <TableCell>
                  <button
                    className={`w-full max-w-[235px] h-[25px] rounded-[30px] border text-center text-white text-xs font-bold ${
                      index % 2 === 0 ? "bg-[#db61c6]" : "bg-[#72c7e8]"
                    } sm:max-w-[200px] sm:h-[30px] md:max-w-[220px] md:h-[35px] lg:max-w-[235px] lg:h-[40px] xl:max-w-[250px] xl:h-[45px]`}
                    onClick={handleClick}
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
