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

//    @Test
//    @DisplayName("Request type is \"find\"")
//    public void testType() {
//        String type = find.getRequestType();
//        assertEquals("find", type);
//    }
//
//    @Test
//    @DisplayName("Match is \"\"")
//    public void testMatch() {
//        String match = find.getMatch();
//        assertEquals("", match);
//    }
//
//    @Test
//    @DisplayName("Limit is \"0\"")
//    public void testLimit() {
//        Integer limit = find.getLimit();
//        assertEquals(0, limit);
//    }
//
//
//    @Test
//    @DisplayName("Query found is \"50427\"")
//    public void testFound() {
//        Integer found = find.getFound();
//        assertEquals(50427, found);
//    }
}