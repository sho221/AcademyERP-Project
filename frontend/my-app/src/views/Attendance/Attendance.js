import React, { Component } from "react";
import AttTable from "./AttTable";
import '../css/table.css';
import jQuery from "jquery";
import Down from '../../suminCP/excel';
window.$ = window.jQuery = jQuery;


class Users extends Component {
  constructor(props) {
    super(props)
    this.state = {
        mode: 0,
    }
    this.change = this.change.bind(this);
    }

    change(input){
      this.setState(state => ({
        mode: input
      }));
    }
  

  render() {
    const _default=0,_weekly=1,_monthly=2;
    return (
      <div>
        <button onClick={() => {this.change(_default); }}>기본</button>
        <button onClick={() => {this.change(_weekly); }}>주간</button>
        <button onClick={() => {this.change(_monthly); }}>일간</button>
 
          <div>
            <AttTable mode={this.state.mode}/>
          </div>

        <Down name="Attendance"></Down>
      </div>
    );
  }
}

export default Users;
