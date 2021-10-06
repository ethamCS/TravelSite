package com.tco.requests;
import java.util.ArrayList;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;


public class DistancesRequest extends Request{
    private Places places; 
    private Double earthRadius;
    private Integer[] distances; 
 
    @Override
    public void buildResponse() {
    }
}
