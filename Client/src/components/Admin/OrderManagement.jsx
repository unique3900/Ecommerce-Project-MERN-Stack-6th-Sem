import React, { useEffect, useState } from 'react'
import {
    Typography,
    Card

} from '@material-tailwind/react';
import {
    Menu,
    MenuHandler,
    MenuList,
    MenuItem,
    Button,
    Input
} from "@material-tailwind/react";
import axios from 'axios';
const OrderManagement = () => {
    const [orders, setOrders] = useState([]);
    useEffect(() => {

        getALLOrder();

    }, [])
    const getALLOrder = async () => {
        const { data } = await axios.get('http://localhost:8080/api/v1/auth/get-all-orders');
        console.log(data.orders)
        setOrders(data.orders);
    }
    

    const TABLE_HEAD = ["Product", "Price","Paid Amount","Discount", "Buyer",'Purchased Date', "Status"];

    const TABLE_ROWS = [
        {
            name: "John Michael",
            job: "Manager",
            date: "23/04/18"
        },
        {
            name: "Alexa Liras",
            job: "Developer",
            date: "23/04/18"
        },
        {
            name: "Laurent Perrier",
            job: "Executive",
            date: "19/09/17"
        },
        {
            name: "Michael Levi",
            job: "Developer",
            date: "24/12/08"
        }, {
            name: "Richard Gran",
            job: "Manager",
            date: "04/10/21"
        }, {
            name: "Richard Gran",
            job: "Manager",
            date: "04/10/21"
        }, {
            name: "Richard Gran",
            job: "Manager",
            date: "04/10/21"
        }, {
            name: "Richard Gran",
            job: "Manager",
            date: "04/10/21"
        }, {
            name: "Richard Gran",
            job: "Manager",
            date: "04/10/21"
        }, {
            name: "Richard Gran",
            job: "Manager",
            date: "04/10/21"
        }, {
            name: "Richard Gran",
            job: "Manager",
            date: "04/10/21"
        }, {
            name: "Richard Gran",
            job: "Manager",
            date: "04/10/21"
        }, {
            name: "Richard Gran",
            job: "Manager",
            date: "04/10/21"
        }, {
            name: "Richard Gran",
            job: "Manager",
            date: "04/10/21"
        }, {
            name: "Richard Gran",
            job: "Manager",
            date: "04/10/21"
        }, {
            name: "Richard Gran",
            job: "Manager",
            date: "04/10/21"
        },
    ];
    return (
        <Card className=" h-full flex justify-center items-center px-32">
            <h1 className="text-center font-bold text-2xl lg:text-4xl py-2">Order Management</h1>
            <table className="w-full h-80 overflow-scroll bg-white shadow-lg  table-auto text-left">
                <thead>
                    <tr> {
                        TABLE_HEAD.map((head,index) => (
                            <th key={index}
                                className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">
                                <Typography variant="small" color="blue-gray" className="font-normal leading-none opacity-70">
                                    {head} </Typography>
                            </th>
                        ))
                    } </tr>
                </thead>
                <tbody> {
                    orders.map((data, index) => (
                        <tr key={index}
                            className="even:bg-blue-gray-50/50">
                            <td className="p-4">
                                <Typography variant="small" color="blue-gray" className="font-normal">
                                {data.products[0].name} </Typography>
                            </td>
                            <td className="p-4">
                                <Typography variant="small" color="blue-gray" className="font-normal">
                                {data.products[0].price } </Typography>
                            </td>
                            <td className="p-4">
                                <Typography variant="small" color="blue-gray" className="font-normal">
                                {data.paidAmount>0?data.paidAmount:data.products[0].price} </Typography>
                            </td>

                            <td className="p-4">
                                <Typography variant="small" color="blue-gray" className="font-normal">
                                   
                                {Math.floor( data.discountPercentage/100 * data.products[0].price)}  </Typography>
                            </td>
                            <td className="p-4">
                                <Typography variant="small" color="blue-gray" className="font-normal capitalize">
                                    {data.buyer.name} </Typography>
                            </td>
                            <td className="p-4">
                                <Typography variant="small" color="blue-gray" className="font-normal capitalize">
                                    {data.products[0].createdAt.slice(0,16)} </Typography>
                            </td>
                            <td className="p-4">
                                <div className="">
                                    <Menu className="bg-white w-full" >
                                        <MenuHandler className="bg-white text-black px-3">
                                            <Button className='w-full text-xs whitespace-pre-wrap'>Statud</Button>
                                        </MenuHandler>
                                        <MenuList className='flex flex-col gap-2 max-h-72'>

                                            <MenuItem className='cursor-pointer'>Delivered</MenuItem>
                                            <MenuItem className='cursor-pointer'>Processing</MenuItem>
                                            <MenuItem className='cursor-pointer'>Delivered</MenuItem>
                                        </MenuList>
                                    </Menu>
                                </div>
                            </td>
                        </tr>
                    ))
                } </tbody>
            </table>
        </Card>
    )
}

export default OrderManagement
