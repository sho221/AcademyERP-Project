package com.example.demo.database.jpa;

import java.io.Serializable;

import javax.persistence.*;
import lombok.*;
 



@Table(name = "attendance")
@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
public class AttendanceDTO implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column
    private long no;
    private int employee_no;
    private String day;
    private String start_time;
    private String end_time;
    private int night;

    public long getNo() {
        return this.no;
    }

    public void setNo(long no) {
        this.no = no;
    }

    public int getEmployee_no() {
        return this.employee_no;
    }

    public void setEmployee_no(int employee_no) {
        this.employee_no = employee_no;
    }

    public String getDay() {
        return this.day;
    }

    public void setDay(String day) {
        this.day = day;
    }

    public String getStart_time() {
        return this.start_time;
    }

    public void setStart_time(String start_time) {
        this.start_time = start_time;
    }

    public String getEnd_time() {
        return this.end_time;
    }

    public void setEnd_time(String end_time) {
        this.end_time = end_time;
    }

    public int getNight() {
        return this.night;
    }

    public void setNight(int night) {
        this.night = night;
    }

}
