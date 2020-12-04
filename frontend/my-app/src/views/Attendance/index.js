import React, { Component } from "react";
import Att from "./Attendance.js"
import AttInOut from "./AttInOut";
import "react-big-calendar/lib/css/react-big-calendar.css";


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