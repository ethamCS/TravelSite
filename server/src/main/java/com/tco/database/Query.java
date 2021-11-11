package com.tco.database;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.Statement;
import java.sql.ResultSet;
import com.tco.database.DatabaseConnection;
import java.sql.*;
import java.util.Map;

import com.tco.misc.Places;
import com.tco.misc.Place;
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
        String query =  "SELECT COUNT(*)"
                        + " FROM world"
                        + " INNER JOIN continent ON world.continent = continent.id"
                        + " INNER JOIN country ON world.iso_country = country.id"
                        + " INNER JOIN region ON world.iso_region = region.id"
                        + " WHERE (world.name LIKE \'%" + this.match + "%\'"
                        + " OR continent.name LIKE \'%" + this.match + "%\'"
                        + " OR world.municipality LIKE \'%" + this.match + "%\'"
                        + " OR country.name LIKE \'%" + this.match + "%\'"
                        + " OR region.name LIKE \'%" + this.match + "%\')"
                        + " ;";

        return query;
    }
    public Integer selectCount() {
        String selectCountStatement = buildSelectCountQuery();
        try {
            Statement query = DatabaseConnection.con.createStatement();
            ResultSet rs =  query.executeQuery(selectCountStatement);
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
        String selectAllStatement = buildSelectAllQuery(); 
        try {
            Statement query = DatabaseConnection.con.createStatement();
            ResultSet rs =  query.executeQuery(selectAllStatement);
            
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
