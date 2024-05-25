package dev.hasm4543.filtersapp.merge;

import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/merger")
@CrossOrigin
class MergerController {

    private final JdbcMergerRepository mergerRepository;


    MergerController(JdbcMergerRepository mergerRepository) {
        this.mergerRepository = mergerRepository;
    }

    @GetMapping
    List<Merger> WITHID() {
        return mergerRepository.WITHID();
    }

}
