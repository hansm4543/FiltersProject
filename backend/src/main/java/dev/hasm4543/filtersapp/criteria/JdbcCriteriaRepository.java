package dev.hasm4543.filtersapp.criteria;

import org.springframework.jdbc.core.simple.JdbcClient;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
import org.springframework.util.Assert;


@Repository
public class JdbcCriteriaRepository implements CriteriaRepository {

    private final JdbcClient jdbcClient;

    public JdbcCriteriaRepository(JdbcClient jdbcClient) {
        this.jdbcClient = jdbcClient;
    }

    public List<Criteria> findAll() {
        return jdbcClient.sql("select * from criteria").query(Criteria.class).list();
    }

    public Optional<Criteria> findById(Integer id) {
        return jdbcClient.sql("SELECT id,filterID,criteria,comparingCondition,conditionValue  FROM Filter WHERE id = :id" )
                .param("id", id)
                .query(Criteria.class)
                .optional();
    }

    public void create(Criteria criteria) {
        var updated = jdbcClient.sql("INSERT INTO Criteria(id,filterID,criteria,comparingCondition,conditionValue) values(?,?,?,?,?)")
                .params(List.of(criteria.id(),criteria.filterID(),criteria.criteria(),criteria.comparingCondition(),criteria.conditionValue()))
                .update();

        Assert.state(updated == 1, "Failed to create criteria " + criteria.criteria());
    }

    @Override
    public void update(Criteria criterias, Integer id) {

    }


    public void delete(Integer id) {
        var updated = jdbcClient.sql("delete from criteria where id = :id")
                .param("id", id)
                .update();

        Assert.state(updated == 1, "Failed to delete criteria " + id);
    }

    @Override
    public int count() {
        return 0;
    }


    public void saveAll(List<Criteria> criterias) {
        criterias.stream().forEach(this::create);
    }

}
