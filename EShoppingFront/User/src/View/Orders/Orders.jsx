import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import APICall from '../../Component/APICall/APICall';
import OrdersService from '../../Service/OrdersService';
import './Orders.css';
import Table from '../../Component/Table/Table/Table';
import { Container } from 'react-bootstrap';
import AuthService from '../../Service/AuthService';
import { useHistory } from 'react-router';

export default function Orders(props) {

    const [API, setAPI] = useState('');
    const [orders, setOrders] = useState('');
    const history = useHistory();

    useEffect(() => {
        const checkLogin = () => {
            if (!AuthService.isLoggedIn()) {
                history.push('login')
            }
        }
        const fetchData = async () => {
            setAPI({
                res: await OrdersService.getPaidOrder(),
                onSucceed: (res) => {
                    setOrders(res.data)
                }
            });
        }
        checkLogin();
        fetchData();
    }, [history])

    const columns = [
        {
            Header: "Name",
            Accessor: "productName"
        },
        {
            Header: "productType",
            Accessor: "productType"
        },
        {
            Header: "numberOfItems",
            Accessor: "numberOfItems",
            ColumnType: "TextField_Integer"
        },
        {
            Header: "price",
            Accessor: "price",
            ColumnType: "TextField_Integer"
        },
    ]

    return (
        <div >
            {API && <APICall API={API} secured={true} setAPI={setAPI}></APICall>}
            <Container className='orders'>
                {orders && <Table editableRows={false} data={orders} columns={columns}></Table>}
            </Container>
        </div>
    );
}
