package dev.hasm4543.filtersapp.criteria;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Repository
class InMemoryCriteriaRepository implements CriteriaRepository {

    private static final Logger log = LoggerFactory.getLogger(InMemoryCriteriaRepository.class);
    private final List<Criteria> criterias = new ArrayList<>();

    public List<Criteria> findAll() {
        return criterias;
    }

    public Optional<Criteria> findById(Integer id) {
        return Optional.ofNullable(criterias.stream()
                .filter(criteria -> criteria.id() == id)
                .findFirst()
                .orElseThrow(CriteriaNotFoundException::new));
    }

    public void create(Criteria criteria) {
        Criteria newCriteria = new Criteria(criteria.id(),
                criteria.filterID(),
                criteria.criteria(),
                criteria.comparingCondition(),
                criteria.conditionValue());

        criterias.add(newCriteria);
    }

    public void update(Criteria newCriteria, Integer id) {
        Optional<Criteria> existingCriteria = findById(id);
        if(existingCriteria.isPresent()) {
            var r = existingCriteria.get();
            log.info("Updating Existing Criteria: " + existingCriteria.get());
            criterias.set(criterias.indexOf(r),newCriteria);
        }
    }

    public void delete(Integer id) {
        log.info("Deleting Criteria: " + id);
        criterias.removeIf(criteria -> criteria.id().equals(id));
    }

    public int count() {
        return criterias.size();
    }

    public void saveAll(List<Criteria> criterias) {
        criterias.stream().forEach(criteria -> create(criteria));
    }

    public List<Criteria> findAllWithID() {
        return criterias;
    }

}
