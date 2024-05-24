package dev.hasm4543.filtersapp.criteria;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.NOT_FOUND)
public class CriteriaNotFoundException extends RuntimeException {
    public CriteriaNotFoundException() {
        super("Criteria Not Found");
    }
}
