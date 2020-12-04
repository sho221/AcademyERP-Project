import React, { Component } from "react";
//import axios from "axios";
import {
    CButton,
    CCard,
    CCardBody,
    CCardFooter,
    CCardHeader,
    CCol,
    CCollapse,
    CDropdownItem,
    CDropdownMenu,
    CDropdownToggle,
    CFade,
    CForm,
    CFormGroup,
    CFormText,
    CValidFeedback,
    CInvalidFeedback,
    CTextarea,
    CInput,
    CInputFile,
    CInputCheckbox,
    CInputRadio,
    CInputGroup,
    CInputGroupAppend,
    CInputGroupPrepend,
    CDropdown,
    CInputGroupText,
    CLabel,
    CSelect,
    CRow,
    CSwitch
  } from '@coreui/react'
  import CIcon from '@coreui/icons-react'
   // import { DocsLink } from 'src/reusable'

class Ins_stu extends Component {
render() {
return (
<CRow>
        <CCol xs="12" md="6">
          <CCard>
            <CCardHeader>
              학생 정보 등록
              <small> Elements</small>
            </CCardHeader>
            <CCardBody>
              <CForm action="" method="post" encType="multipart/form-data" className="form-horizontal">
               <CFormGroup row>
                  <CCol md="3">
                    <CLabel htmlFor="text-input">이름</CLabel>
                  </CCol>
                  <CCol xs="12" md="9">
                    <CInput id="text-input" name="text-input" placeholder="이름" />
                    <CFormText>이름을 입력하세요</CFormText>
                  </CCol>
                </CFormGroup>
                <CFormGroup row>
                  <CCol md="3">
                    <CLabel htmlFor="text-input">핸드폰 번호</CLabel>
                  </CCol>
                  <CCol xs="12" md="9">
                    <CInput id="text-input" name="text-input" placeholder="핸드폰 번호" />
                    <CFormText>숫자만 입력하세요</CFormText>
                  </CCol>
                </CFormGroup>
                <CFormGroup row>
                  <CCol md="3">
                    <CLabel htmlFor="email-input">이메일주소</CLabel>
                  </CCol>
                  <CCol xs="12" md="9">
                    <CInput type="email" id="email-input" name="email-input" placeholder="이메일 주소" autoComplete="email"/>
                    <CFormText className="help-block">이메일주소를 입력하세요</CFormText>
                  </CCol>
                </CFormGroup>
                <CFormGroup row>
                  <CCol md="3">
                    <CLabel htmlFor="date-input">생년월일</CLabel>
                  </CCol>
                  <CCol xs="12" md="9">
                    <CInput type="date" id="date-input" name="date-input" placeholder="생년월일" />
                  </CCol>
                </CFormGroup><CFormGroup row>
                  <CCol md="3">
                    <CLabel htmlFor="text-input">주소 입력</CLabel>
                  </CCol>
                  <CCol xs="12" md="9">
                    <CInput id="text-input" name="text-input" placeholder="주소" />
                    <CFormText>주소를 입력하세요</CFormText>
                  </CCol>
                </CFormGroup>
                <CFormGroup row>
                  <CCol md="3">
                    <CLabel htmlFor="select">수강과목</CLabel>
                  </CCol>
                  <CCol xs="12" md="9">
                    <CSelect custom name="curri" id="curri">
                    <option value="0">과목을 선택하세요</option>
                      <option value="1">JAVA</option>
                      <option value="2">PYTHON</option>
                      <option value="3">C++</option>
                      <option value="3">KOTLIN</option>
                    </CSelect>
                  </CCol>
                </CFormGroup>
                
                <CFormGroup row>
                  <CCol md="3">
                    <CLabel>성별</CLabel>
                  </CCol>
                  <CCol md="9">
                    <CFormGroup variant="custom-radio" inline>
                      <CInputRadio custom id="inline-radio1" name="inline-radios" value="male" />
                      <CLabel variant="custom-checkbox" htmlFor="inline-radio1">남성</CLabel>
                    </CFormGroup>
                    <CFormGroup variant="custom-radio" inline>
                      <CInputRadio custom id="inline-radio2" name="inline-radios" value="female" />
                      <CLabel variant="custom-checkbox" htmlFor="inline-radio2">여성</CLabel>
                    </CFormGroup>
                  </CCol>
                </CFormGroup>
              </CForm>
            </CCardBody>
            <CCardFooter>
              <CButton type="submit" size="sm" color="primary"><CIcon name="cil-scrubber" /> Submit</CButton>
              <CButton type="reset" size="sm" color="danger"><CIcon name="cil-ban" /> Reset</CButton>
            </CCardFooter>
          </CCard>
          </CCol>
        </CRow>
);
}
}

export default Ins_stu;