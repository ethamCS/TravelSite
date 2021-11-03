import React from "react";
import { Input, Container, Button, Col, Row, InputGroup, InputGroupAddon, InputGroupText, DropdownToggle, Dropdown, Modal, DropdownItem } from 'reactstrap';

export default function SaveTripModal(props) {

    return (
        <Modal isOpen={props.isOpen}>
            <SaveTripHeader closeSaveTrip={props.closeSaveTrip} />
            <SaveTripBody />
            <SaveTripFooter />
        </Modal>
    );
}

export function SaveTripHeader(props) {
    return (
        <Container style={{ paddingTop: '10px' }}>
            <Row>
                <Col>
                    <h3>Save Trip</h3>
                </Col>
                <Col xs="auto">
                    <Button name="closeSaveTripModal" color="primary" onClick={props.closeSaveTrip}>Exit</Button>
                </Col>
            </Row>
        </Container>
    );
}

export function SaveTripBody(props) {
    return (
        <InputGroup className="SaveTripInput">
            <InputGroupAddon addonType="prepend">
                <InputGroupText>File Name</InputGroupText>
            </InputGroupAddon>
            <Input
                placeholder="This Will Be TripName Prop"
                data-testid="saveTripModal-input"
            />
        </InputGroup>
    );
}

export function SaveTripFooter(props) {
    return (
        <Container style={{ paddingTop: '10px', paddingBottom: '10px' }}>
            <Row>
                <Col xs="auto">
                    <Button name="saveTripSave" color="primary" >Save</Button>
                </Col>
            </Row>
        </Container>
    );
}