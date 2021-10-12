import React, { useState } from 'react';
import { Collapse, Input, InputGroup, InputGroupAddon, InputGroupText } from 'reactstrap';
import { FaPencilAlt, FaFileUpload, FaSave } from 'react-icons/fa';

export function EditTripName() {
    const [cursor, setCursor] = useState('pointer');
    const [collapse, setCollapse] = useState(false);


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
                My Trip <FaPencilAlt style={{ cursor: cursor }} onMouseDown={handleClick} onMouseUp={changeCursor} onClick={toggle} />
                <LoadTripButton cursor={cursor} handleClick={handleClick} changeCursor={changeCursor} />
                <SaveTripButton cursor={cursor} handleClick={handleClick} changeCursor={changeCursor} />
            </Collapse>
            <Collapse isOpen={collapse}>
                <InputGroup>
                    <Input
                        placeholder="new trip name"
                    />
                    <InputGroupAddon>
                        <InputGroupText style={{ cursor: cursor }} onMouseDown={handleClick} onMouseUp={changeCursor} onClick={toggle}>
                            Done
                        </InputGroupText>
                    </InputGroupAddon>
                </InputGroup>
            </Collapse>
        </th>
    );
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