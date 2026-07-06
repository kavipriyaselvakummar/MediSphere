package com.example.medispherespringboot;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class HelloController {

    @RequestMapping("/hello")
    public String hello() {
        return "Welcome Greetings from Spring Boot!";
    }

    @RequestMapping("/myname")
    public String myname() {
        return "Welcome Kavipriya";
    }

    @RequestMapping("/home")
    public String home() {
        return "Medisphere SpringBoot";
    }

    @RequestMapping("/about")
    public String about() {
        return "Infosys Intern Project Associates";
    }

    @GetMapping("/")
    public String index() {
        return "Select Index Method";
    }
}