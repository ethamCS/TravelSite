package com.tco.tour;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertTrue;

public class TestOptimize{
    
    private Optimize optimize;


    @BeforeEach
    public void createConfigurationForTestCases() {
       this.optimize = new Optimize(new Tour());
    }

    @Test
    public void testDistancesMatrix(){  
        optimize.distancesMatrix();
        for(int i = 0; i < optimize.distance.length; i++){
            for (int j = 0; j < optimize.distance.length; j++){
                System.out.print(optimize.distance[i][j] + " ");
            }
        }
    }


    @Test
    public void testResetVisited(){

    }

    @Test
    public void testFindIndexOfPlace(){
    }

    @Test
    public void testUpdateVisitedByIndex(){
    }

    @Test
    public void testUpdateVisitedByPlace(){

    }

    @Test
    public void testIsvalidIndex(){
    }


    @Test
    public void testCalcNearestNeighborIndex(){
      
    }

    @Test
    public void testAddFinalLegDistance(){
        
    }


    @Test
    public void testCalcNearestNeighborDistance(){
     
    }

    @Test
    public void testUpdatePlaceOrder(){
     
    }

    @Test
    public void testUpdateShortestTourOrder(){
      
    }

    @Test
    public void testUpdateShortestTour(){
      
    }

    @Test
    public void testStartTourFromCity(){
       
    }    
    
}
