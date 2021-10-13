package com.tco.distances;
import com.tco.requests.Places;
import com.tco.requests.Place;
import java.lang.Math.*;

public class Calculate {
  
  private String place1Name;
  private Double place1Longitude;
  private Double place1Latitude;
  private String place2Name;
  private Double place2Longitude;
  private Double place2Latitude;
  private Double absoluteDifferenceLongitude;
  private Double absoluteDifferenceLatitude;
  private Double thetaBBy;
  
  
   public Double degree2Rad(Double degree){
       Double radians = (degree * (Math.PI/180));
       return radians; 
    }
  
    public Double absoluteDifferences(Double num1, Double num2){
        double difference = 0; 
        difference = Math.abs(num1-num2);
        return difference;
    }

}
