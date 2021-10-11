import React, { useState } from 'react';
import { ButtonGroup, DropdownItem, DropdownMenu, DropdownToggle, UncontrolledDropdown, Collapse, Input, InputGroup, InputGroupAddon, InputGroupText, Button } from 'reactstrap';
import { BiDotsVerticalRounded } from 'react-icons/bi';
import { FaHome, FaTrash, FaTrashAlt, FaSearchLocation, FaQuestion, FaPencilAlt, FaFileUpload } from 'react-icons/fa';

export function ItineraryActionsDropdown(props) {
    return (
        <ActionsDropdown {...props}>
            <DropdownItem onClick={() =>
                props.placeActions.moveToHome()} data-testid='home-button'>
                <FaHome />
            </DropdownItem>
            <DropdownItem onClick={() => props.placeActions.removeAll()} data-testid='delete-all-button'>
                <FaTrashAlt />
            </DropdownItem>
            <DropdownItem onClick={props.openFind}>
                <FaSearchLocation />
            </DropdownItem>
            <DropdownItem onClick={props.openWhereIs}>
                <FaQuestion />
            </DropdownItem>
        </ActionsDropdown>
    );
}

export function PlaceActionsDropdown(props) {
    return (
        <ActionsDropdown {...props}>
            <DropdownItem onClick={() => props.placeActions.removeAtIndex(props.index)} data-testid={`delete-button-${props.index}`}>
                <FaTrash />
            </DropdownItem>
        </ActionsDropdown>
    );
}

export function EditTripName(props) {
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

function ActionsDropdown(props) {
    return (
        <UncontrolledDropdown direction="left">
            <DropdownToggle tag="div" data-testid={`row-toggle-${props.index}`}>
                <BiDotsVerticalRounded size="1.5em" />
            </DropdownToggle>
            <DropdownMenu>
                <ButtonGroup>
                    {props.children}
                </ButtonGroup>
            </DropdownMenu>
        </UncontrolledDropdown>
    );
}