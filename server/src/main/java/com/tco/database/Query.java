package com.tco.database;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.Statement;
import java.sql.ResultSet;
import com.tco.database.DatabaseConnection;
import java.sql.*;


public class Query {

    private static String match;
    private static Integer limit;

   public Query(String match, Integer limit){
       this.match = match;
       this.limit = limit;     
   }
    public Integer selectCount(String match,Integer limit){
        int result = 0;
        try {
            DatabaseConnection.connect();
            PreparedStatement stmt = DatabaseConnection.con.prepareStatement("SELECT COUNT(*)"
                                                                            + " FROM continent" 
                                                                            + " JOIN country ON continent.id = country.continent"
                                                                            + " JOIN region ON country.id = region.iso_country"
                                                                            + " JOIN world ON region.id = world.iso_region"
                                                                            + " WHERE (world.name LIKE \'%"+this.match+"%\' OR continent.name"
                                                                            + " LIKE \'%"+this.match+"%\'"
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
            /* TODO: Change System.out.println to Logger */
            System.out.println(e.getMessage());
            
        }
        return result;
    }

    public void selectAll(){
        int result = 0;
        try {
            DatabaseConnection.connect();
            PreparedStatement stmt = DatabaseConnection.con.prepareStatement("SELECT world.name, world.continent, world.latitude,"
                                                                            + " world.longitude, region.name"
                                                                            + " FROM continent" 
                                                                            + " JOIN country ON continent.id = country.continent"
                                                                            + " JOIN region ON country.id = region.iso_country"
                                                                            + " JOIN world ON region.id = world.iso_region"
                                                                            + " WHERE (world.name LIKE \'%"+this.match+"%\' OR continent.name"
                                                                            + " LIKE \'%"+this.match+"%\'"
                                                                            + " OR region.name LIKE \'%"+this.match+"%\' OR country.name LIKE \'%"+this.match+"%\')"
                                                                            + " GROUP BY world.latitude"
                                                                            + " LIMIT ?;");
                                                              
            stmt.setInt(1,this.limit);
            ResultSet rs =  stmt.executeQuery(); 

            if (!rs.next()) {
                result = -1;
            } 
            else {
                convertQueryResultsToPlaces(rs);
            }
            
            
        } catch (Exception e){
            /* TODO: Change System.out.println to Logger */
            System.out.println(e.getMessage());
            
        }
     
    }
      /* TODO: Change result set to places object */
    public void convertQueryResultsToPlaces(ResultSet results){
        
      }
  
}
