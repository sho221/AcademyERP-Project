import React, { Component } from "react";
import axios from "axios";
import '../css/table.css';
var a=window.sessionStorage.getItem('no');

class AttInOut extends Component {
  in = () =>{
    axios.get(`http://localhost:8083/api2/in?no=${a}`)
    .then(res => {
      if(res.data){
        alert("출근되었습니다.");
        window.location.reload(false);
      }else{
        alert("이미 출근되었습니다.");
      }
    })
    .catch(res => console.log(res)) 
  }

  out = () =>{
    axios.get(`http://localhost:8083/api2/out?no=${a}`)
    .then(res => {
      if(res.data){
        alert("퇴근되었습니다.");
        window.location.reload(false);
      }else{
        alert("출근을 해주세요!.");
      }
    })
    .catch(res => console.log(res)) 
  }

  countSeconds = (str) => {
    const [hh = '0', mm = '0', ss = '0'] = (str || '0:0:0').split(':');
    const hour = parseInt(hh, 10) || 0;
    const minute = parseInt(mm, 10) || 0;
    const second = parseInt(ss, 10) || 0;
    return (hour*3600) + (minute*60) + (second);
  }

  night = () =>{
    let today = new Date();
    let hours = today.getHours(); 
    let minutes = today.getMinutes();  
    let seconds = today.getSeconds();  
    let night = "18:00:00";

    if(this.countSeconds(hours+':'+minutes+':'+seconds)>this.countSeconds(night)){ 
      axios.get(`http://localhost:8083/api2/night?no=${a}`)
      .then(res => {
        if(res.data){
          alert("연장근무후 퇴근을 해주세요.");
          window.location.reload(false);
        }else{
          alert("출근을 해주세요!.");
        }
      })
      .catch(res => console.log(res)) 
    }else{
      alert("연장근무는 "+night+"이후에 가능합니다.")
    }
  }
    
    render() {
      return (
      <div>
        <button onClick={this.in}>출근하기</button>
        <button onClick={this.out}>퇴근하기</button>
        <button onClick={this.night}>연장근무</button>
      </div>
    );
  }
}

export default AttInOut;
