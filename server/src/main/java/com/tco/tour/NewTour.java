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

    /************************************************************************************************************************  
    * This function is used in the constructor to create the distance lookup table and calculate the initial trip distance
    *************************************************************************************************************************/
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

    /**************************************************************************************************** 
    * This function is used in the constructor for initializing data member arrays
    ****************************************************************************************************/
    private void createOriginalTour() {
        this.originalTour = new int[this.size];
        for (int i = 0; i < this.size; ++i) {
            this.originalTour[i] = i;
            this.shortestTour[i] = i;
        }
    }

    /**************************************************************************************************** 
    * This function resets the necessary variables for the next tour to be found correctly
    ****************************************************************************************************/
    private void resetVisitedAndCurrentDistance() {
        for (int i = 0; i < this.size; ++i) {
            this.visited[i] = false;
        }
        this.currentTourDistance = 0;
    }

    /**************************************************************************************************** 
    * This is the public API used to start the process of finding the best tour
    ****************************************************************************************************/
    public /*Places*/ void findBestKNNTour() {
        for (int i = 0; i < this.size; ++i) {
            createNearestNeighborTour(i);
            if (this.currentTourDistance < this.shortestTourDistance) {
                updateShortestTour();
            }
            resetVisitedAndCurrentDistance();
        }
        // TODO: Rearrange places based on shortest tour and return the new places list

    }

    /**************************************************************************************************** 
    * This function greedily creates the nearest neighbor tour from a given starting city
    ****************************************************************************************************/
    private void createNearestNeighborTour(int startCityIndex) {
        /* Add starting city to tour and mark it visited */
        this.currentTour[0] = this.originalTour[startCityIndex];
        this.visited[startCityIndex] = true;
        int currentCityIndex = startCityIndex;
        
        /* Loop through unvisited cities and find nearest neighbor */
        for (int i = 1; i < this.size; ++i) {
            // int nearestNeighborIndex = (currentCityIndex + 1 < this.size) ? currentCityIndex + 1 : 0;
            // int nearestNeighborDistance = this.distanceMatrix[currentCityIndex][nearestNeighborIndex];
            int nearestNeighborIndex = this.size;
            int nearestNeighborDistance = Integer.MAX_VALUE;

            /* Find closest neighbor */
            for (int j = 0; j < this.size; ++j) {
                // System.out.println("j: " + j);
                if (this.visited[j]) {
                    continue;
                }
                else {
                    // Get the distance b/n current city and 
                    int currentDistance = this.distanceMatrix[currentCityIndex][j];
                    if ((currentDistance < nearestNeighborDistance) && (currentDistance != 0)) {
                        nearestNeighborDistance = currentDistance;
                        nearestNeighborIndex = j;
                    }
                    // System.out.println("Current City: " + currentCityIndex);
                    // System.out.println("Current Distance: " + currentDistance);
                    // System.out.println("NearestNeigherDistance: " + nearestNeighborDistance);
                    // System.out.println("NearestNeigherIndex: " + nearestNeighborIndex);
                }
            }

            /* Add Nearest Neighbor to tour and update visited */
            this.currentTour[i] = nearestNeighborIndex;
            this.currentTourDistance += nearestNeighborDistance;
            this.visited[nearestNeighborIndex] = true;
            currentCityIndex = nearestNeighborIndex;
        }
        /* Add distance of return leg */
        int lastCity = this.currentTour[this.size - 1];
        this.currentTourDistance += this.distanceMatrix[startCityIndex][lastCity];
        testPrint();
    }

    private void updateShortestTour() {
        for (int i = 0; i < this.size; ++i) {
            this.shortestTour[i] = this.currentTour[i];
        }
    }

    private void shiftArray() {
        
    }

    private void testPrint() {
        System.out.println("Current Tour: " + this.currentTourDistance);
        for (int i = 0; i < this.size; ++i) {
            System.out.print(this.currentTour[i] + " ");
        }
        System.out.println("\n\n");
    }

}
