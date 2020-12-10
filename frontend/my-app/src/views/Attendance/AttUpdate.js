import React, { Component } from 'react'
import {CButton,CCard,CCardBody, CCardFooter,CCardHeader,CCol,CForm,CFormGroup,CRow,CSelect,CLabel,CInput} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import axios from "axios";
import moment from "moment"

var first=1;
class AttUpdate extends Component{
  constructor(props) {
    super(props)
    this.state = {
      attList: "",
      no: "",
      employee_no: "",
      year: "",
      month: "",
      day: "",
      SH: "",
      SM: "",
      SS: "",
      EH: "",
      EM: "",
      ES: "",
      night: ""
    }
    this.handleFormSubmit = this.handleFormSubmit.bind(this)
    this.handleValueChange = this.handleValueChange.bind(this)
  }
  componentDidMount(){
    const { params } = this.props.match;
    axios.get("http://localhost:8083/api/Attget?no="+params.no).then(res => {
      console.log(res);
      this.setState({
        attList: res.data.list
      })
      const yyyy=moment(res.data.list.day).format("YYYY");
      const mm=moment(res.data.list.day).format("MM");
      const dd=moment(res.data.list.day).format("DD");
      const S_hh=moment("2020-11-11 "+res.data.list.start_time).format("HH");
      const S_mi=moment("2020-11-11 "+res.data.list.start_time).format("mm");
      const S_ss=moment("2020-11-11 "+res.data.list.start_time).format("ss");
      const E_hh=moment("2020-11-11 "+res.data.list.end_time).format("HH");
      const E_mi=moment("2020-11-11 "+res.data.list.end_time).format("mm");
      const E_ss=moment("2020-11-11 "+res.data.list.end_time).format("ss");
      this.setState({
      no: res.data.list.no,
      employee_no: res.data.list.employee_no,
      year: yyyy,
      month: mm,
      day: dd,
      SH: S_hh,
      SM: S_mi,
      SS: S_ss,
      EH: E_hh,
      EM: E_mi,
      ES: E_ss,
      night: res.data.list.night
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
    if(Number(i)<10){
      if(i.length<2){
        i="0"+i;
      }
    } 
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
   
    var list=[yyyy,Number(mm),Number(dd),S_hh,S_mi,S_ss,E_hh,E_mi,E_ss,attList.night]
    var tag = document.getElementsByClassName("re");
    for(var i=0;i<tag.length;i++){
      console.log(list[i])
      tag[i].value=list[i]
    }
  }
  handleFormSubmit() {
    axios.post(`http://localhost:8083/api/Attupdate/`+this.state.no,{
      no: this.state.no,
      employee_no: Number(this.state.employee_no),
      day: this.state.year+"-"+this.state.month+"-"+this.state.day,
      start_time: this.state.SH+":"+this.state.SM+":"+this.state.SS,
      end_time: this.state.EH+":"+this.state.EM+":"+this.state.ES,
      night: this.state.night  
    })
      .then(
        console.log("ASD"+this.state.employee_no),
        console.log("ASD"+this.state.SH+":"+this.state.SM+":"+this.state.SS),
        console.log("ASD"+this.state.EH+":"+this.state.EM+":"+this.state.ES),

        alert("수정"),
        document.location.href = "#/Attendance"
      )
      .catch(function (error){
        console.log(error)
      })
  }
  handleValueChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    })
  }
  render(){
    const { attList } = this.state;
    const yyyy=moment(attList.day).format("YYYY");
    const mm=moment(attList.day).format("MM");
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
          Number : {attList.no}///{mins[1]}
          <small> employee : {attList.employee_no}</small>  

          
        </CCardHeader>
        <CCardBody>
            <CRow>
              <CCol xs="4">
                <CFormGroup>
                  <CLabel htmlFor="ccyear">Year</CLabel>
                  <CSelect custom name="year" id="ccyear" className="re" onChange={this.handleValueChange}>
                    {years.map((yeardata)=>{
                      return( <option value={yeardata}>{yeardata}</option>);
                    })}
                  </CSelect>
                </CFormGroup>
              </CCol>
              <CCol xs="4">
                <CFormGroup>
                  <CLabel htmlFor="ccmonth">Month</CLabel>
                  <CSelect custom name="month" id="ccmonth" className="re" onChange={this.handleValueChange}> 
                    {months.map((monthdata)=>{
                      return( <option value={monthdata}>{monthdata}</option> );
                    })}
                  </CSelect>
                </CFormGroup>
              </CCol>
              <CCol xs="4">
                <CFormGroup>
                  <CLabel htmlFor="ccmonth">Day</CLabel>
                  <CSelect custom name="day" id="ccmonth" className="re" onChange={this.handleValueChange}>
                    {days.map((daydata)=>{
                      return(<option value={daydata}>{daydata}</option>)
                    })}
                  </CSelect>
                </CFormGroup>
              </CCol>
            </CRow>
            <CFormGroup row>
              <CCol md="3">
                <CLabel htmlFor="hf-email">START_TIME</CLabel>
              </CCol>
              <CCol xs="12" md="3">
                <CSelect custom name="SH" id="ccmonth" className="re" onChange={this.handleValueChange}>
                  {times.map((daydata)=>{
                    if(daydata<10) daydata="0"+daydata;
                    return(<option value={daydata}>{daydata}</option>)
                  })}
                </CSelect>
              </CCol>
              <CCol xs="12" md="3">
                <CSelect custom name="SM" id="ccmonth" className="re" onChange={this.handleValueChange}>
                  {mins.map((daydata)=>{
                    if(daydata<10) daydata="0"+daydata;
                    return(<option value={daydata}>{daydata}</option>)
                  })}
                </CSelect>
              </CCol>
              <CCol xs="12" md="3">
                <CSelect custom name="SS" id="ccmonth" className="re" onChange={this.handleValueChange}>
                  {secs.map((daydata)=>{
                    if(daydata<10) daydata="0"+daydata;
                    return(<option value={this.OneToTwo(daydata)}>{this.OneToTwo(daydata)}</option>)
                  })}
                </CSelect>
              </CCol>
            </CFormGroup><CFormGroup row>
              <CCol md="3">
                <CLabel htmlFor="hf-email">END_TIME</CLabel>
              </CCol>
              <CCol xs="12" md="3">
                <CSelect custom name="EH" id="ccmonth" className="re" onChange={this.handleValueChange}>
                  {times.map((daydata)=>{
                    if(daydata<10) daydata="0"+daydata;
                    return(<option value={daydata}>{daydata}</option>)
                  })}
                </CSelect>
              </CCol>
              <CCol xs="12" md="3">
                <CSelect custom name="EM" id="ccmonth" className="re" onChange={this.handleValueChange}>
                  {mins.map((daydata)=>{
                    if(daydata<10) daydata="0"+daydata;
                    return(<option value={daydata}>{daydata}</option>)
                  })}
                </CSelect>
              </CCol>
              <CCol xs="12" md="3">
                <CSelect custom name="ES" id="ccmonth" className="re" onChange={this.handleValueChange}>
                  {secs.map((daydata)=>{
                    if(daydata<10) daydata="0"+daydata;
                    return(<option value={daydata}>{daydata}</option>)
                  })}
                </CSelect>
              </CCol>
            </CFormGroup><CFormGroup row>
              <CCol md="3">
                <CLabel htmlFor="hf-email">NIGHT</CLabel>
              </CCol>
              <CCol xs="12" md="9">
                <CSelect custom name="night" id="ccmonth" className="re" onChange={this.handleValueChange}> 
                  {OX.map((ox) => {
                    var temp="O"
                    if(ox===0) temp="X";
                    return(<option value={ox}>{temp}</option>);
                  })}                 
                </CSelect>
              </CCol>
            </CFormGroup>
            <CCardFooter>
          <CButton onClick={()=>{this.handleFormSubmit()}} size="sm" color="primary" ><CIcon name="cil-scrubber" /> Submit</CButton> <CButton size="sm" color="danger" onClick={()=>{this.reset()}}><CIcon name="cil-ban" /> Reset</CButton>
        </CCardFooter>
        </CCardBody>
      </CCard>       
    )
  }
}
export default AttUpdate