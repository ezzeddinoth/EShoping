import React from 'react';
import './Product.css';
import { Card, Col } from 'react-bootstrap';

export default function Product(props) {

    return (
        <div className='product'>
            {/*<div className='product' onClick={() => props.setSelectedProduct(props.product)}>
                <div className='container'>
                    <div className='name'> {props.product.name}</div>
                    <div className='productPhotoContainer'>
                        <div >{props.product.photo && <img className="productPhoto" alt="part" src={"data:image/jpeg;base64," + props.product.photo} ></img>}</div>
                        <div className='describtion'>{props.product.describtion}</div>
                    </div>
                </div>
            </div>*/}
            <Card style={{ height: '25rem', margin: '2rem' }} onClick={() => props.setSelectedProduct(props.product)}>
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
        </div >
    );
}
