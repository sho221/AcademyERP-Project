package com.example.demo.database.jpa.DTO;

import java.io.Serializable;

import javax.persistence.*;
import lombok.*;
 


@Entity
@Table(name = "department")
@Getter
@Setter
@Data
public class departmentDTO implements Serializable{
    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column
    private long no;
    private String name;

    public long getNo() {
        return this.no;
    }

    public void setNo(long no) {
        this.no = no;
    }

    public String getName() {
        return this.name;
    }

    public void setName(String name) {
        this.name = name;
    }

}
