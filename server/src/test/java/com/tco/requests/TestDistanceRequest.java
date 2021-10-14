package com.tco.requests;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertTrue;

public class TestDistanceRequest {

    private DistancesRequest dist;

    @BeforeEach
    public void createConfigurationForTestCases() {
        dist = new DistancesRequest();
        dist.buildResponse();
    }

    @Test
    @DisplayName("Request type is \"distances\"")
    public void testType() {
        String type = dist.getRequestType();
        assertEquals("distances", type);
    }

//    @Test
//    @DisplayName("Match is \"\"")
//    public void testMatch() {
//    }

    @Test
    @DisplayName("Earth Radius is in miles with value of \"3959\"")
    public void testEarthRadius() {
        Double earthRad = dist.getEarthRadius();
        assertEquals(3959.0, earthRad);
    }

//
//    @Test
//    @DisplayName("Query found is \"50427\"")
//    public void testFound() {
//    }
}