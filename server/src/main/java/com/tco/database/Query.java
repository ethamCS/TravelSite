package com.tco.database;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.Statement;
import java.sql.ResultSet;
import com.tco.database.DatabaseConnection;
import java.sql.*;
import java.util.Map;

import com.tco.requests.Places;
import com.tco.requests.Place;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public class Query {

    private static String match;
    private static Integer limit;
    private Places places;
    private Integer result;

    private final transient Logger log = LoggerFactory.getLogger(Query.class);

   public Query(String match, Integer limit){
       this.match = match;
       this.limit = (limit == 0) ? 100 : (limit);
       this.places = new Places();
       this.result = 0;
       DatabaseConnection.connect();
   }
    public String buildSelectAllQuery(){
        String query =  "SELECT world.name, world.latitude, world.longitude, world.municipality,"
                        + " region.name, country.name, continent.name, world.altitude"
                        + " FROM world"
                        + " INNER JOIN continent ON world.continent = continent.id"
                        + " INNER JOIN country ON world.iso_country = country.id"
                        + " INNER JOIN region ON world.iso_region = region.id"
                        + " WHERE (world.name LIKE \'%" + this.match + "%\'"
                        + " OR continent.name LIKE \'%" + this.match + "%\'"
                        + " OR world.municipality LIKE \'%" + this.match + "%\'"
                        + " OR country.name LIKE \'%" + this.match + "%\'"
                        + " OR region.name LIKE \'%" + this.match + "%\')"
                        + " LIMIT " + this.limit+ ";";

        return query;
    }
    public String buildSelectCountQuery(){
        String query = "";
        return query;
    }
    public Integer selectCount() {
        try {
            PreparedStatement stmt = DatabaseConnection.con.prepareStatement("SELECT COUNT(*)"
                                                                            + " FROM continent" 
                                                                            + " JOIN country ON continent.id = country.continent"
                                                                            + " JOIN region ON country.id = region.iso_country"
                                                                            + " JOIN world ON region.id = world.iso_region"
                                                                            + " WHERE (world.municipality LIKE ?"
                                                                            + " OR world.name LIKE ?"
                                                                            + " OR world.id LIKE ?"
                                                                            + " OR continent.name LIKE ?"
                                                                            + " OR region.name LIKE ?"
                                                                            + " OR country.name LIKE ?)");

            for (int i = 1; i <= 6; i++) {
                stmt.setString(i, "%" + this.match + "%");
            }
            
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
        try {
           PreparedStatement stmt = DatabaseConnection.con.prepareStatement("SELECT world.name, world.continent, world.latitude, world.id,"
                                                                                + " world.longitude, world.municipality, region.name"
                                                                                + " FROM continent" 
                                                                                + " JOIN country ON continent.id = country.continent"
                                                                                + " JOIN region ON country.id = region.iso_country"
                                                                                + " JOIN world ON region.id = world.iso_region"
                                                                                + " WHERE (world.municipality LIKE ?"
                                                                                + " OR world.name LIKE ?"
                                                                                + " OR world.id LIKE ?"
                                                                                + " OR continent.name LIKE ?"
                                                                                + " OR region.name LIKE ?"
                                                                                + " OR country.name LIKE ?)"
                                                                                + " GROUP BY world.latitude"
                                                                                + " LIMIT ?;");

            for (int i = 1; i <= 6; i++) {
                stmt.setString(i, "%" + this.match + "%");
            }
            
            stmt.setInt(7, this.limit);
            
                                  
            ResultSet rs =  stmt.executeQuery();

            if (!rs.next()) {
                result = -1;
            }
            else {
                places = convertQueryResultsToPlaces(rs);
            }
        } catch (Exception e){
            log.error(e.getMessage());         
        }
        return places;
    }

    public Places convertQueryResultsToPlaces(ResultSet results){
        try {
            do {
                Place place = new Place();
                place.put("name", results.getString("name"));
                place.put("latitude", results.getString("latitude"));
                place.put("longitude", results.getString("longitude"));
                places.add(place);
            }
            while (results.next());
            
        } catch (Exception e) {
            log.error("Failed to convert ResultSet to Places");
        }
        return places;
    }


    /* For testing use only */

    public Places getPlaces(){
       return this.places;
    }

    @Override
    public String toString() {
        return getPlaces().toString();
    }
}
