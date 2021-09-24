package com.tco.requests;

import java.util.HashMap;

public class Place extends HashMap<String,String> {

    public Place() {
        this.put("name", "");
        this.put("latitude", "");
        this.put("longitude", "");
    }

}
