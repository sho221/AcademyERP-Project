package com.example.demo.database.jpa.Repository;
import org.springframework.data.jpa.repository.JpaRepository;

import com.example.demo.database.jpa.DTO.*;
public interface departmentInter extends JpaRepository<departmentDTO, Long> {

}