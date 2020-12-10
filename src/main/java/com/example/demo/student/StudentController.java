package com.example.demo.student;

import java.util.*;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api")
@Service
@CrossOrigin("*")

public class StudentController {
    
    @Autowired
    private StudentRepository studentRepository;

    @GetMapping("/students")
    public HashMap<String, List> Studnets() {
        HashMap<String,List> result = new HashMap<>();
        List<StudentDTO> slist = studentRepository.findAll();
        result.put("listdata", slist);

        return result;
    }

    @PostMapping("/ins_stu")
    public String addStudnet(@RequestBody StudentDTO student) {
        StudentDTO result = studentRepository.save(student);

        return result.toString();
    }
}
