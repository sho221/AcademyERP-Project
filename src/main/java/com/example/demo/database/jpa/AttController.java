package com.example.demo.database.jpa;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.*;

@RestController
@Service
public class AttController {
	
	@Autowired
	private AttendanceRepository attRepo;

	@GetMapping("/Attget")
    public Map<String,Optional<AttendanceDTO>> attget(@RequestParam("no") Long no) {
		HashMap<String,Optional<AttendanceDTO>> result = new HashMap<>();
		Optional<AttendanceDTO> list = attRepo.findById(no); 
        result.put("list", list); 

        return result;
	}
	
	@PutMapping("/AttUpdate")
	public int attupdate(@RequestBody AttendanceDTO dto ){ 
		int result=1;
        attRepo.save(dto);
            
        return result;

	}
	public AttendanceDTO getUserOne(Long id) {
        return attRepo.findById(id).orElseThrow(() -> new NoSuchElementException());
    }

} 