import React, { useState } from 'react';
import { Collapse, Input, InputGroup, InputGroupAddon, InputGroupText } from 'reactstrap';
import { FaPencilAlt, FaFileUpload, FaSave } from 'react-icons/fa';

export function EditTripName() {
    const [cursor, setCursor] = useState('pointer');
    const [collapse, setCollapse] = useState(false);
    const [tripName, setName] = useState("My Trip");

    const changeCursor = () => {
        setCursor(prevState => {
            if (prevState === 'pointer') {
                return 'grabbing';
            }
            return 'pointer';
        });
    }

    const handleClick = (e) => {
        changeCursor();
    }

    const toggle = () => setCollapse(!collapse);

    return (
        <th>
            <Collapse isOpen={!collapse}>
                {tripName} <FaPencilAlt style={{ cursor: cursor }} onMouseDown={handleClick} onMouseUp={changeCursor} onClick={toggle} />
                <LoadTripButton cursor={cursor} handleClick={handleClick} changeCursor={changeCursor} />
                <SaveTripButton cursor={cursor} handleClick={handleClick} changeCursor={changeCursor} />
            </Collapse>
            <Collapse isOpen={collapse}>
                <TripInput cursor={cursor} tripName={tripName} setName={setName} handleClick={handleClick} changeCursor={changeCursor} toggle={toggle}/>
            </Collapse>
        </th>
    );
}

function TripInput(props){
    return(
        <InputGroup>
            <Input
                placeholder={props.tripName}
                onChange={e => props.setName(e.target.value)}
                valid={nameValid(props.tripName)}
                invalid={!nameValid(props.tripName)}
            />
            <InputGroupAddon>
                <InputGroupText style={{ cursor : props.cursor}} onMouseDown={props.handleClick} onMouseUp={props.changeCursor} onClick={props.toggle}>
                    Done
                </InputGroupText>
            </InputGroupAddon>
        </InputGroup>
    );
}

function nameValid(props){
    return true;
}

export function LoadTripButton(props) {

    return (
        <FaFileUpload style={{ cursor: props.cursor, marginLeft: '10px' }} onMouseDown={props.handleClick} onMouseUp={props.changeCursor} />
    );
}

export function SaveTripButton(props) {
    return (
        <FaSave style={{ cursor: props.cursor, marginLeft: '10px' }} onMouseDown={props.handleClick} onMouseUp={props.changeCursor} />
    );
}