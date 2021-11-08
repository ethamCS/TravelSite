package com.tco.requests;

import java.util.ArrayList;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import com.tco.distances.Distances; 
import com.tco.distances.Calculate; 

public class DistancesRequest extends Request{
    private Places places; 
    private Double earthRadius;
    private Integer[] distances;  
    private String match; 
    private Integer limit; 
    private final transient Logger log = LoggerFactory.getLogger(DistancesRequest.class);
    
   
 
    @Override
    public void buildResponse() {
        Distances distance = new Distances(this.places, this.earthRadius);
        this.distances = distance.SendInfoForCalculations();
        log.trace("buildResponse -> {}", this);
    }

    /* The following methods exist only for testing purposes and are not used
    during normal execution, including the constructor. */
    public DistancesRequest() {
        this.requestType = "distances";
        DummyPlaces place = new DummyPlaces();
        places = place.getDummyPlaces();
        this.earthRadius = 3959.0;
    }

    public Places getPlaces(){ return this.places; }

    public Double getEarthRadius() { return this.earthRadius; }

    public Integer[] getDistances() { return this.distances; }

}
