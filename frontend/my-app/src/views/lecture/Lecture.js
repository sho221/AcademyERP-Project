import React, {Component} from "react";
import axios from "axios";
import {CCard, CCardBody, CCardHeader, CCol, CRow} from '@coreui/react'
import LectureDelete from "./LectureDelete";
import Button from "@material-ui/core/Button";


class Lectures extends Component {
  constructor(props) {
    super(props)
    this.state = {
        ItemList: ""
    }
}

componentDidMount() {
    this.getApi();
}

getApi = () => {
  const { params } = this.props.match;
    axios.get("http://localhost:8080/api2/lecture/"+params.id)
        .then(res => {
            console.log(res);
            this.setState({
              ItemList: res.data.message
            })
        })
        .catch(res => console.log(res))
}

goBack = () => {
  this.props.history.goBack();
}

  render() {
    const tempStyle={float:"left"}
    const tempStyle2={float:"right"}

    const { ItemList } = this.state;
    console.log(ItemList);
    return (
      <CRow>
      <CCol lg={6}>
        <CCard>
          <CCardHeader>
          <div style={tempStyle}>
            <h3>User name: {ItemList.name}&emsp;&emsp;&emsp;</h3>
          </div>
            <br/>
          <div style={tempStyle2}>
            <Button Button variant="contained" onClick={this.goBack}>뒤로가기</Button>
          </div>
            <div style={tempStyle2}>
              <LectureDelete id={ItemList.no}/>
            </div>


          </CCardHeader>
          <CCardBody>
              <table className="table table-striped table-hover">
                <tbody>
                  <tr><td>{`no:`}</td><td><strong>{ItemList.no}</strong></td></tr>
                  <tr><td>{`name:`}</td><td><strong>{ItemList.name}</strong></td></tr>
                  <tr><td>{`teacher:`}</td><td><strong>{ItemList.teacher}</strong></td></tr>
                  <tr><td>{`price:`}</td><td><strong>{ItemList.price}</strong></td></tr>
                  <tr><td>{`students:`}</td><td><strong>{ItemList.students}</strong></td></tr>
                  <tr><td>{`room:`}</td><td><strong>{ItemList.room}</strong></td></tr>
                  <tr><td>{`start_date:`}</td><td><strong>{ItemList.start_date}</strong></td></tr>
                  <tr><td>{`end_date:`}</td><td><strong>{ItemList.end_date}</strong></td></tr>
                  <tr><td>{`day:`}</td><td><strong>{ItemList.day}</strong></td></tr>
                  <tr><td>{`start_time:`}</td><td><strong>{ItemList.start_time}</strong></td></tr>
                  <tr><td>{`end_time:`}</td><td><strong>{ItemList.end_time}</strong></td></tr>
                  <tr><td>{`part:`}</td><td><strong>{ItemList.part}</strong></td></tr>
                  <tr><td>{`branch:`}</td><td><strong>{ItemList.branch}</strong></td></tr>
                </tbody>
              </table>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
    );
  }
}

export default Lectures;
