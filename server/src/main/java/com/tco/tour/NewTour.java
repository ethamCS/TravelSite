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
    private int currentTourDistance;
    private int shortestTourDistance;
    private Double endTime;

    public NewTour(Places placesList, Double earthRadius, Double endTime) {
        this.placesList = placesList;
        this.size = placesList.size();
        this.earthRadius = earthRadius;
        this.currentTour = new int[this.size];
        this.shortestTour = new int[this.size];
        this.visited = new boolean[this.size];
        this.originalDistance = 0;
        createDistancesMatrix();
        this.shortestTourDistance = this.currentTourDistance;
        this.endTime = endTime;
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

    public findBestKNNTour() {


    }



}
