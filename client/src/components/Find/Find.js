import React, { useEffect, useState } from 'react';
import { Input, InputGroup, Container, Button, 
         Col, Row, Collapse, 
         Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import Results from './Results.js'
import { useFind } from '../../hooks/useFind';
import { FaTimes, FaFilter } from 'react-icons/fa';
import { WHERE_OPT } from '../../utils/constants';
import { FindInput, FindActionsDropdown } from './FindInput.js';

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
                    <FaTimes name="closeFind" data-testid="find-x-button" color="primary" onMouseDown={clearFind} onMouseUp={props.closePage} style={{ cursor: 'pointer' }}/>
                </Col>
            </Row>
        </Container>
    );
}

function FindBody(props) {
    const { matchString, setMatchValue, foundList } = props.context;
    const [isRandom, setRandom]  = useState(false);
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [filterOpen, setFilterOpen] = useState(false);
    const [active, setActive] = useState(WHERE_OPT[0]);
 
    function fetchList() {
        const controller = new AbortController();

        if (!isRandom && active === WHERE_OPT[0]) {
            fetchPlaces(props.context, controller, props.serverSettings);
        }

        else if (!isRandom && active !== WHERE_OPT[0]) {
            fetchPlaces(props.context, controller, props.serverSettings, active);
        }

        else {
            setRandom(false);
        }
        return () => {
            controller.abort();
        };
    }
    useEffect(() => {
        return fetchList();
    }, [matchString, foundList.length, active]);

    return (
        <Container>
            <FindInput context={props.context} serverSettings={props.serverSettings} matchString={matchString} setRandom={setRandom} setMatchValue={setMatchValue}/>
            <Button data-testid="filter-button" onClick={() => setFilterOpen(!filterOpen)} aria-expanded={filterOpen}><FaFilter/>   Search Filter </Button>
                <Collapse isOpen={filterOpen}>
                <p><br lineheight="7 px"></br>Type: </p>{dropdownType(dropdownOpen, setDropdownOpen, active, setActive)}
                </Collapse>
            <Results placesList={foundList} places={props.places} selectedIndex={props.selectedIndex} placeActions={props.placeActions} />
        </Container>
    );

  
}


function dropdownType(dropdownOpen, setDropdownOpen, active, setActive) {
    return <Dropdown isOpen={dropdownOpen} toggle={() => setDropdownOpen(!dropdownOpen)}>
        <DropdownToggle caret>{active}</DropdownToggle>
        <DropdownMenu>
            {WHERE_OPT.map((item, index) => { 
                return <DropdownItem key={index} onClick={()=> setActive(item)}>{item}</DropdownItem>
            })}
        </DropdownMenu>
    </Dropdown>;
}

export function FindInputGroup(props) {
    return (
        <InputGroup>
            <Input type="search" placeholder="Enter Location" data-testid="find-input" value={props.matchString} onChange={(e) => props.setMatchValue(e.target.value)} />
            <FindActionsDropdown active={props.active} context={props.context} serverSettings={props.serverSettings} matchString={props.matchString} setRandom={props.setRandom} setMatchValue={props.setMatchValue} toggle={props.toggle}/>
        </InputGroup>
    );
}

async function fetchPlaces(context, controller, serverSettings, active) {
    const { matchString, getPlaces, setList } = context;
    const placeList = await getPlaces(matchString, controller.signal, serverSettings, active);
    setList(placeList);
}


export async function showRandom(context, serverSettings, setRandom, active) {
    const { getPlaces, setList } = context;
    const controller = new AbortController();
    const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz_';
    const searchChar = alphabet[Math.floor(Math.random() * alphabet.length)];
    setRandom(true);

    const allPlaces = await getPlaces(searchChar, controller.signal, serverSettings, active);
    let randPlaces = [];
    for (let i = 0; i < 5; ++i) {
        randPlaces.push(allPlaces[Math.floor(Math.random() * (100))]);
    }
    setList(randPlaces);
}