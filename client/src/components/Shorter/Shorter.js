import React, { useState } from 'react';
import { Container, Button, ButtonGroup, Row, Col, Tooltip } from 'reactstrap';
import { FaCheck } from 'react-icons/fa';
import { useTour } from '../../hooks/useTour';

export default function Shorter(props) {
    const [optimizedTrip, setOptimizedTrip] = useState(false);
    const [origTrip, setOrigTrip] = useState(true);
    const {tourList, tourActions} = useTour();
    const [tempList, setTempList] = useState(props.places);

    const context = {setOptimizedTrip, optimizedTrip, origTrip, setOrigTrip, setTempList, tourActions, tempList};

    return (
        <Container>
            <Row xs='4'>
                <Col />
                <Col>Pick a Trip to Display: </Col>
                <ButtonGroup size='sm'>
                    <Button color='primary' outline size='sm' active={optimizedTrip} onClick={() => optClick(props.places, props.serverSettings, props.placeActions, context)}>
                        Optimized Trip
                    </Button>
                    <Button color='primary' outline size='sm' active={origTrip} onClick={() => origClick(props.placeActions, context)}>
                        Original Trip
                    </Button>
                </ButtonGroup>
                <CheckButton toggleShorter={props.toggleShorter} />
            </Row>
        </Container>
    );
}

function CheckButton(props) {
    const [tooltipOpen, setToolTipOpen] = useState(false);

    return (
        <Col>
            <FaCheck id="accept-tooltip" onClick={props.toggleShorter} style={{ cursor: 'pointer' }}/>
            <Tooltip delay={{ show:500, hide: 100 }} flip isOpen={tooltipOpen} toggle={() => {setToolTipOpen(!tooltipOpen)}} target="accept-tooltip" >Keep Trip</Tooltip>
        </Col>
    );
}

function origClick(placeActions, context) {
    const {origTrip, setOrigTrip, setOptimizedTrip, tempList} = context;

    if(!origTrip) {
        setOrigTrip(true);
        setOptimizedTrip(false);
        placeActions.setTour(tempList);
    }
}

async function optClick(places, serverSettings, placeActions, context) {
    const {optimizedTrip, setOrigTrip, setOptimizedTrip, setTempList, tourActions} = context;

    if (!optimizedTrip) {
        const controller = new AbortController();
        setOptimizedTrip(true);
        setOrigTrip(false);
        setTempList(places);
        const list = await tourActions.getTour(places, serverSettings, controller.signal);
        placeActions.setTour(list);
    }
}