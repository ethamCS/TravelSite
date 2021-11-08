package com.tco.tour;
import com.tco.distances.Distances; 
import com.tco.distances.Calculate; 
import com.tco.requests.Places;
import com.tco.requests.Place;
import java.util.Arrays;
import java.util.ArrayList;

public class Tour {
    private Places places; 
    private Double earthRadius;
    public Integer[] distances;  
    public int distanceFound;

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

        for (int i = 0; i < size; i++)
            for (int j = i; j < size; j++) {
                if (i == j) {
                    distance[i][j] = 0;
                }
                else{
                    Calculate calc = new Calculate();
                    distanceFound = calc.circleDistance(this.places.get(i), this.places.get(j), this.earthRadius);
                    distance[i][j] = distanceFound;
                    distance[j][i] = distanceFound;
                }
                
            }
          
        return distance;             
    }


    public Tour(Double earthRadius, Places places){
        this.earthRadius = earthRadius; 
        this.places = places;
       
        
    }
}
