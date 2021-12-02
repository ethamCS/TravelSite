import React, { useState } from 'react';
import { ButtonGroup, DropdownItem, DropdownMenu, DropdownToggle, UncontrolledDropdown, Tooltip } from 'reactstrap';
import { BiDotsVerticalRounded } from 'react-icons/bi';
import { FaHome, FaTrash, FaTrashAlt, FaSearchLocation, FaQuestion, FaTachometerAlt } from 'react-icons/fa';

export function ItineraryActionsDropdown(props) {
    return (
        <ActionsDropdown {...props}>
            <DropdownItem onClick={() =>
                props.placeActions.moveToHome()} data-testid='home-button'>
                <FaHome id="tooltip-home" />
                <TooltipPreset id="tooltip-home" msg="Current Location!" />
            </DropdownItem>
            <DropdownItem onClick={() => props.placeActions.removeAll()} data-testid='delete-all-button'>
                <FaTrashAlt id="tooltip-remove" />
                <TooltipPreset id="tooltip-remove" msg="Remove All Places!" />
            </DropdownItem>
            <DropdownItem onClick={props.openFind}>
                <FaSearchLocation id="tooltip-find" />
                <TooltipPreset id="tooltip-find" msg="Find Places!" />
            </DropdownItem>
            <DropdownItem onClick={props.openWhereIs}>
                <FaQuestion id="tooltip-whereis" />
                <TooltipPreset id="tooltip-whereis" msg="Find Place By Coordinates!" />
            </DropdownItem>
            <DropdownItem onClick={props.toggleShorter}>
                <FaTachometerAlt id="tooltip-optimize" data-testid="optimize" />
                <TooltipPreset id="tooltip-optimize" msg ="Optimize Trip!" />
            </DropdownItem>
        </ActionsDropdown>
    );
}

function TooltipPreset(props){
    const [tooltipOpen, setToolTipOpen] = useState(false);
    return(
        <Tooltip placement={'left'} delay={{ show: 500, hide: 100 }} flip isOpen={tooltipOpen} toggle={() => { setToolTipOpen(!tooltipOpen) }} data-testid={props.id} target={props.id}>{props.msg}</Tooltip>
    )
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