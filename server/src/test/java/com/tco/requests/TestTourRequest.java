package com.tco.requests;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import com.tco.misc.BadRequestException;
import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;


public class TourRequest {
    private TourRequest tour;

    @BeforeEach
    public void createConfigurationForTestCases(){
        tour = new TourRequest();
        tour.buildResponse();
    }

    
    @Test
    @DisplayName("Request type is \"tour\"")
    public void testType() {
        String type = tour.getRequestType();
        assertEquals("tour", type);
    }

    
}
