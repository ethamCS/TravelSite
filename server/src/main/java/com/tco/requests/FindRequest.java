package com.tco.requests;

import java.util.ArrayList;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public class FindRequest extends Request {

    @Override
    public void buildResponse(){
        
    }

    public FindRequest() {
        this.requestType = "find";
    }

}