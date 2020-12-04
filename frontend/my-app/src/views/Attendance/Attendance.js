import React, { Component } from "react";
import AttTable from "./AttTable";
import '../css/table.css';
import jQuery from "jquery";
import Down from '../../suminCP/excel';
import Moment from "moment";
window.$ = window.jQuery = jQuery;


class Users extends Component {
  constructor(props) {
    super(props)
    this.state = {
        a: 0,
        dd: '',
        date: Moment().format("YYYY-MM-DD")
    }
    this.change = this.change.bind(this);
    }

    change(b){
      this.setState(state => ({
        a: b
      }));
    }
    change2(b){
      this.setState(state => ({
        dd: b
      }));
    }
  

  render() {
    
    return (
      <div>
        <button onClick={() => {this.change(0); this.change2("")}}>기본</button>
        <button onClick={() => {this.change(1); this.change2(this.state.date)}}>주간</button>
        <button onClick={() => {this.change(2); this.change2("")}}>일간</button>
 
          <div>
            <AttTable mode={this.state.a} dd={this.state.dd}/>
          </div>

        <Down name="Attendance"></Down>
      </div>
    );
  }
}

export default Users;
