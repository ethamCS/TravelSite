package com.tco.requests;
import java.util.ArrayList;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;


public class DistancesRequest extends Request{
    private Places places; 
    private Double earthRadius;
    private Integer[] distances; 
    private String match; 
    private Integer limit; 
 
    @Override
    public void buildResponse() {
        Query query = new Query(this.match, this.limit);
        this.places = query.selectAll();
        log.trace("buildResponse -> {}", this);
    }

    public DistancesRequest() {
        this.requestType = "distances";
        this.earthRadius = 6371.0;
        this.match = "";
        this.limit = 0;
    }
}