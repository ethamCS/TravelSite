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
        Tour tour = new Tour(this.earthRadius, this.places);
        log.trace("buildResponse -> {}", this);
    }

     /* The following methods exist only for testing purposes and are not used
    during normal execution, including the constructor. */
    public TourRequest() {
        this.requestType = "tour";
        this.places = new Places();

        Place place1 = new Place();
        place1.put("name", "place A");
        place1.put("latitude", "0");
        place1.put("longitude", "1");

        Place place2 = new Place();
        place2.put("name", "place B");
        place2.put("latitude", "1");
        place2.put("longitude", "0");

        Place place3 = new Place();
        place3.put("name", "place C");
        place3.put("latitude", "1");
        place3.put("longitude", "1");

        this.places.add(place1);
        this.places.add(place2);
        this.places.add(place3);
        this.earthRadius = 3959.0;
    }
    
}
