package dev.hasm4543.filtersapp.criteria;

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
public class CriteriaJsonDataLoader implements CommandLineRunner {

    private static final Logger log = LoggerFactory.getLogger(CriteriaJsonDataLoader.class);
    private final ObjectMapper objectMapper;
    private final CriteriaRepository criteriaRepository;

    public CriteriaJsonDataLoader(ObjectMapper objectMapper, @Qualifier("jdbcCriteriaRepository") CriteriaRepository criteriaRepository) {
        this.objectMapper = objectMapper;
        this.criteriaRepository = criteriaRepository;
    }

    @Override
    public void run(String... args) throws Exception {
        if(criteriaRepository.count() == 0) {
            try (InputStream inputStream = TypeReference.class.getResourceAsStream("/data/criteria.json")) {
                Criterias allCriterias = objectMapper.readValue(inputStream, Criterias.class);
                log.info("Reading {} Criterias from JSON data and saving to in-memory collection.", allCriterias.criterias().size());
                criteriaRepository.saveAll(allCriterias.criterias());
            } catch (IOException e) {
                throw new RuntimeException("Failed to read JSON data", e);
            }
        } else {
            log.info("Not loading Criterias from JSON data because the collection contains data.");
        }
    }

}
