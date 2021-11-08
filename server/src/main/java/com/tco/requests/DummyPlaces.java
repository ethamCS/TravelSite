/**
 * Dummy test case for places, only for test purposes.
 */

package com.tco.requests;

public class DummyPlaces{
    private Places places;

    public DummyPlaces() {
        this.places = new Places();
        Place place1 = new Place();
        place1.put("name", "place A");
        place1.put("latitude", "0");
        place1.put("longitude", "1");

        Place place2 = new Place();
        place2.put("name", "place B");
        place2.put("latitude", "1");
        place2.put("longitude", "0");

        Place place3 = new Place();
        place3.put("name", "place C");
        place3.put("latitude", "1");
        place3.put("longitude", "1");

        this.places.add(place1);
        this.places.add(place2);
        this.places.add(place3);
    }

    public Places getDummyPlaces(){
        return this.places;
    }
}