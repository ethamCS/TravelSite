import React from 'react';
import { Input, Container, Button, Col, Row } from 'reactstrap';

export default function Find(props) {
    return (
        <Container>
            <FindHeader closePage={props.closePage}/>
            <FindBody />
        </Container>
    );
}

function FindHeader(props) {
    return (
        <Container>
            <Row>
                <Col>
                    <h3>Find Locations</h3>
                </Col>
                <Col xs="auto">
                    <Button name="closeFind" color="primary" onClick={props.closePage}>Exit</Button>
                </Col> 
            </Row>
        </Container>
    );
}

function FindBody(props) {
    return (
        <Container>
            <Input placeholder="Enter Location" />
        </Container>
    );
}