package com.example.demo.database.Controller;

import java.util.*;

import com.example.demo.database.DTO.*;
import com.example.demo.database.Repository.*;
import org.springframework.web.bind.annotation.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;


@RestController
@RequestMapping(value = "/api")
@Service
public class ConsultService {
//test
       @Autowired
    private ConsultRepository consultRepository;

    @GetMapping("/consult")
    public HashMap<String,List> list() {
        HashMap<String,List> result = new HashMap<>();
        List<ConsultEntity> list = consultRepository.findAll();
        result.put("message",list);
        return result;
    }

    @PostMapping("/consult")
    public String write(@RequestBody ConsultEntity con) {
        ConsultEntity result =  consultRepository.save(con);
        return result.toString();
    }

    @DeleteMapping("/consult/{no}")
    public void delete(@PathVariable("no") Long no) {
        consultRepository.deleteById(no);
  
    }

    @PutMapping("consult/edit/{no}")
    public String update(@RequestBody ConsultEntity con, @PathVariable("no") Long no) {
        
        ConsultEntity result =  consultRepository.save(con);
        return result.toString();
    }
}