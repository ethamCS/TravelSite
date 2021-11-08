import React, { useState } from 'react';
import { Input, Container, Button, Col, Row, InputGroup, InputGroupAddon, InputGroupText, Modal } from "reactstrap";

export default function SaveTripModal(props) {
    const [fileName, setFileName] = useState("My File");
    return (
        <Modal isOpen={props.isOpen}>
            <SaveTripHeader closeSaveTrip={props.closeSaveTrip} />
            <SaveTripBody fileName={fileName} setFileName={setFileName} />
            <SaveTripFooter tripName={props.tripName} placeActions={props.placeActions} closeSaveTrip={props.closeSaveTrip} />
        </Modal>
    );
}

function SaveTripHeader(props) {
    return (
        <Container style={{ paddingTop: '10px' }}>
            <Row>
                <Col>
                    <h3>Save Trip</h3>
                </Col>
                <Col xs="auto">
                    <Button name="closeSaveTripModal" color="primary" onClick={props.closeSaveTrip}>X</Button>
                </Col>
            </Row>
        </Container>
    );
}

function SaveTripBody(props) {

    return (
        <InputGroup className="SaveTripInput">
            <InputGroupAddon addonType="prepend">
                <InputGroupText>File Name</InputGroupText>
            </InputGroupAddon>
            <Input
                placeholder={props.tripName}
                data-testid="saveTripModal-input"
            />
        </InputGroup>
    );
}

function SaveTripFooter(props) {
    const saveJSON = () => {
        props.placeActions.saveFile(props)
    };

    const saveCSV = () => {
        props.placeActions.saveCSV(props)
    };

    return (
        <Container style={{ paddingTop: '10px', paddingBottom: '10px' }}>
            <Row xs="4">
                <Col />
                <Col>
                    <Button color={"primary"} onClick={saveJSON} onMouseUp={props.closeSaveTrip}>.JSON</Button>
                </Col>
                <Col>
                    <Button color={"primary"} onMouseDown={saveCSV} onMouseUp={props.closeSaveTrip}>.CSV</Button>
                </Col>
                <Col />

            </Row>
        </Container>
    );
}