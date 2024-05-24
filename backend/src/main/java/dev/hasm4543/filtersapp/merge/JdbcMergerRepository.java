package dev.hasm4543.filtersapp.merge;

import org.springframework.jdbc.core.simple.JdbcClient;
import org.springframework.stereotype.Repository;

import java.util.List;


@Repository
public class JdbcMergerRepository implements MergerRepository {

    private final JdbcClient jdbcClient;

    public JdbcMergerRepository(JdbcClient jdbcClient) {
        this.jdbcClient = jdbcClient;
    }

    public List<Merger> WITHID() {
        return jdbcClient.sql("SELECT FILTER.ID, FILTER.TITLE, CRITERIA.CRITERIA, CRITERIA.COMPARINGCONDITION, CRITERIA.CONDITIONVALUE FROM FILTER  JOIN CRITERIA ON FILTER.ID=CRITERIA.FILTERID ORDER BY FILTER.ID").query(Merger.class).list();
    }

}
