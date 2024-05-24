package dev.hasm4543.filtersapp.criteria;

import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/criteria")
@CrossOrigin(origins = "http://localhost:4200")
class CriteriaController {

    private final JdbcCriteriaRepository criteriaRepository;

    CriteriaController(JdbcCriteriaRepository criteriaRepository) {
        this.criteriaRepository = criteriaRepository;
    }

    @GetMapping
    List<Criteria> findAll() {
        return criteriaRepository.findAll();
    }


    @GetMapping("/{id}")
    Criteria findById(@PathVariable Integer id) {
        Optional<Criteria> criteria = criteriaRepository.findById(id);
        if(criteria.isEmpty()) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Criteria not found.");
        }
        return criteria.get();
    }

    @ResponseStatus(HttpStatus.CREATED)
    @PostMapping
    void create(@Valid @RequestBody Criteria criteria) {
        criteriaRepository.create(criteria);
    }

    @ResponseStatus(HttpStatus.NO_CONTENT)
    @PutMapping("/{id}")
    void update(@Valid @RequestBody Criteria criteria, @PathVariable Integer id) {
        criteriaRepository.update(criteria,id);
    }

    @ResponseStatus(HttpStatus.NO_CONTENT)
    @DeleteMapping("/{id}")
    void delete(@PathVariable Integer id) {
        criteriaRepository.delete(id);
    }

}
