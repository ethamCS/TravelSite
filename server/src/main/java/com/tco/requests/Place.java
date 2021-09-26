package com.tco.requests;

import java.util.LinkedHashMap;

public class Place extends LinkedHashMap<String,String> {

    public Place() {
        this.put("name", "");
        this.put("latitude", "");
        this.put("longitude", "");
    }

}
