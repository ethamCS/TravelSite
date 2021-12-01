package com.tco.tour;

import com.tco.distances.Calculate;
import com.tco.misc.Places;
import com.tco.misc.Place;
import java.util.Arrays;

public class NewTour {
    private Places placesList;
    private int size;
    private Double earthRadius;
    private int[] currentTour;
    private int[] shortestTour;
    private boolean[] visited;
    private int originalDistance;
    private int[][] distanceMatrix;
    private int[] originalTour;
    private int currentTourDistance;
    private int shortestTourDistance;
    //private Double endTime;

    public NewTour(Places placesList, Double earthRadius/*, Double endTime*/) {
        this.placesList = placesList;
        this.size = placesList.size();
        this.earthRadius = earthRadius;
        this.currentTour = new int[this.size];
        this.shortestTour = new int[this.size];
        this.visited = new boolean[this.size];
        this.originalDistance = 0;
        createDistancesMatrix();
        createOriginalTour();
        this.shortestTourDistance = this.currentTourDistance;
        //this.endTime = endTime;
    }

    private void createDistancesMatrix(){
        this.distanceMatrix = new int[this.size][this.size];
        Calculate calc = new Calculate();

        for (int i = 0; i < this.size; i++) {
            for (int j = i; j < this.size; j++) {
                if (i == j) {
                    this.distanceMatrix[i][j] = 0;
                }
                else{
                    int distanceFound = calc.circleDistance(this.placesList.get(i), this.placesList.get(j), this.earthRadius);
                    this.distanceMatrix[i][j] = distanceFound;
                    this.distanceMatrix[j][i] = distanceFound;
                    if (j == (i + 1)) {
                        this.originalDistance += distanceFound;
                    }
                }             
            }                   
        }
        this.originalDistance += calc.circleDistance(this.placesList.get(0), this.placesList.get(this.size - 1), this.earthRadius);
    }

    private void createOriginalTour() {
        this.originalTour = new int[this.size];
        for (int i = 0; i < this.size; ++i) {
            this.originalTour[i] = i;
            this.shortestTour[i] = i;
        }
    }

    private void resetVisited() {
        for (int i = 0; i < this.size; ++i) {
            this.visited[i] = false;
        }
    }

    public /*Places*/ void findBestKNNTour() {
        for (int i = 0; i < this.size; ++i) {
            createNearestNeighborTour(i);
            // if (this.currentTourDistance < this.shortestTourDistance) {
            //     updateShortestTour();
            // }
            resetVisited();
        }
        // TODO: Rearrange places based on shortest tour and return the new places list
    }

    private void createNearestNeighborTour(int startCityIndex) {
        // Add starting city to tour and mark it visited
        this.currentTour[startCityIndex] = this.originalTour[startCityIndex];
        this.visited[startCityIndex] = true;

        
        int currentCityIndex = startCityIndex;
        int nextCityIndex = (startCityIndex + 1 < this.size) ? startCityIndex + 1 : 0;

        // Loop through unvisited cities and find nearest neighbor
        for (int i = 1; i < this.size; ++i) {
            int nearestNeighborDistance = this.distanceMatrix[currentCityIndex][nextCityIndex];
            
            System.out.println("");
            /* Find closest neighbor */
            for (int j = 0; j < this.size; ++j) {
                if (this.visited[j]) {
                    continue;
                }
                else {
                    // Get the distance b/n current city and 
                    int currentDistance = this.distanceMatrix[currentCityIndex][j];
                    System.out.println(currentDistance + " " + nearestNeighborDistance);
                    if (currentDistance < nearestNeighborDistance) {
                        nearestNeighborDistance = currentDistance;
                        this.currentTour[i] = j;
                        this.visited[j] = true;
                        this.currentTourDistance += currentDistance;
                        currentCityIndex = (currentCityIndex + 1 < this.size) ? currentCityIndex + 1 : 0;
                    }
                }
            }
        }
        testPrint();
    }

    private void updateShortestTour() {
        for (int i = 0; i < this.size; ++i) {
            this.shortestTour[i] = this.currentTour[i];
        }
    }


    private void testPrint() {
        System.out.println("Current Tour");
        for (int i = 0; i < this.size; ++i) {
            System.out.print(this.currentTour[i] + " ");
        }
        System.out.println("");
    }

}
