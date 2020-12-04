package com.example.demo.DTO;

import javax.persistence.*;
import lombok.*;



    @Entity
    @Table(name = "employee")
    @Getter
    @Setter
    @NoArgsConstructor
    @AllArgsConstructor
    @Builder
    public class EmployeeDTO {
	
        private static final long serialVersionUID = 1L;

        @Id
        @GeneratedValue(strategy = GenerationType.AUTO)
        private long no;
        private String name;
        private String id;
        private String password;
        private String hp;
        private String email;
        private String birth;
        private String address;
        private char gender;
        private String rank;
        private int salary;
        private String profile_name;
        private int profile_size;
        private String branch;
        private String department;
        private String regidate;
        private int verify;



        
    }

