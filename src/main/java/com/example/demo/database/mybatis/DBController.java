package com.example.demo.database.mybatis;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import java.util.*;

@RestController
@RequestMapping("/api2")
public class DBController {

    @Autowired
    private DBInterface db;

    @GetMapping("/att")
    public Map<String,List<DTO>> demo() {
        HashMap<String,List<DTO>> result = new HashMap<>();
		List<DTO> list = db.att();
        result.put("list", list);

        return result;
    } 



    @GetMapping("/attfind")
    public Map<String,List<DTO>> demo2(@RequestParam("day") String day, @RequestParam("name") String name,@RequestParam("dep") String dep){
        String un = "undefined";
        if(name.equals(un)) name="";
        if(dep.equals(un)) dep="";
        HashMap<String,List<DTO>> result =new HashMap<>();
        HashMap<String,Object> to= new HashMap<>();
        if(day.equals(un)) {
            to.put("day",day); 
            to.put("name",name);
            to.put("dep",dep);
            List<DTO> list = db.attfind2(to);
            result.put("list", list);
        }else{
            to.put("day",day); 
            to.put("name",name);
            to.put("dep",dep);
            List<DTO> list = db.attfind(to);
            result.put("list", list); 
        }

        return result;  
    } 
    @GetMapping("/attfind3")
    public Map<String,List<DTO>> demo3(@RequestParam("start") String start,@RequestParam("end") String end, @RequestParam("name") String name,@RequestParam("dep") String dep){
        String un = "undefined";
        if(name.equals(un)) name="";
        if(dep.equals(un)) dep="";
        HashMap<String,List<DTO>> result =new HashMap<>();
        HashMap<String,Object> to= new HashMap<>();
    
            to.put("start",start); 
            to.put("end",end); 
            to.put("name",name);
            to.put("dep",dep);
            List<DTO> list = db.attfind3(to);
            result.put("list", list); 


        return result;  
    } 

    @GetMapping("/in")
    public int in(@RequestParam("no") int no) {
        int result;
        HashMap<String,Object> to= new HashMap<>();
        to.put("no",no); 
        List<DTO> temp=db.datecheck(to);
        if(temp.isEmpty()){
            result=db.intest(no);
        }else{ 
            result=0;
        }
        return result;
    } 

    @GetMapping("/out")
    public int out(@RequestParam("no") int no) {
        int result;
        HashMap<String,Object> to= new HashMap<>();
        to.put("no",no); 
        List<DTO> temp=db.datecheck(to);
        if(!temp.isEmpty()){
            result=db.out(no);
        }else{
            result=0;
        }
        return result;
    } 

    @GetMapping("/night")
    public int night(@RequestParam("no") int no) {
        int result;
        HashMap<String,Object> to= new HashMap<>();
        to.put("no",no); 
        List<DTO> temp=db.datecheck(to);
        if(!temp.isEmpty()){
            result=db.night(no);
        }else{
            result=0;
        }
        return result;
    } 

}