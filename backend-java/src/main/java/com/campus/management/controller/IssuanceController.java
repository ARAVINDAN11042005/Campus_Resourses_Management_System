package com.campus.management.controller;

import com.campus.management.model.Issuance;
import com.campus.management.service.IssuanceService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/issuances")
@CrossOrigin(origins = "http://localhost:5174")
public class IssuanceController {
    @Autowired
    private IssuanceService issuanceService;

    @GetMapping
    public List<Issuance> getAllIssuances() {
        return issuanceService.getAllIssuances();
    }

    @PostMapping("/issue")
    public Issuance issueResource(@RequestBody Map<String, Integer> payload) {
        return issuanceService.issueResource(payload.get("student_id"), payload.get("resource_id"));
    }

    @PutMapping("/return/{id}")
    public Issuance returnResource(@PathVariable Integer id) {
        return issuanceService.returnResource(id);
    }
}
