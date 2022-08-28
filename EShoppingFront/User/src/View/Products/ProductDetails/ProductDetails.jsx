import React from 'react';
import OrdersService from '../../../Service/OrdersService';
import APICall from '../../../Component/APICall/APICall';
import './ProductDetails.css';
import { useState } from 'react';
import { Container, Card, Button, Col } from 'react-bootstrap';
import { useParams } from "react-router-dom";
import { useEffect } from 'react';

export default function ProductDetails(props) {

    const [API, setAPI] = useState();
    const [count/*, setCount*/] = useState(1);
    const { id } = useParams();

    useEffect(() => {
        console.log(id);
    }, [id]);

    const addToBasket = async () => {
        const value = { "product": props.product, count }
        setAPI({
            res: await OrdersService.addToBasket(value),
            onSucceed: (res) => {
                alert("added")
            }
        });
    }

    return (
        <Container>
            {API && <APICall API={API} secured={true} setAPI={setAPI}></APICall>}
            {props.product &&
                <div><Card style={{ miniHeight: '60rem', margin: '2rem' }}>
                    <Card.Img variant="top" src={"data:image/jpeg;base64," + props.product.photo} />
                    <Card.Body>
                        <Card.Title>
                            <Col style={{ width: "80%", float: "left" }}>{props.product.name}</Col>
                            <Col style={{ width: "20%", float: "right", color: "red" }}>{props.product.price + "€"}</Col>
                        </Card.Title>
                        <Card.Text>
                            {props.product.describtion}
                        </Card.Text>
                    </Card.Body>
                </Card>
                    <Button style={{ display: "flex", marginLeft: "auto" }} variant='primary' onClick={addToBasket}>Buy Now</Button>
                </div>}
        </Container>
    );
}
