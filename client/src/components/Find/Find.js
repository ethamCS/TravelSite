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
    const { matchString, setMatchValue, foundList } = props.context;
    const  [ isRandom, setRandom ]  = useState(false);

    useEffect(() => {
        const controller = new AbortController();
        if (!isRandom) {
            fetchPlaces(props.context, controller, props.serverSettings);
        }
        else {
            setRandom(false);
        }
        return () => {
            controller.abort();
        }
    }, [matchString, foundList.length]);

    return (
        <Container>
            <FindInputGroup context={props.context} serverSettings={props.serverSettings} matchString={matchString} setRandom={setRandom} setMatchValue={setMatchValue} />
            <Results placesList={foundList} places={props.places} selectedIndex={props.selectedIndex} placeActions={props.placeActions} />
        </Container>
    );
}

function FindInputGroup(props) {
    return (
        <InputGroup>
            <Input type="text" placeholder="Enter Location" data-testid="find-input" value={props.matchString} onChange={(e) => props.setMatchValue(e.target.value)} />
            <Button color="primary" onClick={async () => showRandom(props.context, props.serverSettings, props.setRandom)}>
                <FaDice />
            </Button>
        </InputGroup>
    );
}

async function fetchPlaces(context, controller, serverSettings) {
    const { matchString, getPlaces, setList } = context;
    const placeList = await getPlaces(matchString, controller.signal, serverSettings);
    setList(placeList);
}

async function showRandom(context, serverSettings, setRandom) {
    const { getPlaces, setList } = context;
    const controller = new AbortController();
    const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789_';
    const searchChar = alphabet[Math.floor(Math.random() * alphabet.length)];
    setRandom(true);

    const allPlaces = await getPlaces(searchChar, controller.signal, serverSettings);
    let randPlaces = [];
    for (let i = 0; i < 5; ++i) {
        randPlaces.push(allPlaces[Math.floor(Math.random() * (100))]);
    }
    setList(randPlaces);
}