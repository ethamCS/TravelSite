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
    
    private final transient Logger log = LoggerFactory.getLogger(TourRequest.class); 
    
     public void buildResponse() throws BadRequestException {
        Tour tour = new Tour(this.earthRadius, this.places);
        log.trace("buildResponse -> {}", this);
    }

     /* The following methods exist only for testing purposes and are not used
    during normal execution, including the constructor. */
    
    public TourRequest() {
        this.requestType = "tour";
        this.earthRadius = 3959.0;
        DummyPlaces place = new DummyPlaces();
        places = place.getDummyPlaces();
    }
    
}
