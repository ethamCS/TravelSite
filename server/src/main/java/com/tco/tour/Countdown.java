package com.tco.tour;
import com.tco.misc.Places;
import java.util.Arrays;
import java.util.ArrayList;

public class Countdown {

    public int stop; 
    public double seconds;
    public Double countdownStarter;
    public double endTime;
    public double startTime;
    
     public Countdown(double seconds){
         this.stop = 0; 
         this.seconds = seconds;
         this.countdownStarter = ((seconds * 1000 ) /2.0);
         this.startTime = System.currentTimeMillis();
         this.endTime = startTime + countdownStarter;
     }
     public boolean runner(){
        return System.currentTimeMillis() < endTime;
     }
}
