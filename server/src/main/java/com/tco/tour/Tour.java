package com.tco.tour;
import com.tco.distances.Distances; 
import com.tco.distances.Calculate; 
import com.tco.requests.Places;
import com.tco.requests.Place;

public class Tour {
    private Places places; 
    private Double earthRadius;
    public Integer[] distances;  

    public Integer[] doubleToIntegerArray(Double[] doubleArray){
        distances = new Integer[doubleArray.length];
        for(int i = 0; i < doubleArray.length; i++){
            distances[i] = doubleArray[i].intValue();
        }
        return distances;    
    }
    public int[][] distancesMatrix(){
        int size = this.places.size();
        int distance[][] = new int[size][size];

        return distance;             
    }


    public Tour(Double earthRadius, Places places){
        this.earthRadius = earthRadius; 
        this.places = places;
        
    }
}
