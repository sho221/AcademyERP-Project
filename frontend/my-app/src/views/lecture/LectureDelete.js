import React from "react";
import axios from "axios";


class LectureDelete extends React.Component {

  deleteCustomer(id){
    axios({
      url: 'http://localhost:8080/api2/lecture',
      method: "POST",
      headers: {'content-type': 'application/json'},
      data: {
        name: this.state.name,
        teacher: this.state.teacher,
        price: this.state.price,
        students: this.state.students,
        room: this.state.room,
        start_date: this.state.start_date,
        end_date: this.state.end_date,
        day: this.state.day,
        start_time: this.state.start_time,
        end_time: this.state.end_time,
        part: this.state.part,
        branch: this.state.branch
      }
    })
    alert("삭제되었습니다.");
    this.props.history.push('/lecture')
  }

  render() {
    return (
      <br>
      <form id="delete-form" method="post">
        <input type="hidden" name="_method" value="delete"/>
        <button id="delete-btn">삭제</button>
      </form>
      <button onClick={(e) => {this.deleteCustomer(this.props.id)}}>삭제</button>
      </br>
    )
  }
}

export default LectureDelete;

