package com.example.demo.database.DTO;

import java.io.Serializable;
import javax.persistence.*;

import lombok.*;

@Entity
@Table(name="consult")
@Getter
@Setter
public class ConsultEntity implements Serializable {
    
    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column
    private Long no;
    private String name;
    private String hp;
    private String schedule;
    private String memo;
    private String regidate;
}
