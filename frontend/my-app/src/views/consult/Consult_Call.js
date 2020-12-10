import React, { Component } from "react";
import axios from "axios";
import { Link } from 'react-router-dom';
import '../users/table.css';

class Consult_Call extends Component {

    constructor(props) {
        super(props)
        this.state = {
            CallList: ""
        }
      }
    
      componentDidMount() {
          this.getApi();
      }
    
      getApi = () => {
          axios.get("http://localhost:8080/api/Consult_Call")
              .then(res => {
                  console.log(res);
                  this.setState({
                    CallList: res.data.message
                  })
              })
              .catch(res => console.log(res))
      }

render() {
    const { CallList } = this.state;
    console.log(CallList);
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
         {CallList&&CallList.map((calldata, insertIndex) => {
            return (
            <tr key={insertIndex}>
                <td>{calldata.no}</td>
                <td>{calldata.name}</td>
                <td>{calldata.hp}</td>
                <td>{calldata.schedule}</td>
                <td>{calldata.memo}</td>
                <td>{calldata.regidate}</td>
              </tr>
            );
          })}
        </tbody> 
    </table>

    </div>
  );
}
}

export default Consult_Call;
