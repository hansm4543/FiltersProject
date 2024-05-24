package dev.hasm4543.filtersapp.merge;

import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/merger")
@CrossOrigin(origins = "http://localhost:4200")
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
