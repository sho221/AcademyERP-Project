import React, { Component } from "react";
import Att from "./Attendance.js"
import AttInOut from "./AttInOut";

class index extends Component {
    asd(){
        var s=document.getElementsByTagName('input');
        for(var i=0;i<s.length;i++){
            s[i].value="";
        }
    }
    render() {
        return(
            <>
            <AttInOut></AttInOut>
            <Att></Att>
            <input type="text"></input>
            <button onClick={() => {this.asd()}}>asd</button>
            </>
        );
    }
}
export default index