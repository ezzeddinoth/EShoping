import React from 'react';
import './Footer.css';
import { Nav, Row, Col, Container } from 'react-bootstrap';
import { GrInstagram, AiFillPhone, MdEmail, GrFacebook,/* IoReorderThree*/ } from "react-icons/all";

export default function Footer(props) {

    return (
        <div>
            <Container className="foot" fluid>
                <Row >
                    <Col lg={12} md={12} s={12} xs={12} className="row justify-content-center" >

                    </Col>
                </Row>
                <Row>
                    <Nav className='list'  >
                        <Nav.Item className="item" as={Col} lg={3} md={3} s={3} xs={3}>
                            <Nav.Link  className="link" Link="gmail.com">
                                <GrInstagram  size={20}> </GrInstagram>
                                <Row className="row justify-content-center"></Row>
                            </Nav.Link>
                        </Nav.Item>
                        <Nav.Item className="item" as={Col} lg={3} md={3} s={3} xs={3}>
                            <Nav.Link className="link" >
                                <GrFacebook size={20}></GrFacebook>
                                <Row className="row justify-content-center"></Row>
                            </Nav.Link>
                        </Nav.Item>
                        <Nav.Item className="item" as={Col} lg={3} md={3} s={3} xs={3}>
                            <Nav.Link className="link">
                                <MdEmail size={20}></MdEmail>
                                <Row className="row justify-content-center"></Row>
                            </Nav.Link>
                        </Nav.Item>
                        <Nav.Item className="item" as={Col} lg={3} md={3} s={3} xs={3}>
                            <Nav.Link className="link" >
                                <AiFillPhone size={20}></AiFillPhone>
                                <Row className="row justify-content-center"></Row>
                            </Nav.Link>
                        </Nav.Item>
                    </Nav>
                </Row>
            </Container>
        </div >
    );
}