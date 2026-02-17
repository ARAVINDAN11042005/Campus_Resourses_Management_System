package com.campus.management.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class HomeController {

    @GetMapping("/")
    public String home() {
        return "Campus Resource Management API is running. Use /api/resources, /api/students, etc.";
    }
}
