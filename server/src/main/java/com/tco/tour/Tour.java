package com.tco.tour;
import com.tco.requests.Places;
import java.util.Arrays;
import java.util.ArrayList;

public class Tour {
    public Places places; 
    public Double earthRadius;  
    public Double response; 
    public boolean[] visited; 
    public int[] currentTour; 

    public Tour(Double earthRadius, Places places, Double response){
        this.response = response;
        this.earthRadius = earthRadius; 
        this.places = places;
        this.visited = new boolean[this.places.size()];
        this.currentTour = new int[this.places.size()];       
    }
}
