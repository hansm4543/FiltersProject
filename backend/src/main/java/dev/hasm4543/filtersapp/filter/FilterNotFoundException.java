package dev.hasm4543.filtersapp.filter;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.NOT_FOUND)
public class FilterNotFoundException extends RuntimeException {
    public FilterNotFoundException() {
        super("Filter Not Found");
    }
}
