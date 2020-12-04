import React, { Component } from "react";
import axios from "axios";
import '../css/table.css';
import jQuery from "jquery";
import Moment from "moment"
window.$ = window.jQuery = jQuery;

var numbers=[5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24];
var color=["#F5A9BC","#58FAF4","#F3F781","#00FFBF","#82FA58"];
var week=[0,1,2,3,4,5,6];

var cot=-1;
class Users extends Component {
  constructor(props) {
    super(props)
    this.state = {
        ItemList: "",
        depList: "",
        q: [1],
        date: new Date(),
        day: '',
        i: Moment().format('YYYY-MM-DD'),
    }
    this.handleChange = this.handleChange.bind(this);
    this.dayChange = this.dayChange.bind(this);
    this.dayChange2 = this.dayChange2.bind(this);
    this.depChange = this.depChange.bind(this);
    this.dateDay = this.dateDay.bind(this);
  }
  state = {
    name: '',
    dep: '',
    start: '',
    end: ''
  }
  timemap(time){
    var arr=[];
    var a = new Date("2020-11-11 "+time)
    var b=(Moment(a).format("HH"))*6
    var mit=Moment(a).format("mm")/10+b
    for (var index = 30; index < mit; index++) {
        arr.push(index)
    }
    return arr;
  }
  timemap2(time1,time2){
    var arr=[];
    var a = new Date("2020-11-11 "+time1)
    var b = new Date("2020-11-11 "+time2)
    var sh=Moment(a).format("HH")
    var eh=Moment(b).format("HH")
    var sm=Moment(a).format("mm")
    var em=Moment(b).format("mm")
    var hh=(eh-sh)*6
    var rm=(em-sm)/10
    var c=hh+rm
    for (var index = 3; index < c; index++) {
        arr.push(index)
    }
    return arr;
  }
  timemap3(time1,time2){
    var arr=[];
    var tt=this.timemap(time1).length+this.timemap2(time1,time2).length;
    for (var index = 0; index < 117-tt; index++) {
      arr.push(index)
  }
    return arr;
  }
  dateDay(a){
    return new Date(a).getDay();
  }
  componentDidMount() {
    this.getApi();
  }
  countSeconds = (str) => {
    const [hh = '0', mm = '0', ss = '0'] = (str || '0:0:0').split(':');
    const hour = parseInt(hh, 10) || 0;
    const minute = parseInt(mm, 10) || 0;
    const second = parseInt(ss, 10) || 0;
    return (hour*3600) + (minute*60) + (second);
  }
  septo = (tt) =>{
    if(tt<10){
      tt='0'+tt;
    }
    return tt;
  }
  reseconds = (seconds) => {
    var hour = parseInt(seconds/3600);
    var min = parseInt((seconds%3600)/60);
    var sec = seconds%60;
    
    return this.septo(hour)+':'+this.septo(min)+':'+this.septo(sec)
  }
  subsec = (sec1,sec2) =>{
    var result;
    if(sec1===0 || sec2===0){
      result=0;
    }else{
      result=sec1-sec2;
    }
    return result;
  }
  handleChange = (e) => {
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
  dayChange = (e) => {
    this.setState({
      day: e.target.value
    })
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
  depChange = (e) => {
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
  handleChange2 = (e) => {
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
  dayChange2 = (e) => {
    var dd=this.dateDay(e.target.value)-1
    var start=Moment(e.target.value).add(dd*-1,'days').format("YYYY-MM-DD")
    var end=Moment(start).add(6,'days').format("YYYY-MM-DD")
    this.setState({
      day: e.target.value,
      start: Moment(e.target.value).add(dd*-1,'days').format("YYYY-MM-DD"),
      end: Moment(start).add(6,'days').format("YYYY-MM-DD")
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
  depChange2 = (e) => {
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
    if(this.props.mode===1){
      if(ItemList.length>1){
        var num=ItemList[1].employee_no;
        for(var i=0;i<ItemList.length;i++){
          for(var w=0;w<depList.length;w++){
            if(ItemList[i].department*1===depList[w].no){
              depname=depList[w].name
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
        {this.props.mode===0 &&
          <div>
            <input 
              type='date'
              value={this.state.day}
              onChange={this.dayChange}
            />
            <input
              placeholder="이름"
              value={this.state.name}
              onChange={this.handleChange}
            />
            <select onChange={this.depChange}>
              <option value="">부서선택</option>
                {depList&&depList.map((itemdata, insertIndex) => {
                  if(this.state.dep===itemdata.no){return(<option value={itemdata.no} selected="selected">{insertIndex+1}.{itemdata.name}</option>);}
                  else return(<option value={itemdata.no} >{insertIndex+1}.{itemdata.name}</option>);
                })}
            </select>
            <table name="ATT" class="a">
            <thead>
              <tr class="a"><td class="a">NO</td><td class="a">근무일자</td><td class="a">부서</td><td class="a">이름</td><td class="a">직급</td><td class="a">출근시간</td>
              <td class="a">퇴근시간</td><td class="a">출근구분</td><td class="a">퇴근구분</td><td class="a">연장근무시간</td><td class="a">총근무시간</td></tr>
            </thead>
            <tbody>
            {ItemList&&ItemList.map((itemdata, insertIndex) => {
              var bool = "정상"
              var bool2 = "정상"
              var time = "09:00:00"
              var time2 = "17:00:00"
              if(this.countSeconds(time)<this.countSeconds(itemdata.start_time)){
                bool = "지각"
              }
              if(itemdata.end_time==null){
                bool2 = ""
              }else if(this.countSeconds(itemdata.end_time)<this.countSeconds(time2)){
                bool2 = "조퇴"
              }else if(itemdata.night){
                bool2 = "연장"
              }
              return (
              <tr key={insertIndex} class="a">
                  <td class="a">{itemdata.no}</td>
                  <td class="a">{itemdata.day}</td>
                  {depList&&depList.map((dep, insertIndex2) => { 
                    if(dep.no===(itemdata.department*=1)) return <td name={insertIndex2}  class="a">{dep.name}</td>;
                    else return null;   
                  })}
                  
                  <td class="a">{itemdata.name}</td>
                  <td class="a">{itemdata.rank}</td>
                  <td class="a">{itemdata.start_time}</td>
                  <td class="a">{itemdata.end_time}</td>
                  <td class="a">{bool}</td>
                  <td class="a">{bool2}</td>
                  <td class="a">{itemdata.night === 1 && this.reseconds(this.subsec(this.countSeconds(itemdata.end_time),this.countSeconds(time2)))}</td>
                  <td class="a">{this.reseconds(this.subsec(this.countSeconds(itemdata.end_time),this.countSeconds(itemdata.start_time)))}</td>
                </tr>
              );
            })}
            </tbody> 
          </table>
          </div>
        }

        {this.props.mode===1 &&
          <div>
            <input 
              type='date'
              value={this.state.day}
              onChange={this.dayChange2}
            />
            <input
              placeholder="이름"
              value={this.state.name}
              onChange={this.handleChange2}
            />
            <select onChange={this.depChange2}>
            <option value="">부서선택</option>
              {depList&&depList.map((itemdata, insertIndex) => {
                if(this.state.dep===itemdata.no){return(<option value={itemdata.no} selected="selected">{insertIndex+1}.{itemdata.name}</option>);}
                else return(<option value={itemdata.no} >{insertIndex+1}.{itemdata.name}</option>);
              })}
            </select>
            <table class="b" width="100%" >
            <caption>{this.state.start}~{this.state.end}</caption>
              <thead>
                <tr>
                  <th width="10%" class="a"></th>
                  <th class="a">월</th><th class="a">화</th><th class="a">수</th>
                  <th class="a">목</th><th class="a">금</th><th class="a">토</th>
                  <th class="a">일</th>
                </tr>
              </thead>
              <tbody>
              {temp&&temp.map((itemdata) => {
                    cot=cot+1;
                    if(cot>=4) cot=0;
                    var day=itemdata.days.split("/");
                    
                    return(
                      <tr><td class="sm">{itemdata.name}</td>
                      {week.map((z) => {
                        var bool=0;
                          for(var a=0;a<day.length;a++){
                            if(z===this.dateDay(day[a])){
                              bool=1;
                            }
                          }
                          if(bool===1){
                            return(<td bgcolor={color[cot]} class="a"></td>);
                          }else return(<td class="a"></td>);
                      })}
                      </tr>
                    );
                  
              })}
              
              </tbody>
            </table>
          </div>
        }
            
        {this.props.mode===2 &&
          <div>
              <input 
                type='date'
                value={this.state.day}
                onChange={this.dayChange}
              />
              <input
                placeholder="이름"
                value={this.state.name}
                onChange={this.handleChange}
              />
              <select onChange={this.depChange}>
              <option value="">부서선택</option>
                {depList&&depList.map((itemdata, insertIndex) => {
                  if(this.state.dep===itemdata.no){return(<option value={itemdata.no} selected="selected">{insertIndex+1}.{itemdata.name}</option>);}
                  else return(<option value={itemdata.no} >{insertIndex+1}.{itemdata.name}</option>);
                })}
              </select>
              <table class="b" width="100%" >
              <thead>
                
                <tr>
                  <th width="10%" >{this.state.day}</th>
                  {numbers.map((s,insertIndex) => {
                    return(
                      <th width="4%" name={insertIndex} class="a" colSpan="6">{s}</th>
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
                          if(count<6){return( <td bgcolor={color[cot]} id="c"></td> );}
                          else{count=0; return( <td name={insertIndex11} class="e" ></td> );}
                        })}
                        {this.timemap2(itemdata.start_time,itemdata.end_time).map((c,insertIndex3) =>{
                          count=count+1;
                          if(count<6){return( <td bgcolor={color[cot]}name={insertIndex3}></td> );}
                          else{count=0; return( <td bgcolor={color[cot]}name={insertIndex3} class="e"></td> );}
                          })}
                        {q.map((g,insertIndex11) =>{
                          count=count+1;
                          if(count<6){return( <td bgcolor={color[cot]} id="d"></td> );}
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

export default Users;
