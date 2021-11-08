package com.tco.requests;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import com.tco.misc.BadRequestException;
import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;


public class TestTourRequest {
    private TourRequest tour;

    @BeforeEach
    public void createConfigurationForTestCases() throws BadRequestException {
        tour = new TourRequest();
        tour.buildResponse();
    }

    
    @Test
    @DisplayName("Request type is \"tour\"")
    public void testType() {
        String type = tour.getRequestType();
        assertEquals("tour", type);
    }

    @Test
    @DisplayName("Earth Radius is \"3959.0\"")
    public void testEarthRadius() {
        Double earthRadius = tour.getEarthRadius();
        assertEquals(3959.0, earthRadius);
    }

    @Test
    @DisplayName("Response Time is \"0.0\"")
    public void testResponseTime() {
        Double responseTime = tour.getResponseTime();
        assertEquals(0.0, responseTime);
    }

    
}
