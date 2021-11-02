package com.tco.requests;
import java.util.ArrayList;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import com.tco.distances.Distances; 
import com.tco.distances.Calculate; 
import com.tco.misc.BadRequestException;
import com.tco.tour.Tour; 

public class TourRequest extends Request {
    private Places places; 
    private Double earthRadius;
    private Integer[] distances; 
    
    private final transient Logger log = LoggerFactory.getLogger(FindRequest.class); 
    
     public void buildResponse() throws BadRequestException {
        log.trace("buildResponse -> {}", this);
    }
    
}
