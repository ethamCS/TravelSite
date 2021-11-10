package com.tco.tour;
import com.tco.distances.Calculate; 
import com.tco.requests.Places;
import com.tco.requests.Place;
import java.util.Arrays;

public class Optimize{
    
    public Tour tour; 
    public int shortestTourDistance;
    public int[][] distance;
    public int distanceFound;
 
    public Optimize(Tour tour){
        this.tour = tour; 
        this.shortestTourDistance = Integer.MAX_VALUE;
    }

    public int[][] distancesMatrix(){  
        int size = tour.places.size();
        distance = new int[size][size];

        for (int i = 0; i < size; i++)
            for (int j = i; j < size; j++) {
                if (i == j) {
                    distance[i][j] = 0;
                }
                else{
                    Calculate calc = new Calculate();
                    distanceFound = calc.circleDistance(tour.places.get(i), tour.places.get(j), tour.earthRadius);
                    distance[i][j] = distanceFound;
                    distance[j][i] = distanceFound;
                }                
            }        
        return distance;             
    }    
                
}