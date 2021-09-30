import React from 'react';
import {Container, Row, Col} from 'reactstrap';

export default function Results(props) {
    return (
        <Container>
            <ResultHeader />
            <ResultBody places={props.places} selectedIndex={props.selectedIndex} placeActions={props.placeActions} list={props.list} />
        </Container>
    );
}

function ResultHeader(props) {
    return (
        <Container>
            <Row>
                <Col>
                </Col> 
            </Row>
        </Container>
    );
}

function ResultBody(props) {
    return (
        <tbody>
            <br/>
            <h5>Locations Found</h5>
            <TableRow />
        </tbody>
    );
}

function TableRow(props){
    return (
        <Container> 
            <Row>
                <Col>1</Col>
                <Col>name</Col>  
                <Col>region</Col>
                <Col>country</Col>
                <Col>lat/lng</Col>        
            </Row>
        </Container>
    );
}
