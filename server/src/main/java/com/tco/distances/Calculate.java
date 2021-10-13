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
  
  public Double circleDistance(Place p1, Place p2, Double radius){
       
      double foundDistance = 0; 

      place1Latitude = degree2Rad(Double.parseDouble(p1.get("latitude")));
      place1Longitude = degree2Rad(Double.parseDouble(p1.get("longitude")));
      place1Name = p1.get("name");

      place2Latitude = degree2Rad(Double.parseDouble(p2.get("latitude")));
      place2Longitude = degree2Rad(Double.parseDouble(p2.get("longitude")));
      place2Name = p1.get("name");

      absoluteDifferenceLongitude = absoluteDifferences(place1Longitude, place2Longitude);
      absoluteDifferenceLatitude = absoluteDifferences(place1Latitude, place2Latitude);


      Double numerator1 = Math.pow( (Math.cos(place1Latitude) * Math.sin(absoluteDifferenceLongitude)), 2);
      Double numerator2 = Math.cos(place1Latitude) * Math.sin(place2Latitude); 
      Double numerator3 = Math.sin(place1Latitude) * Math.cos(place2Latitude) * Math.cos(absoluteDifferenceLongitude);
      Double numerator4 = numerator2 - numerator3;
      Double numeratorFinal = Math.sqrt(numerator1 + Math.pow(numerator4, 2));

      Double denominator0 = Math.sin(place1Latitude) * Math.sin(place2Latitude);
      Double denominator1 = Math.cos(place1Latitude) * Math.cos(place2Latitude) * Math.cos(absoluteDifferenceLongitude);
      Double dFinal = denominator0 + denominator1;
   
      thetaBBy = Math.atan2(numeratorFinal, dFinal);

      //foundDistance = arctan(radius, thetaBBy);
      return foundDistance; 

    }
    

}
