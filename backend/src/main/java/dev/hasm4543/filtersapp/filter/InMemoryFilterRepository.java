package dev.hasm4543.filtersapp.filter;

import jakarta.annotation.PostConstruct;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.time.temporal.ChronoUnit;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;
import java.util.Optional;

@Repository
class InMemoryFilterRepository implements FilterRepository {

    private static final Logger log = LoggerFactory.getLogger(InMemoryFilterRepository.class);
    private final List<Filter> filters = new ArrayList<>();

    public List<Filter> findAll() {
        return filters;
    }

    public Optional<Filter> findById(Integer id) {
        return Optional.ofNullable(filters.stream()
                .filter(filter -> filter.id() == id)
                .findFirst()
                .orElseThrow(FilterNotFoundException::new));
    }

    public void create(Filter filter) {
        Filter newFilter = new Filter(filter.id(),
                filter.title());

        filters.add(newFilter);
    }

    public void update(Filter newFilter, Integer id) {
        Optional<Filter> existingFilter = findById(id);
        if(existingFilter.isPresent()) {
            var r = existingFilter.get();
            log.info("Updating Existing Filter: " + existingFilter.get());
            filters.set(filters.indexOf(r),newFilter);
        }
    }

    public void delete(Integer id) {
        log.info("Deleting Filter: " + id);
        filters.removeIf(filter -> filter.id().equals(id));
    }

    public int count() {
        return filters.size();
    }

    public void saveAll(List<Filter> filters) {
        filters.stream().forEach(filter -> create(filter));
    }

}
