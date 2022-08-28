import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import APICall from '../../Component/APICall/APICall';
import OrdersService from '../../Service/OrdersService';
import './Basket.css';
import TableRoot from '../../Component/Table/Table/Table';
import { Container, Row, Col } from 'react-bootstrap';
import { useHistory } from 'react-router';
import AuthService from '../../Service/AuthService';
import StripeCheckout from 'react-stripe-checkout';
import { toast } from 'react-toastify';
import PaymentService from '../../Service/PaymentService';

export default function Basket(props) {

    const [API, setAPI] = useState('');
    const [basket, setBasket] = useState('');
    const [tableState, setTableState] = useState();
    const history = useHistory();

    useEffect(() => {
        const checkLogin = () => {
            if (!AuthService.isLoggedIn()) {
                history.push('login')
            }
        }

        const fetchData = async () => {
            setAPI({
                res: await OrdersService.getBasket(),
                onSucceed: (res) => {
                    setBasket(res.data)
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

    const buyNow = async (token) => {
        setAPI({
            res: await OrdersService.buyBasket(),
            onSucceed: (res) => {
                setBasket([])

            }
        });
        console.log(token)
        const value =
        {
            "paymentId": 1,
            "description": "description",
            "amount": price,
            "currency": "EUR",
            "stripeEmail": token.email,
            "stripeToken": token.id
        }


        setAPI({
            res: await PaymentService.charge(value),
            onSucceed: (res) => {
                toast.success("success")
            }
        });
    }

    let price = basket ? basket.reduce((total, item) => total + item.numberOfItems * item.price, 0) : 0;
    let items = basket ? basket.reduce((total, item) => total + item.numberOfItems, 0) : 0;

    return (
        <div>
            {API && <APICall API={API} secured={true} setAPI={setAPI}></APICall>}
            <Container className='basket'>
                {basket && <TableRoot tableState={tableState} setTableState={setTableState}
                    editableRows={false} data={basket} columns={columns}
                /*deleteRow={toDeleteProduct}*/ ></TableRoot>}
                {basket &&
                    <Row className='sum'>
                        <Col lg={4} md={4} s={4} xs={4}>
                            {items} Items
                        </Col>
                        <Col lg={4} md={4} s={4} xs={4}>
                            price: {price}
                        </Col>
                        <Col lg={4} md={4} s={4} xs={4} >
                            <StripeCheckout
                                stripeKey="pk_test_51KG2I3KFD1WKZPjYYvXTOmwX6hOPh1GvnYs9VGAqzDjMQm04pdpd1nJG6KLPXfeEobzrLAMbhAxDGm5naTOHqzW500PgzTvQYw"
                                token={buyNow}
                                billingAddress
                                shippingAddress
                                amount={price * 100}
                                name="basket"
                            />
                        </Col>
                    </Row>}

            </Container>
        </div>
    );
}
