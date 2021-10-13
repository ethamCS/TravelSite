package com.tco.distances;
import java.util.ArrayList;
import com.tco.requests.Places;
import com.tco.requests.Place;
import com.tco.distances.Calculate; 

public class Distances{
    private String name; 
    private Double earthRadius;
    private Integer latitude; 
    private Integer longitude;
    private Integer origin; 
    private Integer destination; 
    private Places places;
    private Double[] distances; 
  
  
    public Distances(Places places, Double earthRadius){
        this.places = places;
        this.earthRadius = earthRadius;
        this.destination = null; 
        this.origin = null; 
        this.distances = new Double[places.size()-1];
    } 

}


