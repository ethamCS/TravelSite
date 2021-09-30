import React from 'react';
import { Col, Container, Row } from 'reactstrap';
import Map from './Map/Map';
import Itinerary from './Itinerary/Itinerary';
import { usePlaces } from '../../hooks/usePlaces';

export default function Planner(props) {

    return (
        <Container>
            <Section>
                <Map places={props.places} selectedIndex={props.selectedIndex} placeActions={props.placeActions} />
            </Section>
            <Section>
                <Itinerary places={props.places} selectedIndex={props.selectedIndex} placeActions={props.placeActions} openFind={props.openFind} openWhereIs={props.openWhereIs} />
            </Section>
        </Container>
    );
}

function Section(props) {
    return (
        <Row>
            <Col sm={12} md={{ size: 10, offset: 1 }}>
                {props.children}
            </Col>
        </Row>
    );
}