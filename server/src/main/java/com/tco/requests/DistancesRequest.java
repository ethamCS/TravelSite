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
    
     public Integer[] doubleToIntegerArray(Double[] doubleArray){
        distances = new Integer[doubleArray.length];
        for(int i = 0; i < doubleArray.length; i++){
            distances[i] = doubleArray[i].intValue();
        }
        return distances;    
    }
 
    @Override
    public void buildResponse() {
        Distances distance = new Distances(this.places, this.earthRadius);
        this.distances = doubleToIntegerArray(distance.SendInfoForCalculations());
        log.trace("buildResponse -> {}", this);
    }

    public DistancesRequest() {
        this.requestType = "distances";
        this.earthRadius = 3959.0;
    
    }
}
