package com.example.demo.database.DTO;

import java.io.Serializable;
import javax.persistence.*;

import lombok.*;

@Entity
@Table(name="consult")
@Getter
@Setter
@Data
public class ConsultEntity implements Serializable {
    
    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column
    private Long no;
    private String name;
    private String hp1;
    private String hp2;
    private String hp3;
    private String schedule;
    private String memo;
    private String regidate;

    public Long no() {
        return this.no;
    }

    public void setNo(Long no) {
        this.no = no;
    }

    public String name() {
        return this.name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String hp1() {
        return this.hp1;
    }

    public void setHp1(String hp1) {
        this.hp1 = hp1;
    }

    public String hp2() {
        return this.hp2;
    }

    public void setHp2(String hp2) {
        this.hp2 = hp2;
    }

    public String hp3() {
        return this.hp3;
    }

    public void setHp3(String hp3) {
        this.hp3 = hp3;
    }

    public String schedule() {
        return this. schedule;
    }

    public void setSchedule(String schedule) {
        this. schedule = schedule;
    }

    public String memo() {
        return this. memo;
    }

    public void setMemo(String memo) {
        this.memo = memo;
    }

    public String regidate() {
        return this. regidate;
    }

    public void setRegidate(String regidate) {
        this.regidate = regidate;
    }

}
