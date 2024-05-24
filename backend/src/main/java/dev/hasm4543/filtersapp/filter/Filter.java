package dev.hasm4543.filtersapp.filter;

import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.Positive;

public record Filter(
        Integer id,
        @NotEmpty
        String title
) { }
