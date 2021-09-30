
import React, { useCallback, useEffect, useState } from 'react';
import { Input, Container, Button, Col, Row, TableRow } from 'reactstrap';
import Results from './Results.js'
import { usePlaces } from '../../hooks/usePlaces';
import { useFind } from '../../hooks/useFind';

export default function Find(props) {
    return (
        <Container>
            <FindHeader closePage={props.closePage} />
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
    const [ matchString, setMatchValue, getPlaces ] = useFind("");
    const [list, setList] = useState([]);

    function handleChange(e) {
        e.preventDefault();
        setMatchValue(e.target.value);
    }
    
    const fetchPlaces = useCallback(async () => {
        const placeList = await getPlaces(matchString);
        setList(placeList);
    }, [matchString]);

    useEffect(() => {
        fetchPlaces();
    }, [fetchPlaces]);
    
    return (
        <Container>
            <Input type="text"
                    placeholder="Enter Location"
                    value={matchString}
                    onChange={handleChange} />
            <div>
            </div>
        </Container>

    );
}