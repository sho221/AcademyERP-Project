import React, { Component } from "react";
import {
    CButton,
    CCard,
    CCardBody,
    CCardFooter,
    CCol,
    CForm,
    CFormGroup,
    CTextarea,
    CInput,
    CInputRadio,
    CLabel
} from '@coreui/react'
import axios from "axios";

class Consult_Insert extends Component {

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
          axios.get("http://localhost:8080/api/Consult_Insert")
              .then(res => {
                  console.log(res);
                  this.setState({
                    ItemList: res.data.message
                  })
              })
              .catch(res => console.log(res))
      }

render() {
    const { ItemList } = this.state;
    console.log(ItemList);
    return (
        <CCol xs="12" md="6">
          {/* <CForm name="f" method="post" onsubmit="return check()"> */}
        <CCard>
          <CCardBody>
            <CForm action="" method="post" encType="multipart/form-data" className="form-horizontal">
              <CFormGroup row>
                <CCol md="3">
                  <CLabel htmlFor="text-input">성명</CLabel>
                </CCol>
                <CCol xs="12" md="9">
                  <CInput id="text-input" name="text-input"/>
                  {/* <CFormText>This is a help text</CFormText> */}
                </CCol>
              </CFormGroup>
              <CFormGroup row>
                <CCol md="3">
                  <CLabel htmlFor="text-input">전화번호</CLabel>
                </CCol>
                <CCol xs="12" md="9">
                  <CInput id="text-input" name="text-input" />-
                  <CInput id="text-input" name="text-input" />-
                  <CInput id="text-input" name="text-input" />
                  {/* <CFormText>This is a help text</CFormText> */}
                </CCol>
              </CFormGroup>
              <CFormGroup row>
                <CCol md="3">
                  <CLabel htmlFor="date-input">상담날짜</CLabel>
                </CCol>
                <CCol xs="12" md="9">
                  <CInput type="date" id="date-input" name="date-input" placeholder="date" />
                </CCol>
              </CFormGroup>
              <CFormGroup row>
                <CCol md="3">
                  <CLabel htmlFor="textarea-input">메모</CLabel>
                </CCol>
                <CCol xs="12" md="9">
                  <CTextarea 
                    name="textarea-input" 
                    id="textarea-input" 
                    rows="9"
                    placeholder="Content..."/>
                </CCol>
              </CFormGroup>
              <CFormGroup row>
                <CCol md="3">
                  <CLabel>상담</CLabel>
                </CCol>
                <CCol md="9">
                  <CFormGroup variant="custom-radio" inline>
                    <CInputRadio custom id="inline-radio1" name="inline-radios" value="option1" />
                    <CLabel variant="custom-checkbox" htmlFor="inline-radio1">전화상담</CLabel>
                  </CFormGroup>
                  <CFormGroup variant="custom-radio" inline>
                    <CInputRadio custom id="inline-radio2" name="inline-radios" value="option2" />
                    <CLabel variant="custom-checkbox" htmlFor="inline-radio2">온라인상담</CLabel>
                  </CFormGroup>
                </CCol>
              </CFormGroup>
            </CForm>
          </CCardBody>
          <CCardFooter>
            <CButton type="submit" size="sm" color="primary">저장</CButton>
            <CButton type="reset" size="sm" color="danger">취소</CButton>
          </CCardFooter>
        </CCard>
        {/* </CForm> */}
        </CCol>
  );
}
}

export default Consult_Insert;
