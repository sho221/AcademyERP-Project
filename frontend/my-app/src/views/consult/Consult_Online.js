import React, { Component } from "react";
import axios from "axios";
import { Link } from 'react-router-dom';
import '../users/table.css';

class Consult_Online extends Component {

    constructor(props) {
        super(props)
        this.state = {
            OnlineList: ""
        }
      }
    
      componentDidMount() {
          this.getApi();
      }
    
      getApi = () => {
          axios.get("http://localhost:8080/api/Consult_Online")
              .then(res => {
                  console.log(res);
                  this.setState({
                    OnlineList: res.data.message
                  })
              })
              .catch(res => console.log(res))
      }

render() {
    const { OnlineList } = this.state;
    console.log(OnlineList);
    return (
    <div>
         <Link to={'/consult/Consult_Insert'}><button>입력</button></Link>
    <table>
        <thead>
            <td>NO</td>
            <td>성명</td>
            <td>전화번호</td>
            <td>상담일정</td>
            <td>메모</td>
            <td>접수날짜</td>
            <td>수정&nbsp;&nbsp;|&nbsp;&nbsp;삭제</td>
        </thead>
        <tbody>
         {OnlineList&&OnlineList.map((onlinedata, insertIndex) => {
            return (
            <tr key={insertIndex}>
                <td>{onlinedata.no}</td>
                <td>{onlinedata.name}</td>
                <td>{onlinedata.hp}</td>
                <td>{onlinedata.schedule}</td>
                <td>{onlinedata.memo}</td>
                <td>{onlinedata.regidate}</td>
              </tr>
            );
          })}
        </tbody> 
    </table>

    </div>
  );
}
}

export default Consult_Online;
