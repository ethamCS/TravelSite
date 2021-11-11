package com.tco.tour;

import java.util.Arrays;
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
    @DisplayName("Expected Distances Matrix Optimized \"true\"")
    public void testDistancesMatrix(){ 
        int[][] expected = {{0, 24, 59} ,{24, 0, 41}, {59, 41, 0}};
        int[][] result = optimize.distancesMatrix();
        assertTrue(Arrays.deepEquals(result, expected));
    }

    @Test
    public void testStartTourFromCity(){
    //    optimize.startTourFromCity();
    }    


    @Test
    public void testCalcNearestNeighborDistance(){
     
    }

    @Test
    @DisplayName("Visited places is now \"false\"")
    public void testResetVisited(){
        boolean[] expected = new boolean[optimize.tour.places.size()];
        Arrays.fill(expected, false);
        boolean[] result = optimize.resetVisited();
        assertTrue(Arrays.equals(result, expected));
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
    public void testUpdatePlaceOrder(){
     
    }

    @Test
    public void testUpdateShortestTourOrder(){
      
    }

    @Test
    public void testUpdateShortestTour(){
      
    }

  
    
}
