import React from 'react'
import axios from 'axios';
import {
    CButton,
    CCardBody,
    CCardFooter,
    CFormGroup,
    CInput,
    CLabel
} from '@coreui/react';

class Consult_Update extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      name: this.props.ItemList.name,
      hp: this.props.ItemList.hp,
      schedule: this.props.ItemList.schedule,
      memo: this.props.ItemList.memo
    }


    this.handleFormSubmit = this.handleFormSubmit.bind(this)
    this.handleValueChange = this.handleValueChange.bind(this)
    this.updateConsult = this.updateConsult.bind(this)
    this.handleClickOpen = this.handleClickOpen.bind(this)
    this.handleClose = this.handleClose.bind(this);

  }


  handleFormSubmit(e) {
    e.preventDefault()
    this.updateConsult()
    this.setState({
      name: '',
      hp: '',
      schedule: '',
      memo: ''
    })
    alert("수정되었습니다.");
    this.props.stateRefresh();
  }

  handleValueChange(e) {
    let nextState = {};
    nextState[e.target.name] = e.target.value;
    this.setState(nextState);
  }

  updateLecture() {
    console.log(this.state.name);
      console.log(this.state.hp);
        console.log(this.state.schedule);
          console.log(this.state.memo);
    axios({
      url: 'http://localhost:8080/api/consult/edit/' + this.props.ItemList.no,
      method: "PUT",
      headers: {'content-type': 'application/json'},
      data: {
        name: this.state.name,
        hp: this.state.hp,
        schedule: this.state.schedule,
        memo: this.state.memo
      }
    })
      .then(function (response){
        console.log(response)
      })
      .catch(function (error){
        console.log(error)
      })
  }
  handleClickOpen() {
    this.setState({
      open: true
    });
  }

  handleClose() {

    this.setState({
      open: false
    })
  }

  render() {
    let ItemList = this.props.ItemList;
    console.log(ItemList);

    return (
      <div>
        <CButton variant="outlined" color="primary" onClick={this.handleClickOpen}>
          수정
        </CButton>
        <CCardBody open={this.state.open} onClose={this.handleClose}>
          <CLabel>수정</CLabel>
          <CFormGroup>
            <CInput label="성명" type="text" name="name" defaultValue={ItemList.name} onChange={this.handleValueChange}/><br/>
            <CInput label="전화번호" type="text" name="hp" defaultValue={ItemList.hp} onChange={this.handleValueChange}/><br/>
            <CInput label="상담일정" type="text" name="schedule" defaultValue={ItemList.schedule} onChange={this.handleValueChange}/><br/>
            <CInput label="메모" type="text" name="memo" defaultValue={ItemList.memo} onChange={this.handleValueChange}/><br/>
          </CFormGroup>

          <CCardFooter>
            <CButton variant="contained" color="primary" onClick={this.handleFormSubmit}>수정완료</CButton>
            <CButton variant="outlined" color="primary" onClick={this.handleClose}>닫기</CButton>
          </CCardFooter>

        </CCardBody>

      </div>
    )

  }

}


export default Consult_Update;