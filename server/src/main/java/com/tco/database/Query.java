package com.tco.server;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.Statement;
import java.sql.ResultSet;
import com.tco.requests.FindRequest;

public class Query {

    private Connection con; 
    private Credentials db;
    private FindRequest findRequest;
    private static String match = null;
    private static int limit = 0;

   public Query(){
       this.match = findRequest.getMatch();
       this.limit = findRequest.getLimit();
       runner();
   }
    public void runner(){
        Credentials db = new Credentials();
        connect();
        find(this.match,this.limit);
    }
    public void find(String match, int limit){

    }
    static class Credentials {
        final static String USER = "cs314-db";
        final static String PASSWORD = "eiK5liet1uej";
        final static String URL = "jdbc:mariadb://127.0.0.1:66666/cs314";
      }

    public void connect(){
        try {
            con = DriverManager.getConnection(db.URL,db.USER, db.PASSWORD);  
        } catch (Exception e) {
            e.printStackTrace();
            System.out.println("Connection Error");
        }
    }
}

