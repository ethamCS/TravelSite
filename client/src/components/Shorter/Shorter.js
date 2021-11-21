import React, { useState } from 'react';
import { Container, Button, ButtonGroup, Row, Col, Tooltip } from 'reactstrap';
import { FaCheck } from 'react-icons/fa';
import { useTour } from '../../hooks/useTour';

export default function Shorter(props) {
    const [tooltipOpen, setToolTipOpen] = useState(false);
    const [optimizedTrip, setOptimizedTrip] = useState(false);
    const [origTrip, setOrigTrip] = useState(true);
    const {tourList, tourActions} = useTour();
    const [tempList, setTempList] = useState(props.places);

    const context = {setOptimizedTrip, optimizedTrip, origTrip, setOrigTrip, setTempList, tourActions, tempList};


    const origClick = () => {
        setOrigTrip(true);
        setOptimizedTrip(false);
        props.placeActions.setTour(tempList);
    };

    const optClick = async () => {
        const controller = new AbortController();
        setOptimizedTrip(true);
        setOrigTrip(false);
        setTempList(props.places);
        const list = await tourActions.getTour(props.places, props.serverSettings, controller.signal);
        props.placeActions.setTour(list);
    }

    return (
        <Container>
            <Row xs='4'>
                <Col />
                <Col>Pick a Trip to Display: </Col>
                <ButtonGroup size='sm'>
                    <Button color='primary' outline size='sm' active={optimizedTrip} onClick={optClick}>
                        Optimized Trip
                    </Button>
                    <Button color='primary' outline size='sm' active={origTrip} onClick={origClick}>
                        Original Trip
                    </Button>
                </ButtonGroup>
                <Col>
                    <FaCheck id="accept-tooltip" onClick={props.toggleShorter} style={{ cursor: 'pointer' }}/>
                    <Tooltip delay={{ show:500, hide: 100 }} flip isOpen={tooltipOpen} toggle={() => {setToolTipOpen(!tooltipOpen)}} target="accept-tooltip" >Keep Trip</Tooltip>
                </Col>
            </Row>
        </Container>
    );
}
