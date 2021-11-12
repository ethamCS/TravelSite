import React, { useState } from 'react';
import { Container, Button, ButtonGroup, Row, Col, Tooltip } from 'reactstrap';
import { FaCheck } from 'react-icons/fa';
import { useTour } from '../../hooks/useTour';

export default function Shorter(props) {
    const [tooltipOpen, setToolTipOpen] = useState(false);
    const [optimizedTrip, setOptimizedTrip] = useState(false);
    const [origTrip, setOrigTrip] = useState(true);
    const {tourList, tourActions} = useTour();

    const origClick = () => {
        const controller = new AbortController();
        setOrigTrip(true);
        setOptimizedTrip(false);
    };

    const optClick = () => {
        setOptimizedTrip(true);
        setOrigTrip(false);
        tourActions.getTour(props.places, props.serverSettings, controller.signal);
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
