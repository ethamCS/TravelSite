import React, { useState } from 'react';
import { ButtonGroup, DropdownItem, DropdownMenu, DropdownToggle, UncontrolledDropdown, Tooltip } from 'reactstrap';
import { BiDotsVerticalRounded } from 'react-icons/bi';
import { FaHome, FaTrash, FaTrashAlt, FaSearchLocation, FaQuestion } from 'react-icons/fa';

export function ItineraryActionsDropdown(props) {
    const [tooltipOpenHome, setToolTipOpenHome] = useState(false);
    const [tooltipOpenRemove, setToolTipOpenRemove] = useState(false);
    const [tooltipOpenFind, setToolTipOpenFind] = useState(false);
    const [tooltipOpenWhereIs, setToolTipOpenWhereIs] = useState(false);
    return (
        <ActionsDropdown {...props}>
            <DropdownItem onClick={() =>
                props.placeActions.moveToHome()} data-testid='home-button'>
                <FaHome id="tooltip-home" />
                <Tooltip placement={'left'} delay={{ show: 500, hide: 100 }} flip isOpen={tooltipOpenHome} toggle={() => { setToolTipOpenHome(!tooltipOpenHome) }} data-testid="tool-tip-home" target="tooltip-home">Current Location!</Tooltip>
            </DropdownItem>
            <DropdownItem onClick={() => props.placeActions.removeAll()} data-testid='delete-all-button'>
                <FaTrashAlt id="tooltip-remove" />
                <Tooltip placement={'left'} delay={{ show: 500, hide: 100 }} flip isOpen={tooltipOpenRemove} toggle={() => { setToolTipOpenRemove(!tooltipOpenRemove) }} data-testid="tool-tip-remove" target="tooltip-remove">Remove All Places!</Tooltip>
            </DropdownItem>
            <DropdownItem onClick={props.openFind}>
                <FaSearchLocation id="tooltip-find" />
                <Tooltip placement={'left'} delay={{ show: 500, hide: 100 }} flip isOpen={tooltipOpenFind} toggle={() => { setToolTipOpenFind(!tooltipOpenFind) }} data-testid="tool-tip-find" target="tooltip-find">Find Places!</Tooltip>
            </DropdownItem>
            <DropdownItem onClick={props.openWhereIs}>
                <FaQuestion id="tooltip-whereis" />
                <Tooltip placement={'left'} delay={{ show: 500, hide: 100 }} flip isOpen={tooltipOpenWhereIs} toggle={() => { setToolTipOpenWhereIs(!tooltipOpenWhereIs) }} data-testid="tool-tip-whereis" target="tooltip-whereis">Find Place By Coordinates!</Tooltip>
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