package com.tco.tour;

public class Optimize{
    
    public Tour tour; 
    public int shortestTourDistance;
    
    
    public Optimize(Tour tour){
        this.tour = tour; 
        this.shortestTourDistance = Integer.MAX_VALUE;
    }

}