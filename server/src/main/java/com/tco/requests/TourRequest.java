package com.tco.requests;
import java.util.ArrayList;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import com.tco.distances.Distances; 
import com.tco.distances.Calculate; 
import com.tco.misc.BadRequestException;
import com.tco.tour.Tour; 
import com.tco.tour.Optimize; 
import com.tco.tour.Countdown; 

import com.tco.misc.Places;
import com.tco.misc.DummyPlaces;

public class TourRequest extends Request {
    private Places places; 
    private Double response;
    private Double earthRadius;
    
    private final transient Logger log = LoggerFactory.getLogger(TourRequest.class); 
    
     public void buildResponse() throws BadRequestException {
        Tour tour = new Tour(this.earthRadius, this.places, this.response);
        Countdown count = new Countdown(this.response);
        if(response > 0.0){
            Optimize knn = new Optimize(tour);
            knn.distancesMatrix();
            //see if times up
            while(count.timer()){
                this.places = knn.startTourFromCity(); 
                break;
            }
        }  
        log.trace("buildResponse -> {}", this);
    }

     /* The following methods exist only for testing purposes and are not used
    during normal execution, including the constructor. */
    
    public TourRequest() {
        this.requestType = "tour";
        this.earthRadius = 3959.0;
        this.response = 0.0;
        Countdown count = new Countdown(this.response);
        DummyPlaces place = new DummyPlaces();
        places = place.getDummyPlaces();
    }

    public Double getEarthRadius() {
        return this.earthRadius;
    }

    public Double getresponse() {
        return this.response;
    }
    
}
