package com.tco.requests;
import java.util.ArrayList;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;


public class DistancesRequest extends Request{
    private Places places; 
    private Float earthRadius;
    private Integer[] distances; 
    private String requestType;

    public DistancesRequest(){
        this.requestType = "distances";
        this.earthRadius = 6371.0; 
    }

}