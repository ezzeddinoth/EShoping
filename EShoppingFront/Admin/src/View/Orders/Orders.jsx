import React, { useEffect, useState } from 'react';
import APICall from '../../Component/APICall/APICall'
import Table from '../../Component/Table/TableRoot/TableRoot'
import OrdersService from '../../Service/OrdersService';
import Header from '../Header/Header';
import './Orders.css';

export default function Order(props) {
    useEffect(() => {
        const fetchOrders = async () => {
            setAPI({
                res: await OrdersService.getOrders(),
                onSucceed: (res) => {
                    console.log(res.data)
                    setOrders(res.data)
                }
            });
        }
        fetchOrders();
    }, [])

    const [API, setAPI] = useState();
    const [orders, setOrders] = useState();

    const columns = [
        {
            Header: "User Email",
            Accessor: "person.email",
        },
        {
            Header: "Product",
            Accessor: "product.name",
        },
        {
            Header: "numberOfItems",
            Accessor: "numberOfItems",
        },
        {
            Header: "status",
            Accessor: "status",
        }]

    return (
        <div className='orders'>
            <Header btn_back={true}></Header>
            {API && <APICall API={API} secured={true} setAPI={setAPI}></APICall>}
            {orders && <div className='ordersTable'> <Table editableRows={false} data={orders} columns={columns}></Table></div>}
        </div>
    );
}
