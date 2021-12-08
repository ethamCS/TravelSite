import React, {useState} from "react";
import { Button, Collapse, ButtonGroup, DropdownItem, DropdownMenu, DropdownToggle, UncontrolledDropdown } from "reactstrap";
import { FaDice, FaSearchLocation } from 'react-icons/fa';
import { BiDotsVerticalRounded } from 'react-icons/bi';
import { FindInputGroup, showRandom } from "./Find";

export function FindInput(props){
    const [search, setSearch] = useState(true);

    const toggle = () => {
        setSearch(search);
    }

    return(
        <div>
            <FindInputGroup active={props.active} context={props.context} serverSettings={props.serverSettings} matchString={props.matchString} setRandom={props.setRandom} setMatchValue={props.setMatchValue} toggle={toggle}/>
        </div>
    );
}

export function FindActionsDropdown(props){
    return (
        <FindDropdown {...props}>
            <DropdownItem onClick={props.toggle} data-testId="find-button">
                <FaSearchLocation/>
            </DropdownItem>
            <DropdownItem data-testId="random-button" onClick={async () => showRandom(props.context, props.serverSettings, props.setRandom, props.active)}>
                <FaDice/>
            </DropdownItem>
        </FindDropdown>
    );
}

function FindDropdown(props) {
    return (
        <UncontrolledDropdown direction='left' >
            <DropdownToggle data-testid={'FindInput Dropdown'} color='none'>
                <BiDotsVerticalRounded/>
            </DropdownToggle>
            <DropdownMenu>
                <ButtonGroup>
                    {props.children}
                </ButtonGroup>
            </DropdownMenu>
        </UncontrolledDropdown>
    );
}