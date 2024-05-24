package dev.hasm4543.filtersapp.filter;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.io.IOException;
import java.io.InputStream;

@Component
public class FilterJsonDataLoader implements CommandLineRunner {

    private static final Logger log = LoggerFactory.getLogger(dev.hasm4543.filtersapp.filter.FilterJsonDataLoader.class);
    private final ObjectMapper objectMapper;
    private final FilterRepository filterRepository;

    public FilterJsonDataLoader(ObjectMapper objectMapper, @Qualifier("jdbcFilterRepository") FilterRepository filterRepository) {
        this.objectMapper = objectMapper;
        this.filterRepository = filterRepository;
    }

    @Override
    public void run(String... args) throws Exception {
        if(filterRepository.count() == 0) {
            try (InputStream inputStream = TypeReference.class.getResourceAsStream("/data/filters.json")) {
                Filters allFilters = objectMapper.readValue(inputStream, Filters.class);
                log.info("Reading {} runs from JSON data and saving to in-memory collection.", allFilters.filters().size());
                filterRepository.saveAll(allFilters.filters());
            } catch (IOException e) {
                throw new RuntimeException("Failed to read JSON data", e);
            }
        } else {
            log.info("Not loading Runs from JSON data because the collection contains data.");
        }
    }

}
