
import React, { useState } from 'react';
import { Input, Container, Button, Col, Row } from 'reactstrap';
import Results from './Results.js'
import { usePlaces } from '../../hooks/usePlaces';
import { useFind } from '../../hooks/useFind';

export default function Find(props) {
    const {places, selectedIndex, placeActions} = usePlaces();
    const context = { places, selectedIndex, placeActions };

    return (
        <Container>
            <FindHeader closePage={props.closePage} />
            <FindBody context={context}/>
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
    const [ userValue, setUserValue ] = useState("");
    const [ matchString, sendFindRequest ] = useFind(userValue);

    function handleChange(e, context) {
        e.preventDefault();
        setUserValue(e.target.value);
        //console.log(matchString);
        //console.log(sendFindRequest(matchString, 0))
    }
    
    return (
        <Container>
            <Input placeholder="Enter Location" />
            <Results />
        </Container>

    );
}