package com.tco.tour;
import com.tco.distances.Calculate; 
import com.tco.requests.Places;
import com.tco.requests.Place;
import java.util.Arrays;

public class Optimize{
    
    public Tour tour; 
    public int shortestTourDistance;
    public int[][] distance;
    
    
    public Optimize(Tour tour){
        this.tour = tour; 
        this.shortestTourDistance = Integer.MAX_VALUE;
    }

    public int[][] distancesMatrix(){      
        return distance;             
    }

}