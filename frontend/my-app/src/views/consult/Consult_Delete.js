import React from "react";
import {
  CButton,
  CCardBody,
  CFormGroup
} from '@coreui/react'
import { withRouter } from 'react-router-dom';

class Consult_Delete extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false

    }

    this.handleClickOpen = this.handleClickOpen.bind(this)
    this.handleClose = this.handleClose.bind(this);

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


  deleteConsult(no) {
    const url = 'http://localhost:8080/api/consult/' + no;
    fetch(url, {
      method: 'DELETE'
    });
    alert("삭제 되었습니다.");
    this.props.stateRefresh();
  }


  render() {
    return (
      <div>
        <CButton variant="outlined" color="secondary" onClick={this.handleClickOpen}>
          삭제
        </CButton>

        <CCardBody onClose={this.handleClose} open={this.state.open}>

          <CFormGroup>
            <CButton variant="contained" color="primary" onClick={(e) => {
              this.deleteCustomer(this.props.no)
            }}>삭제</CButton>
            <CButton variant="outlined" color="primary" onClick={this.handleClose}>닫기</CButton>
          </CFormGroup>

        </CCardBody>
      </div>
    )
  }
}

export default withRouter(Consult_Delete)