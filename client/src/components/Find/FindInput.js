import React, {useState} from "react";
import { Button, Col, Collapse, Container } from "reactstrap";
import { FaDice, FaSearchLocation, FaQuestion } from 'react-icons/fa';
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
            </Collapse>
            <Button onClick={toggle}>Temp</Button>
        </div>
    );
}