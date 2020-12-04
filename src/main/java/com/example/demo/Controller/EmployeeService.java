package com.example.demo.Controller;


import com.example.demo.DTO.EmployeeDTO;
import com.example.demo.Repository.EmployeeRepository;
import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.*;

import java.util.*;

@RestController
@RequestMapping("/eployee")
@Service
public class EmployeeService {
	
	@Autowired
	private EmployeeRepository memberRepository;
	

	@GetMapping("/allEployeeInfo")
    public HashMap<String, Object> allEmployeeList() {
		HashMap<String,Object> result = new HashMap<>();
		Page<EmployeeDTO> list = memberRepository.findAll(PageRequest.of(1,10));
		long size = memberRepository.count();
        result.put("employeeList", list);
		result.put("employeeSize", size);
        return result;
	}

	@PostMapping("/insertEmployee")
	public void insertEmployee(){
//		memberRepository.save(EmployeeDTO.builder());
	}
	
	@GetMapping("/eployeeById/{id}")
    public HashMap<String,Optional> GetEmployeeById(@RequestParam("id") Long id) {
		HashMap<String,Optional> result = new HashMap<>();
		Optional<EmployeeDTO> list = memberRepository.findById(id);
        result.put("eployeeById", list);

        return result;
    }


}