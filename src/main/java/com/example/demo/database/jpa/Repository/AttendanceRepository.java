package com.example.demo.database.jpa.Repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.example.demo.database.jpa.DTO.*;

public interface AttendanceRepository extends JpaRepository<AttendanceDTO, Long> {

}
