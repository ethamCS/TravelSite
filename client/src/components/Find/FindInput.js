import React, {useState} from "react";
import { Button, Collapse, ButtonGroup, DropdownItem, DropdownMenu, DropdownToggle, UncontrolledDropdown } from "reactstrap";
import { FaDice, FaSearchLocation } from 'react-icons/fa';
import { BiDotsVerticalRounded } from 'react-icons/bi';
import { FindInputGroup, showRandom } from "./Find";

export function FindInput(props){
    const [search, setSearch] = useState(true);
    const [random, setRandom] = useState(false);

    const toggle = () => {
        setSearch(!search);
        setRandom(!random);
    }

    return(
        <div>
            <Collapse isOpen={search}>
                <FindInputGroup context={props.context} serverSettings={props.serverSettings} matchString={props.matchString} setRandom={props.setRandom} setMatchValue={props.setMatchValue}/>
            </Collapse>
            <Collapse isOpen={random}>
                <b>Random Places!  </b>
                <Button color="primary" data-testid="randomButton" onClick={async () => showRandom(props.context, props.serverSettings, props.setRandom, props.active)}><FaDice/></Button>
                <FindActionsDropdown toggle={toggle}/>
            </Collapse>
            <FindActionsDropdown toggle={toggle}/>
        </div>
    );
}

function FindActionsDropdown(props){
    return (
        <FindDropdown {...props}>
            <DropdownItem onClick={props.toggle}>
                <FaSearchLocation/>
            </DropdownItem>
            <DropdownItem onClick={props.toggle}>
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