package com.tco.tour;
import com.tco.distances.Calculate; 
import com.tco.requests.Places;
import com.tco.requests.Place;
import java.util.Arrays;

public class Optimize{

    public Tour tour; 
    public int[][] distance;
    public int distanceFound;
    public int tourDistance; 
    public int shortestTourDistance;
    public int[] shortestTour;  
 
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

    public boolean[] resetVisited(){
        return tour.visited;
    }

    public int findIndexOfPlace(Place targetCity){
        return tour.places.indexOf(targetCity);

    }

    public boolean[] updateVisitedByIndex(int index){
        return tour.visited;
    }

    public boolean[] updateVisitedByPlace(Place currentPlace){
 
        return tour.visited;
    }

    public boolean isvalidIndex(int indexOfCurrent, int currentDist, int shortest){
       return (!tour.visited[indexOfCurrent] && currentDist < shortest);
    }
     
}
