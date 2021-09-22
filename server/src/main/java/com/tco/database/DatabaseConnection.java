package com.tco.database;

import java.sql.Connection;
import java.sql.DriverManager;

public class DatabaseConnection {

    public static Connection con;

    public static void connect() {
        try {
            Credentials db = new Credentials();
            con = DriverManager.getConnection(db.getURL(), db.getUSER(), db.getPASSWORD());
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}