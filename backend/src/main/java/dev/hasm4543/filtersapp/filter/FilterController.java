package dev.hasm4543.filtersapp.filter;

import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/filters")
@CrossOrigin(origins = "http://localhost:4200")
class FilterController {

    private final JdbcFilterRepository filterRepository;

    FilterController(JdbcFilterRepository filterRepository) {
        this.filterRepository = filterRepository;
    }

    @GetMapping
    List<Filter> findAll() {
        return filterRepository.findAll();
    }

    @GetMapping("/{id}")
    Filter findById(@PathVariable Integer id) {
        Optional<Filter> filter = filterRepository.findById(id);
        if(filter.isEmpty()) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Filter not found.");
        }
        return filter.get();
    }

    @ResponseStatus(HttpStatus.CREATED)
    @PostMapping
    void create(@Valid @RequestBody Filter filter) {
        filterRepository.create(filter);
    }

    @ResponseStatus(HttpStatus.NO_CONTENT)
    @PutMapping("/{id}")
    void update(@Valid @RequestBody Filter filter, @PathVariable Integer id) {
        filterRepository.update(filter,id);
    }

    @ResponseStatus(HttpStatus.NO_CONTENT)
    @DeleteMapping("/{id}")
    void delete(@PathVariable Integer id) {
        filterRepository.delete(id);
    }

}
