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
        try{            
            PreparedStatement stmt = DatabaseConnection.con.prepareStatement("select count(name) from world where name like'%?%' limit ?");  
            stmt.setString(1, match);  
            stmt.setInt(2, limit); 
            ResultSet rs =  stmt.executeQuery(); 
            if(!rs.next()){
                return -1;
            }else{
                int result = rs.getInt("count(name)");
                return result;
            }
            
            
        }catch (Exception e){
            System.out.println(e.getMessage());
            
        }
        return 0;
    }
}

