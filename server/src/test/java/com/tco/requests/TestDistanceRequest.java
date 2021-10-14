package com.tco.requests;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;

import java.util.Arrays;

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

    @Test
    @DisplayName("Earth Radius is \"3959\" miles")
    public void testEarthRadius() {
        Double earthRad = dist.getEarthRadius();
        assertEquals(3959.0, earthRad);
    }


    @Test
    @DisplayName("Distances found is \"98, 69, 69\"")
    public void testDistances() {
        Integer[] expectedResult = new Integer[]{98, 69, 69};
        Integer[] result = dist.getDistances();
        assertTrue(Arrays.equals(expectedResult, result));
    }
}