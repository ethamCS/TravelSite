public class Credentials {
    
    private String USER;
    private String PASSWORD;
    private  String URL;

    public Credentials(){
        this.USER = "cs314-db";
        this.PASSWORD = "eiK5liet1uej";
        this.URL = "jdbc:mysql://127.0.0.1:66666/cs314";
    }

    public String getUSER(){
        return this.USER;
    }

    public String getPASSWORD(){
        return this.PASSWORD;
    }

    public String getURL(){
        return this.URL;
    }
}
