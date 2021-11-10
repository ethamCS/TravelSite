package com.tco.tour;
import com.tco.distances.Distances; 
import com.tco.distances.Calculate; 
import com.tco.requests.Places;
import com.tco.requests.Place;
import java.util.Arrays;
import java.util.ArrayList;

public class Tour {
    public Places places; 
    public Double earthRadius;  
    public Double response; 
    public boolean[] visited; 
    public int[] currentTour; 

    public Tour(Double earthRadius, Places places){
        this.earthRadius = earthRadius; 
        this.places = places;
       
        
    }
}
