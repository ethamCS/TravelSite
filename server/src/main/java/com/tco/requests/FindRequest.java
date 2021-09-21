package com.tco.requests;

import java.util.ArrayList;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public class FindRequest extends Request {

    private String match;
    private Integer limit;
    private Integer found;
    private Places places;

    @Override
    public void buildResponse(){
        found = 0;
        places = new Places<>;
        log.trace("buildResponse -> {}", this);
    }


/* The following methods exist only for testing purposes and are not used
during normal execution, including the constructor. */
    public FindRequest() {
        this.requestType = "find";
        this.match = "";
        this.limit = 0;
    }

    public String getMatch(){
        return this.match;
    }
    
}