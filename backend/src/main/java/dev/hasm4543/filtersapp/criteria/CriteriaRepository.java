package dev.hasm4543.filtersapp.criteria;

import java.util.List;
import java.util.Optional;

public interface CriteriaRepository {

    List<Criteria> findAll();

    Optional<Criteria> findById(Integer id);

    void create(Criteria criterias);

    void update(Criteria criterias, Integer id);

    void delete(Integer id);

    int count();

    void saveAll(List<Criteria> criterias);

}
