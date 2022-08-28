import React from 'react';
import { useHistory } from 'react-router'
import Product from '../../Products/Product/Product';
import './All.css';
import { Row, Col, Container } from 'react-bootstrap';

export default function All(props) {
    const history = useHistory();

    const onClick = (product) => {
        props.setSelectedProduct(product)
        history.push("product/" + product.productId)
    }

    return (
        <div>
            <Container >
                <Row >
                    {props.products && props.products.map((product, index) =>
                        <Col key={index} lg={4} md={4} s={12} xs={12}>
                            <Product setSelectedProduct={() => { onClick(product) }} product={product}></Product>
                        </Col>)}
                </Row>
            </Container>
        </div>

    );
}
