package com.tco.requests;
import java.util.ArrayList;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import com.tco.database.Query;

public class DistancesRequest extends Request{
    private Places places; 
    private Double earthRadius;
    private Integer[] distancesI; 
    private Double[] distances; 
    private String match; 
    private Integer limit; 
    private final transient Logger log = LoggerFactory.getLogger(FindRequest.class);
    
     public Integer[] doubleToIntegerArray(Double[] doubleArray){
       
    }
 
    @Override
    public void buildResponse() {
        Query query = new Query(this.match, this.limit);
        this.places = query.selectAll();
        log.trace("buildResponse -> {}", this);
    }

    public DistancesRequest() {
        this.requestType = "distances";
        this.earthRadius = 6371.0;
    
    }
}
