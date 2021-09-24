package com.tco.requests;

import java.util.ArrayList;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import com.tco.database.Query;

public class FindRequest extends Request {

    private String match;
    private Integer limit;
    private Integer found;
    private Places places;
    private final transient Logger log = LoggerFactory.getLogger(FindRequest.class);

    @Override
    public void buildResponse(){
        Query query = new Query(this.match, this.limit);
        this.found = query.selectCount();
        
        this.places = query.selectAll();
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

    public Integer getLimit(){
        return this.limit;
    }

    public Integer getFound(){
        return this.found;
    }
    
}