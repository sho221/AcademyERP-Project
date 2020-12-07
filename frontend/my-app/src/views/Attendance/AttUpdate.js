import React, { Component } from 'react'
import {CButton,CCard,CCardBody, CCardFooter,CCardHeader,CCol,CForm,CFormGroup,CRow,CSelect,CLabel} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import axios from "axios";
import moment from "moment"


class AttUpdate extends Component{
  constructor(props) {
    super(props)
    this.state = {
      attList: ""
    }
  }
  componentDidMount(){
    const { params } = this.props.match;
    axios.get("http://localhost:8083/Attget?no="+params.no).then(res => {
      console.log(res);
      this.setState({
        attList: res.data.list
      })
    }).catch(res => console.log(res))

  }

  getMAX_day(y,m){
    return new Date(y,m,0).getDate()
  }

  makeYears(yyyy){
    var result=[];
    for(var i=4;i>=0;i--) result.push(Number(yyyy)-i)   
    for(var l=1;l<5;l++) result.push(Number(yyyy)+l)    
    return result;
  }
  
  OneToTwo(i){
    if(Number(i)<10) i="0"+i;
    return i;
  }

  makeDays(MAXday){
    var days=[];
    if(Number(MAXday)===24){
      for(var i=1;i<=MAXday;i++){
        days.push(this.OneToTwo(i));
      }
    }else{
      for(var l=1;l<=MAXday;l++){
        days.push(l);
      }
    }
    return days;
  }

  makeTimes(MAX){
    var days=[];
    for(var i=0;i<=MAX;i++){
      days.push(this.OneToTwo(i));
    }
    return days;
  }


  reset(){
    var tag = document.getElementsByClassName("re");
    for(var i=0;i<tag.length;i++){
      tag[i].value=""
    }
  }

  render(){
    const { attList } = this.state;
    const yyyy=moment(attList.day).format("YYYY");
    const mm=moment(attList.day).format("MM");
    const dd=moment(attList.day).format("DD");
    const S_hh=moment("2020-11-11 "+attList.start_time).format("HH");
    const S_mi=moment("2020-11-11 "+attList.start_time).format("mm");
    const S_ss=moment("2020-11-11 "+attList.start_time).format("ss");
    const E_hh=moment("2020-11-11 "+attList.end_time).format("HH");
    const E_mi=moment("2020-11-11 "+attList.end_time).format("mm");
    const E_ss=moment("2020-11-11 "+attList.end_time).format("ss");
    const MAX_day=this.getMAX_day(yyyy,mm);
    const years=this.makeYears(yyyy);
    const days=this.makeDays(MAX_day);
    const months=[1,2,3,4,5,6,7,8,9,10,11,12];
    const times=this.makeDays(24);
    const mins=this.makeTimes(60);
    const secs=this.makeTimes(60);
    const OX=[0,1];
    return (
      <CCard>
        <CCardHeader>
          Number : {attList.no}
          <small> employee : {attList.employee_no}</small>
        </CCardHeader>
        <CCardBody>
          <CForm action="asd" method="post" className="form-horizontal">
            <CRow>
              <CCol xs="4">
                <CFormGroup>
                  <CLabel htmlFor="ccyear">Year</CLabel>
                  <CSelect custom name="ccyear" id="ccyear">
                    {years.map((yeardata)=>{
                      if(yeardata===Number(yyyy)){return( <option selected="selected" value={yeardata}>{yeardata}</option> )}
                      else{return( <option value={yeardata}>{yeardata}</option> )}
                    })}
                  </CSelect>
                </CFormGroup>
              </CCol>
              <CCol xs="4">
                <CFormGroup>
                  <CLabel htmlFor="ccmonth">Month</CLabel>
                  <CSelect custom name="ccmonth" id="ccmonth">
                    {months.map((monthdata)=>{
                      if(monthdata===Number(mm)){return( <option selected="selected" value={monthdata}>{monthdata}</option> );}
                      else{return( <option value={monthdata}>{monthdata}</option> );}
                    })}
                  </CSelect>
                </CFormGroup>
              </CCol>
              <CCol xs="4">
                <CFormGroup>
                  <CLabel htmlFor="ccmonth">Day</CLabel>
                  <CSelect custom name="ccmonth" id="ccmonth">
                    {days.map((daydata)=>{
                      if(daydata===Number(dd)) return(<option selected="selected" value={daydata}>{daydata}</option>);
                      else return(<option value={daydata}>{daydata}</option>)
                    })}
                  </CSelect>
                </CFormGroup>
              </CCol>
            </CRow>
            <CFormGroup row>
              <CCol md="3">
                <CLabel htmlFor="hf-email">START</CLabel>
              </CCol>
              <CCol xs="12" md="3">
                <CSelect custom name="ccmonth" id="ccmonth">
                  {times.map((daydata)=>{
                    if(daydata===this.OneToTwo(Number(S_hh))) return(<option selected="selected" value={daydata}>{daydata}</option>);
                    else return(<option value={daydata}>{daydata}</option>)
                  })}
                </CSelect>
              </CCol>
              <CCol xs="12" md="3">
                <CSelect custom name="ccmonth" id="ccmonth">
                  {mins.map((daydata)=>{
                    if(daydata===this.OneToTwo(Number(S_mi))) return(<option selected="selected" value={daydata}>{daydata}</option>);
                    else return(<option value={daydata}>{daydata}</option>)
                  })}
                </CSelect>
              </CCol>
              <CCol xs="12" md="3">
                <CSelect custom name="ccmonth" id="ccmonth">
                  {secs.map((daydata)=>{
                    if(daydata===this.OneToTwo(Number(S_ss))) return(<option selected="selected" value={daydata}>{daydata}</option>);
                    else return(<option value={daydata}>{daydata}</option>)
                  })}
                </CSelect>
              </CCol>
            </CFormGroup><CFormGroup row>
              <CCol md="3">
                <CLabel htmlFor="hf-email">END</CLabel>
              </CCol>
              <CCol xs="12" md="3">
                <CSelect custom name="ccmonth" id="ccmonth">
                  {times.map((daydata)=>{
                    if(daydata===this.OneToTwo(Number(E_hh))) return(<option selected="selected" value={daydata}>{daydata}</option>);
                    else return(<option value={daydata}>{daydata}</option>)
                  })}
                </CSelect>
              </CCol>
              <CCol xs="12" md="3">
                <CSelect custom name="ccmonth" id="ccmonth">
                  {mins.map((daydata)=>{
                    if(daydata===this.OneToTwo(Number(E_mi))) return(<option selected="selected" value={daydata}>{daydata}</option>);
                    else return(<option value={daydata}>{daydata}</option>)
                  })}
                </CSelect>
              </CCol>
              <CCol xs="12" md="3">
                <CSelect custom name="ccmonth" id="ccmonth">
                  {secs.map((daydata)=>{
                    if(daydata===this.OneToTwo(Number(E_ss))) return(<option selected="selected" value={daydata}>{daydata}</option>);
                    else return(<option value={daydata}>{daydata}</option>)
                  })}
                </CSelect>
              </CCol>
            </CFormGroup><CFormGroup row>
              <CCol md="3">
                <CLabel htmlFor="hf-email">NIGHT</CLabel>
              </CCol>
              <CCol xs="12" md="9">
                <CSelect custom name="ccmonth" id="ccmonth">
                  {OX.map((ox) => {
                    var temp="O"
                    if(ox===0) temp="X";
                    if(ox===attList.light) return(<option value={ox} selected="selected">{temp}</option>);
                    else return(<option value={ox}>{temp}</option>);
                  })}                 
                </CSelect>
              </CCol>
            </CFormGroup>
          </CForm>
        </CCardBody>
        <CCardFooter>
          <CButton type="submit" size="sm" color="primary"><CIcon name="cil-scrubber" /> Submit</CButton> <CButton type="reset" size="sm" color="danger" onClick={()=>{this.reset()}}><CIcon name="cil-ban" /> Reset</CButton>
        </CCardFooter>
      </CCard>       
    )
  }
}
export default AttUpdate