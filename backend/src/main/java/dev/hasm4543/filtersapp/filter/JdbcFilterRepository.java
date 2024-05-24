package dev.hasm4543.filtersapp.filter;

import org.springframework.jdbc.core.simple.JdbcClient;
import org.springframework.stereotype.Repository;
import org.springframework.util.Assert;

import java.util.List;
import java.util.Optional;

@Repository
public class JdbcFilterRepository implements FilterRepository {

    private final JdbcClient jdbcClient;

    public JdbcFilterRepository(JdbcClient jdbcClient) {
        this.jdbcClient = jdbcClient;
    }

    public List<Filter> findAll() {
        return jdbcClient.sql("select * from filter").query(Filter.class).list();
    }

    public Optional<Filter> findById(Integer id) {
        return jdbcClient.sql("SELECT id,title FROM Filter WHERE id = :id" )
                .param("id", id)
                .query(Filter.class)
                .optional();
    }

    public void create(Filter filter) {
        var updated = jdbcClient.sql("INSERT INTO Filter(id,title) values(?,?)")
                .params(List.of(filter.id(),filter.title()))
                .update();

        Assert.state(updated == 1, "Failed to create filter " + filter.title());
    }

    public void update(Filter filter, Integer id) {
        var updated = jdbcClient.sql("update filter set title = ?")
                .params(List.of(filter.title(), id))
                .update();

        Assert.state(updated == 1, "Failed to update filter " + filter.title());
    }

    public void delete(Integer id) {
        var updated = jdbcClient.sql("delete from filter where id = :id")
                .param("id", id)
                .update();

        Assert.state(updated == 1, "Failed to delete filter " + id);
    }

    @Override
    public int count() {
        return 0;
    }


    public void saveAll(List<Filter> filters) {
        filters.stream().forEach(this::create);
    }

}
