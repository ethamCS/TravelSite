import React from "react";
import { Input, Container, Button, Col, Row, InputGroup, InputGroupAddon, InputGroupText } from 'reactstrap';

export default function WhereIs(props) {

    return (
        <Container>
            <WhereIsHeader closeWhereIs={props.closeWhereIs} />
            <WhereIsBody />
            <WhereIsFooter closeWhereIs={props.closeWhereIs} />
        </Container>
    );
}

function WhereIsHeader(props) {
    return (
        <Container style={{ paddingTop: '10px' }}>
            <Row>
                <Col>
                    <h3>Where Are These Coords?</h3>
                </Col>
                <Col xs="auto">
                    <Button name="closeWhereIs" color="primary" onClick={props.closeWhereIs}>Exit</Button>
                </Col>
            </Row>
        </Container>
    );
}

function WhereIsBody(props) {
    return (
        <InputGroup className="mt-4">
            <InputGroupAddon addonType="prepend">
                <InputGroupText>Coordinates</InputGroupText>
            </InputGroupAddon>
            <Input
                placeholder="Latitude, Longitude"
            //onChange={e => processCoordinatesInput(e.target.value, props.context)}
            //value={coordinatesInputText}
            //valid={validCoordinates}
            //invalid={!inputBoxEmpty && !validCoordinates}
            />
        </InputGroup>
    );
}

function WhereIsFooter(props) {
    return (
        <Container style={{ paddingTop: '10px', paddingBottom: '10px' }}>
            <Row>
                <Col xs="auto">
                    <Button name="whereIsFind" color="primary" onClick={props.closeWhereIs}>Find</Button>
                </Col>
            </Row>
        </Container>
    );
}