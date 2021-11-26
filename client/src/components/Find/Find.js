import React, { useEffect, useState } from 'react';
import { Input, InputGroup, Container, Button, Col, Row, Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import Results from './Results.js'
import { useFind } from '../../hooks/useFind';
import { FaDice, FaTimes } from 'react-icons/fa';

export default function Find(props) {
    const [matchString, setMatchValue, getPlaces] = useFind("");
    const [foundList, setList] = useState([]);
    const [dropdownOpen, setDropdownOpen] = useState('false');
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
            {renderInputGroup(props.context, props.serverSettings, matchString, setRandom, setMatchValue)}
            <Results placesList={foundList} places={props.places} selectedIndex={props.selectedIndex} placeActions={props.placeActions} />
        </Container>
    );
}

function renderInputGroup(context, serverSettings, matchString, setRandom, setMatchValue) {
    return (
        <InputGroup>
            <Input type="text" placeholder="Enter Location" data-testid="find-input" value={matchString} onChange={(e) => setMatchValue(e.target.value)} />
            <DropdownToggle caret>where</DropdownToggle>
            <DropdownMenu>
                <DropdownItem name = "Type">Type</DropdownItem>
                <DropdownItem name = "Where"> Where </DropdownItem>
                <DropdownItem name = "Random"> Random </DropdownItem>
            </DropdownMenu>
            <Button color="primary" onClick={async () => showRandom(context, serverSettings, setRandom)}>
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