import React from "react";
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table"




function Alert() {
    const datas = [
        {
            number: '100',
            id: '1',
            ip: '1',
            level: '1',
            date: '1',
            detail: '1'
        },
        {
            number: '200',
            id: '2',
            ip: '2',
            level: '2',
            date: '2',
            detail: '2'
        },
        {
            number: '3',
            id: '3',
            ip: '3',
            level: '3',
            date: '3',
            detail: '3'
        },
    ]

    return(
        <div>
            <div className="flex">
                <h1 className="p-16 text-3xl text-black w-3/4">Alert List</h1>
                <button className="text-zinc-400">See all</button>   
            </div>
            <div className="flex pl-16 pr-16">
                <Table className="h-60 border-double border-4">
                    <TableHeader className="bg-[#7B579A] bg-opacity-80">
                        <TableRow>
                            <TableHead className="w-[100px] text-black">No.</TableHead>
                            <TableHead className="text-black">Alert ID</TableHead>
                            <TableHead className="text-black">IP Address</TableHead>
                            <TableHead className="text-black">Level</TableHead>
                            <TableHead className="text-black">Alert Date</TableHead>
                            <TableHead className="w-[100px] text-black">Datail</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>

                        {datas.map((data) => 
                        <TableRow key={data.number} className="h-16">
                            <TableCell className="font-medium">{data.number}</TableCell>
                            <TableCell className="w-24">{data.id}</TableCell>
                            <TableCell className="w-24">{data.ip}</TableCell>
                            <TableCell className="w-24">{data.level}</TableCell>
                            <TableCell className="w-24">{data.date}</TableCell>
                            <TableCell className="w-24">{data.detail}</TableCell>
                        </TableRow>)
                        
                        }
                    
                    </TableBody>
                </Table>
            </div>
        </div>
    )
}

export default Alert;