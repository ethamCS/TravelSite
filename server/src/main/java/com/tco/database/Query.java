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
    public Integer selectCount(String match, int limit){
        int result = 0;
        try {
            DatabaseConnection.connect();

            PreparedStatement stmt = DatabaseConnection.con.prepareStatement("select count(name) from world where name like \'%" + match + "%\'");  
            ResultSet rs =  stmt.executeQuery(); 

            if (!rs.next()) {
                result = -1;
            } 
            else {
                result = rs.getInt("count(name)");
            }
            
            
        } catch (Exception e){
            /* TODO: Change System.out.println to Logger */
            System.out.println(e.getMessage());
            
        }
        return result;
    }
}

