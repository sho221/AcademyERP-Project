import React, { Component } from "react";
import axios from "axios";
import '../css/table.css';
import { Link } from 'react-router-dom';
import Moment from "moment"

const _numbers=[5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24];
const _color=["#F5A9BC","#58FAF4","#F3F781","#00FFBF","#82FA58"];
const _week=[1,2,3,4,5,6,0];
const _default=0,_weekly=1,_monthly=2;
const _HRD=1;
let HRD_login=false;
var session_dep=window.sessionStorage.getItem('dep');
if(Number(session_dep)===_HRD){
  HRD_login=true;
}

var cot=-1;
class AttTable extends Component {
  constructor(props) {
    super(props)
    this.state = {
        ItemList: "",
        depList: "",
        q: [1],
        date: new Date(),
        day: '',
        today: Moment().format('YYYY-MM-DD'), //i
        name: '',
        dep: '',
        start: '',
        end: '',
        mode: this.props.mode,
        loopCheck: true
    }
    this.nameChange = this.nameChange.bind(this);
    this.dayChange = this.dayChange.bind(this);
    this.depChange = this.depChange.bind(this);
    this.nameChange2 = this.nameChange2.bind(this);
    this.dayChange2 = this.dayChange2.bind(this);
    this.depChange2 = this.depChange2.bind(this);
    this.dateDay = this.dateDay.bind(this); 
    this.getWeekly = this.getWeekly.bind(this);
  }
  componentDidMount() {
    this.getApi();
  }
  DayToSETime(value){
    var getDay=this.dateDay(value)-1
    var start=Moment(value).add(getDay*-1,'days').format("YYYY-MM-DD")
    var end=Moment(start).add(6,'days').format("YYYY-MM-DD")
    this.setState({
      day: value,
      start: start,
      end: end
    })
    return({start: start,end: end})
  }
  timemap(time){          //일간 처음 빈공간을 구해줌
    var arr=[];
    var temp = new Date("2020-11-11 "+time)
    var temp2=(Moment(temp).format("HH"))*6
    var mit=Moment(temp).format("mm")/10+temp2
    for (var index = 30; index < mit; index++) {
        arr.push(index)
    }
    return arr;
  }
  timemap2(in_time1,in_time2){ //일간 색깔 공간을 구해줌
    var arr=[];
    var time1 = new Date("2020-11-11 "+in_time1)
    var time2 = new Date("2020-11-11 "+in_time2)
    var sh=Moment(time1).format("HH")
    var eh=Moment(time2).format("HH")
    var sm=Moment(time1).format("mm")
    var em=Moment(time2).format("mm")
    var hh=(eh-sh)*6
    var rm=(em-sm)/10
    var sum=hh+rm
    for (var index = 3; index < sum; index++) {
        arr.push(index)
    }
    return arr;
  }
  timemap3(time1,time2){      //1,2채우고 나머지공간을 구해줌
    var arr=[];
    var timesum=this.timemap(time1).length+this.timemap2(time1,time2).length;
    for (var index = 0; index < 117-timesum; index++) {
      arr.push(index)
    }
    return arr;
  }
  dateDay(day){     //입력받은 날짜의 요일을 구해줌
    return new Date(day).getDay();
  }
  countSeconds = (str) => {     //HH:MM:SS=>cenond
    const [hh = '0', mm = '0', ss = '0'] = (str || '0:0:0').split(':');
    const hour = parseInt(hh, 10) || 0;
    const minute = parseInt(mm, 10) || 0;
    const second = parseInt(ss, 10) || 0;
    return (hour*3600) + (minute*60) + (second);
  }
  reseconds = (seconds) => {    //cenond=>HH:MM:SS
    var hour = parseInt(seconds/3600);
    var min = parseInt((seconds%3600)/60);
    var sec = seconds%60;
    
    return this.septo(hour)+':'+this.septo(min)+':'+this.septo(sec)
  }
  septo = (tt) =>{            //한자릿수를 두자리수로
    if(tt<10){
      tt='0'+tt;
    }
    return tt;
  }
  subsec = (sec1,sec2) =>{        //시간을 빼는 함수
    var result;
    if(sec1===0 || sec2===0){
      result=0;
    }else{
      result=sec1-sec2;
    }
    return result;
  }
  nameChange = (e) => {         //name변경
    this.setState({
      name: e.target.value
    })
    axios({
      method:'get',
      url:encodeURI('http://localhost:8083/api2/attfind?day='+this.state.day+'&name='+e.target.value+'&dep='+this.state.dep),
      responseType:'stream',
      responseEncoding: 'UTF-8',
    }).then(res => {
        console.log(res); 
        this.setState({
          ItemList: res.data.list
        })
      }).catch(res => console.log(res))
  }
  dayChange = (e) => {        //day변경 
    this.setState({
      day: e.target.value,
      loopCheck: true
    })
    this.DayToSETime(e.target.value);
    axios({
      method:'get',
      url:encodeURI('http://localhost:8083/api2/attfind?day='+e.target.value+'&name='+this.state.name+'&dep='+this.state.dep),
      responseType:'stream',
      responseEncoding: 'UTF-8',
    }).then(res => {
        console.log(res); 
        this.setState({
        ItemList: res.data.list
        })
      }).catch(res => console.log(res))
  }
  depChange = (e) => {        //dep변경
    this.setState({
      dep: e.target.value
    })
    axios({
      method:'get',
      url:encodeURI('http://localhost:8083/api2/attfind?day='+this.state.day+'&name='+this.state.name+'&dep='+e.target.value),
      responseType:'stream',
      responseEncoding: 'UTF-8',
    }).then(res => {
        console.log(res); 
        this.setState({
        ItemList: res.data.list
        })
      }).catch(res => console.log(res))
  }
  nameChange2 = (e) => {      //주간 name변경
    this.setState({
      name: e.target.value
    })
    axios({
      method:'get',
      url:encodeURI('http://localhost:8083/api2/attfind3?start='+this.state.start+'&end='+this.state.end+'&name='+e.target.value+'&dep='+this.state.dep),
      responseType:'stream',
      responseEncoding: 'UTF-8',
    }).then(res => {
        console.log(res); 
        this.setState({
          ItemList: res.data.list
        })
      }).catch(res => console.log(res))
  } 
  dayChange2 = (e) => {       //주간 day변경
    var Time=this.DayToSETime(e.target.value);

    axios({
      method:'get',
      url:encodeURI('http://localhost:8083/api2/attfind3?start='+Time.start+'&end='+Time.end+'&name='+this.state.name+'&dep='+this.state.dep),
      responseType:'stream',
      responseEncoding: 'UTF-8',
    }).then(res => {
        console.log(res); 
        this.setState({
        ItemList: res.data.list
        })
      }).catch(res => console.log(res))
  }
  depChange2 = (e) => {       //주간 dep변경
    this.setState({
      dep: e.target.value
    })
    axios({
      method:'get',
      url:encodeURI('http://localhost:8083/api2/attfind3?start='+this.state.start+'&end='+this.state.end+'&name='+this.state.name+'&dep='+e.target.value),
      responseType:'stream',
      responseEncoding: 'UTF-8',
    }).then(res => {
        console.log(res); 
        this.setState({
        ItemList: res.data.list
        })
      }).catch(res => console.log(res))
  }
  getWeekly(day){
    var getDay=this.dateDay(day)-1
    var start=Moment(day).add(getDay*-1,'days').format("YYYY-MM-DD")
    var end=Moment(start).add(6,'days').format("YYYY-MM-DD")
    this.setState({
      day: day,
      start: start,
      end: end
    })
    axios({
      method:'get',
      url:encodeURI('http://localhost:8083/api2/attfind3?start='+start+'&end='+end+'&name='+this.state.name+'&dep='+this.state.dep),
      responseType:'stream',
      responseEncoding: 'UTF-8',
    }).then(res => {
        console.log(res); 
        this.setState({
        ItemList: res.data.list
        })
      }).catch(res => console.log(res))
  }
  DayReset(){
    alert("날짜 초기화")
    var day=document.getElementsByClassName("day")
    for(var i=0;i<day.length;i++){
      day[i].value="";
    }
    this.setState({
      day: '',
      loopCheck: true
    })
    axios({
      method:'get',
      url:encodeURI('http://localhost:8083/api2/attfind?day=&name='+this.state.name+'&dep='+this.state.dep),
      responseType:'stream',
      responseEncoding: 'UTF-8',
    }).then(res => {
        console.log(res); 
        this.setState({
        ItemList: res.data.list
        })
      }).catch(res => console.log(res))
  }
  getApi = () => {
    axios.get("http://localhost:8083/api2/att")
        .then(res => {
            console.log(res);
            this.setState({
              ItemList: res.data.list
            })
        })
        .catch(res => console.log(res))
    axios.get("http://localhost:8083/api/depart")
    .then(res => {
        console.log(res);
        this.setState({
          depList: res.data.depart
        })
    })
    .catch(res => console.log(res))
  }

  render() {
    const { ItemList } = this.state;
    const { depList } = this.state;
    const { q } = this.state;
    var temp=[];
    var Tname='';
    var tempString='';
    var depname='';
  
    if(this.props.mode===_weekly){
      if(this.state.day===''){
        this.getWeekly(this.state.today)
        this.setState({day: this.state.today})
      }else if(this.state.loopCheck){
        this.getWeekly(this.state.day)
        this.setState({loopCheck: false})
      }
      if(ItemList.length>=1){
        var num=ItemList[0].employee_no;
        for(var i=0;i<ItemList.length;i++){
          for(var l=0;l<depList.length;l++){
            if(ItemList[i].department*1===depList[l].no){
              depname=depList[l].name
            }
          }
          if(ItemList[i].employee_no===num){
            tempString = tempString + '/'+ ItemList[i].day;
            Tname=ItemList[i].name+"("+depname+")"
          }else{
            temp.push({
              days: tempString,
              name: Tname
            })
            tempString='/'+ ItemList[i].day;
            num=ItemList[i].employee_no
            Tname=ItemList[i].name+"("+depname+")"
          }
          if(i===ItemList.length-1){
            temp.push({
              days: tempString,
              name: Tname
            })
          }
        }
      }
    }
    return (
      <div>
        {this.props.mode===_default &&
          <div>
            <input 
              type='date'
              value={this.state.day}
              onChange={this.dayChange}
              class="day"
            />
            <input
              placeholder="이름"
              value={this.state.name}
              onChange={this.nameChange}
            />
            <select onChange={this.depChange} value={this.state.dep}>
              <option value="">부서선택</option>
                {depList&&depList.map((itemdata, insertIndex) => {
                  return(<option value={itemdata.no} >{insertIndex+1}.{itemdata.name}</option>);
                })}
            </select>
            <button onClick={() =>{this.DayReset()}}>날짜 초기화</button>
            <table name="ATT" class="default">
            <thead>
              <tr class="default">
                <td class="default">NO</td><td class="default">근무일자</td><td class="default">부서</td>
                <td class="default">이름</td><td class="default">직급</td><td class="default">출근시간</td>
                <td class="default">퇴근시간</td><td class="default">출근구분</td><td class="default">퇴근구분</td>
                <td class="default">연장근무시간</td><td class="default">총근무시간</td>
                {HRD_login===true ? <td class="default">수정</td>:""}
              </tr>
            </thead>
            <tbody>
            {ItemList&&ItemList.map((att) => {
              var bool = "정상"
              var bool2 = "정상"
              var time = "09:00:00"
              var time2 = "17:00:00"
              if(this.countSeconds(time)<this.countSeconds(att.start_time)){
                bool = "지각"
              }
              if(att.end_time==null){
                bool2 = ""
              }else if(this.countSeconds(att.end_time)<this.countSeconds(time2)){
                bool2 = "조퇴"
              }else if(att.night){
                bool2 = "연장"
              }
              return (
              <tr class="default">
                  <td class="default">{att.no}</td>
                  <td class="default">{att.day}</td>
                  {depList&&depList.map((dep) => { 
                    if(dep.no===(Number(att.department))) return <td class="default">{dep.name}</td>;
                    else return null;   
                  })}
                  
                  <td class="default">{att.name}</td>
                  <td class="default">{att.rank}</td>
                  <td class="default">{att.start_time}</td>
                  <td class="default">{att.end_time}</td>
                  <td class="default">{bool}</td>
                  <td class="default">{bool2}</td>
                  <td class="default">{att.night === 1 && this.reseconds(this.subsec(this.countSeconds(att.end_time),this.countSeconds(time2)))}</td>
                  <td class="default">{this.reseconds(this.subsec(this.countSeconds(att.end_time),this.countSeconds(att.start_time)))}</td>
                  {HRD_login===true ? <td class="default"><Link to={`/Attendance/${att.no}`}>수정</Link></td>:""}
                </tr>
              );
            })}
            </tbody> 
          </table>
          </div>
        }
        
        {this.props.mode===_weekly &&        
          <div>
            <input 
              type='date'
              value={this.state.day}
              onChange={this.dayChange2}
              class="day"
            />
            <input
              placeholder="이름"
              value={this.state.name}
              onChange={this.nameChange2}
            />
            <select onChange={this.depChange2} value={this.state.dep}>
              <option value="">부서선택</option>
                {depList&&depList.map((itemdata, insertIndex) => {
                  return(<option value={itemdata.no} >{insertIndex+1}.{itemdata.name}</option>);
                })}
            </select>
            <table class="b" width="100%" >
            <caption>{this.state.start}~{this.state.end}</caption>
              <thead>
                <tr>
                  <th width="10%" class="a"></th>
                  <th class="default">{Moment(this.state.start).add(0,'days').format("MM-DD")}     [월]</th>
                  <th class="default">{Moment(this.state.start).add(1,'days').format("MM-DD")}     [화]</th>
                  <th class="default">{Moment(this.state.start).add(2,'days').format("MM-DD")}     [수]</th>
                  <th class="default">{Moment(this.state.start).add(3,'days').format("MM-DD")}     [목]</th>
                  <th class="default">{Moment(this.state.start).add(4,'days').format("MM-DD")}     [금]</th>
                  <th class="default">{Moment(this.state.start).add(5,'days').format("MM-DD")}     [토]</th>
                  <th class="default">{Moment(this.state.start).add(6,'days').format("MM-DD")}     [일]</th>
                </tr>
              </thead>
              <tbody>
              {temp&&temp.map((itemdata) => {
                    cot=cot+1;
                    if(cot>=4) cot=0;
                    var day=itemdata.days.split("/");
                    
                    return(
                      <tr><td class="sm">{itemdata.name}</td>
                      {_week.map((z) => {
                        var bool=0;
                          for(var a=0;a<day.length;a++){
                            if(z===this.dateDay(day[a])){
                              bool=1;
                            }
                          }
                          if(bool===1){
                            return(<td bgcolor={_color[cot]} class="a"></td>);
                          }else return(<td class="a"></td>);
                      })}
                      </tr>
                    );
                  
              })}
              
              </tbody>
            </table>
          </div>
        }
            
        {this.props.mode===_monthly &&
          <div>
              <input 
                type='date'
                value={this.state.day}
                onChange={this.dayChange}
                class="day"
              />
              <input
                placeholder="이름"
                value={this.state.name}
                onChange={this.nameChange}
              />
              <select onChange={this.depChange} value={this.state.dep}>
              <option value="">부서선택</option>
                {depList&&depList.map((itemdata, insertIndex) => {
                  return(<option value={itemdata.no} >{insertIndex+1}.{itemdata.name}</option>);
                })}
            </select>
            <button onClick={() =>{this.DayReset()}}>날짜 초기화</button>
              <table class="b" width="100%" >
              <thead>
                
                <tr>
                  <th width="10%" >{this.state.day}</th>
                  {_numbers.map((member,) => {
                    return(
                      <th width="4%" class="a" colSpan="6">{member}</th>
                    );
                  })}
                </tr>
              </thead>
              <tbody>
                {ItemList&&ItemList.map((itemdata, insertIndex) => {
                    cot=cot+1;
                    if(cot>=4) cot=0;
                    var count=0;
                    return(
                      <tr key={insertIndex}>
                        <td  class="b">{itemdata.name}
                          {depList&&depList.map((dep, insertIndex2) => { 
                            if(dep.no===(itemdata.department*=1)) return <font size="1">({dep.name})[{itemdata.day}]</font>;
                            else return null;   
                          })}
                        </td>
                        {this.timemap(itemdata.start_time).map((d,insertIndex2) =>{
                          count=count+1;
                          if(count<6){return( <td name={insertIndex2}></td> );}
                          else{count=0; return( <td name={insertIndex2} class="e"></td> );}
                        })}
                        {q.map((f,insertIndex11) =>{
                          count=count+1;
                          if(count<6){return( <td bgcolor={_color[cot]} id="c"></td> );}
                          else{count=0; return( <td name={insertIndex11} class="e" ></td> );}
                        })}
                        {this.timemap2(itemdata.start_time,itemdata.end_time).map((c,insertIndex3) =>{
                          count=count+1;
                          if(count<6){return( <td bgcolor={_color[cot]}name={insertIndex3}></td> );}
                          else{count=0; return( <td bgcolor={_color[cot]}name={insertIndex3} class="e"></td> );}
                          })}
                        {q.map((g,insertIndex11) =>{
                          count=count+1;
                          if(count<6){return( <td bgcolor={_color[cot]} id="d"></td> );}
                          else{count=0; return( <td name={insertIndex11} class="e" ></td> );}
                        })}
                        {this.timemap3(itemdata.start_time,itemdata.end_time).map((h,insertIndex4) =>{
                          count=count+1;
                          if(count<6){return( <td name={insertIndex4}></td> );}
                          else{count=0; return( <td name={insertIndex4} class="e"></td> );}
                        })}
                      </tr>
                    );
                })}
              </tbody>
            </table>
          </div>
        }
      </div>
    );
  }
}

export default AttTable;