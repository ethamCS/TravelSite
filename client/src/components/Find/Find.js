import React, { useEffect, useState } from 'react';
import { Input, Container, Button, Col, Row } from 'reactstrap';
import Results from './Results.js'
import { useFind } from '../../hooks/useFind';

export default function Find(props) {
    return (
        <Container>
            <FindHeader closePage={props.closePage} />
            <FindBody places={props.places} selectedIndex={props.selectedIndex} placeActions={props.placeActions} />
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
    const [ matchString, setMatchValue, getPlaces ] = useFind("");
    const [foundList, setList] = useState([]);

    function handleChange(e) {
        e.preventDefault();
        setMatchValue(e.target.value);
    }
    
    useEffect(() => {
        const controller = new AbortController();
        async function fetchPlaces(matchString) {
            const placeList = await getPlaces(matchString, controller.signal);
            setList(placeList);
        }
        fetchPlaces(matchString);

        return () => {
            controller.abort();
        }
    }, [matchString, foundList.length]);

    return (
        <Container>
            <Input type="text"
                    placeholder="Enter Location"
                    value={matchString}
                    onChange={handleChange} />
            <Results placesList={foundList} places={props.places} selectedIndex={props.selectedIndex} placeActions={props.placeActions} />
        </Container>

    );
}
