import React, { useEffect, useState } from 'react';
import { Input, InputGroup, Container, Button, Col, Row } from 'reactstrap';
import Results from './Results.js'
import { useFind } from '../../hooks/useFind';
import { FaDice, FaTimes } from 'react-icons/fa';

export default function Find(props) {
    const [matchString, setMatchValue, getPlaces] = useFind("");
    const [foundList, setList] = useState([]);
    const context = { matchString, setMatchValue, getPlaces, foundList, setList };
    return (
        <Container>
            <FindHeader closePage={props.closePage} context={context} />
            <FindBody places={props.places} selectedIndex={props.selectedIndex} placeActions={props.placeActions} context={context} serverSettings={props.serverSettings} />
        </Container>
    );
}

function FindHeader(props) {
    const { setMatchValue, setList } = props.context;

    const clearFind = () => {
        setMatchValue("");
        setList([]);
    }

    return (
        <Container>
            <Row>
                <Col>
                    <h3>Find Locations</h3>
                </Col>
                <Col xs="auto">
                    <FaTimes name="closeFind" color="primary" onMouseDown={clearFind} onMouseUp={props.closePage} style={{ cursor: 'pointer' }}/>
                </Col>
            </Row>
        </Container>
    );
}

function FindBody(props) {

    const { matchString, setMatchValue, getPlaces, foundList, setList } = props.context;


    function handleChange(e) {
        e.preventDefault();
        setMatchValue(e.target.value);
    }

    useEffect(() => {
        const controller = new AbortController();
        async function fetchPlaces(matchString) {
            const placeList = await getPlaces(matchString, controller.signal, props.serverSettings);
            setList(placeList);
        }
        fetchPlaces(matchString);

        return () => {
            controller.abort();
        }
    }, [matchString, foundList.length]);

    return (
        <Container>
            <InputGroup>
                <Input type="text" placeholder="Enter Location" data-testid="find-input" value={matchString} onChange={handleChange} />
                <Button color="primary">
                    <FaDice />
                </Button>
            </InputGroup>
            <Results placesList={foundList} places={props.places} selectedIndex={props.selectedIndex} placeActions={props.placeActions} />
        </Container>
    );
}