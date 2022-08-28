import React from 'react';
import { useHistory } from 'react-router'
import './Header.css';
import { Nav, Row, Col, Container } from 'react-bootstrap';
import { AiOutlineHome, CgProfile, AiOutlineShoppingCart, FcPaid,/* IoReorderThree*/ } from "react-icons/all";

export default function Header(props) {
    const history = useHistory();

    return (
        <div>
            <Container className="head" fluid>
                <Row >
                    <Col lg={12} md={12} s={12} xs={12} className="row justify-content-center" >
                        <span className='title'>E-Shoppin</span>
                    </Col>
                </Row>
                <Nav className='list' activeKey="/home" onSelect={(selectedKey) => { history.push(selectedKey) }} >
                    <Nav.Item className="item" as={Col} lg={3} md={3} s={3} xs={3}>
                        <Nav.Link href="/home"><AiOutlineHome size={32}></AiOutlineHome></Nav.Link>
                    </Nav.Item>
                    <Nav.Item className="item" as={Col} lg={3} md={3} s={3} xs={3}>
                        <Nav.Link eventKey="orders"><FcPaid size={32}></FcPaid></Nav.Link>
                    </Nav.Item>
                    <Nav.Item className="item" as={Col} lg={3} md={3} s={3} xs={3}>
                        <Nav.Link eventKey="basket"><AiOutlineShoppingCart size={32}></AiOutlineShoppingCart></Nav.Link>
                    </Nav.Item>
                    <Nav.Item className="item" as={Col} lg={3} md={3} s={3} xs={3}>
                        <Nav.Link eventKey="my-account" > <CgProfile size={32}></CgProfile> </Nav.Link>
                    </Nav.Item>
                </Nav>
            </Container>
        </div>
    );
}