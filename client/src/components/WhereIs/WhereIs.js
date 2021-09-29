import React from "react";
import { Input, Container, Button, Col, Row, InputGroup, InputGroupAddon, InputGroupText } from 'reactstrap';

export default function WhereIs(props) {

    return (
        <Container>
            <WhereIsHeader closeWhereIs={props.closeWhereIs} context={context} />
            <WhereIsBody context={context} />
            <WhereIsFooter closeWhereIs={props.closeWhereIs} context={context} />
        </Container>
    );
}

function WhereIsHeader(props) {
    return (
        <Container style={{ paddingTop: '10px' }}>
        </Container>
    );
}

function WhereIsBody(props) {
    return (
        <InputGroup className="mt-4">

        </InputGroup>
    );
}

function WhereIsFooter(props) {
    return (
        <Container style={{ paddingTop: '10px', paddingBottom: '10px' }}>
        </Container>
    );
}