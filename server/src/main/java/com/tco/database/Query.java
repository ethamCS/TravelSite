package com.tco.database;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.Statement;
import java.sql.ResultSet;
import com.tco.database.DatabaseConnection;
import java.sql.*;

import com.tco.requests.Places;
import com.tco.requests.Place;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public class Query {

    private static String match;
    private static Integer limit;

    private final transient Logger log = LoggerFactory.getLogger(Query.class);

   public Query(String match, Integer limit){
       this.match = match;
       this.limit = limit;     
   }
    public Integer selectCount() {
        int result = 0;
        try {
            DatabaseConnection.connect();
            PreparedStatement stmt = DatabaseConnection.con.prepareStatement("SELECT COUNT(*)"
                                                                            + " FROM continent" 
                                                                            + " JOIN country ON continent.id = country.continent"
                                                                            + " JOIN region ON country.id = region.iso_country"
                                                                            + " JOIN world ON region.id = world.iso_region"
                                                                            + " WHERE (world.municipality LIKE \'%"+this.match+"%\'"
                                                                            + " OR world.name LIKE \'%"+this.match+"%\'" 
                                                                            + " OR continent.name LIKE \'%"+this.match+"%\'"
                                                                            + " OR region.name LIKE \'%"+this.match+"%\'" 
                                                                            + " OR country.name LIKE \'%"+this.match+"%\')");

            ResultSet rs =  stmt.executeQuery(); 
            if (!rs.next()) {
                result = -1;
            } 
            else {
                result = rs.getInt("count(*)");
            }
            
            
        } catch (Exception e){
            log.error("Database connection failed");  
        }
        return result;
    }

    public Places selectAll(){
        int result = 0;
        Places places = new Places();
        try {
            DatabaseConnection.connect();
            PreparedStatement stmt = DatabaseConnection.con.prepareStatement("SELECT world.name, world.continent, world.latitude,"
                                                                            + " world.longitude, world.municipality, region.name"
                                                                            + " FROM continent" 
                                                                            + " JOIN country ON continent.id = country.continent"
                                                                            + " JOIN region ON country.id = region.iso_country"
                                                                            + " JOIN world ON region.id = world.iso_region"
                                                                            + " WHERE (world.municipality LIKE \'%"+this.match+"%\'"
                                                                            + " OR world.name LIKE \'%"+this.match+"%\'"
                                                                            + " OR continent.name LIKE \'%"+this.match+"%\'"
                                                                            + " OR region.name LIKE \'%"+this.match+"%\'"
                                                                            + " OR country.name LIKE \'%"+this.match+"%\')"
                                                                            + " GROUP BY world.latitude"
                                                                            + " LIMIT ?;");
                                                              
            stmt.setInt(1,this.limit);
            ResultSet rs =  stmt.executeQuery(); 

            if (!rs.next()) {
                result = -1;
            } 
            else {
                places = convertQueryResultsToPlaces(rs);
            }       
        } catch (Exception e){
            log.error("Database Connection failed");         
        }
        return places;
    }

    public Places convertQueryResultsToPlaces(ResultSet results){
        Places places = new Places();
        try {
            while (results.next()) {
                Place place = new Place();
                for (Place.Entry<String, String> entry : place.entrySet()) {
                    String key = entry.getKey();
                    place.put(key, results.getString(key));
                }
                places.add(place);
            }
        } catch (Exception e) {
            log.error("Failed to convert ResultSet to Places");
        }
        return places;
    }
  
}
