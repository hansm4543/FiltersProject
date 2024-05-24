package dev.hasm4543.filtersapp.criteria;

import java.util.List;

public record Criteria(
        Integer id,
        Integer filterID,
        String criteria,
        String comparingCondition,
        String conditionValue
) {
}

