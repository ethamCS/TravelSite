package com.tco.requests;
import java.util.ArrayList;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import com.tco.database.Query;
import com.tco.distances.Distances; 
import com.tco.distances.Calculate; 

public class DistancesRequest extends Request{
    private Places places; 
    private Double earthRadius;
    private Integer[] distancesI; 
    private Double[] distances; 
    private String match; 
    private Integer limit; 
    private final transient Logger log = LoggerFactory.getLogger(FindRequest.class);
    
     public Integer[] doubleToIntegerArray(Double[] doubleArray){
        distancesI = new Integer[doubleArray.length];
        for(int i = 0; i < doubleArray.length; i++){
            distancesI[i] = doubleArray[i].intValue();
        }
        return distancesI;    
    }
 
    @Override
    public void buildResponse() {
       
        log.trace("buildResponse -> {}", this);
    }

    public DistancesRequest() {
        this.requestType = "distances";
        this.earthRadius = 6371.0;
    
    }
}
