package dev.hasm4543.filtersapp.filter;

import java.util.List;
import java.util.Optional;

public interface FilterRepository {

    List<Filter> findAll();

    Optional<Filter> findById(Integer id);

    void create(Filter filter);

    void update(Filter filter, Integer id);

    void delete(Integer id);

    int count();

    void saveAll(List<Filter> filters);

}
