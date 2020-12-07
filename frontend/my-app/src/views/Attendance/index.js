import React, { Component } from "react";
import Att from "./Attendance.js"
import AttInOut from "./AttInOut";

class index extends Component {
    render() {
        return(
            <>
            <AttInOut></AttInOut>
            <Att></Att>
            </>
        );
    }
}
export default index