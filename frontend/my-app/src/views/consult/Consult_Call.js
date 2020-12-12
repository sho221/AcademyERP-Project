import React, { Component } from "react";
import axios from "axios";
import { Link } from 'react-router-dom';
import '../users/table.css';

class Consult_Call extends Component {

  constructor(props) {
    super(props)
    this.state = {
        ItemList: ""
    }
    this.staetRefresh = this.stateRefresh.bind(this);
}

stateRefresh() {
  this.setState({
    ItemList: "",
  });
  this.getApi();

}

componentDidMount() {
    this.getApi();
}

getApi = () => {
    axios.get("http://localhost:8080/api/consult")
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
        {ItemList&&ItemList.map((itemdata, insertIndex) => {
            return (
            <tr key={insertIndex}>
                <td>{itemdata.no}</td>
                <td><Link to={`/consult/Call_Content/${itemdata.no}?id=${itemdata.no}`}>{itemdata.name}</Link></td>
                <td>{itemdata.name}</td>
                <td>{itemdata.hp1}</td>
                <td>{itemdata.hp2}</td>
                <td>{itemdata.hp3}</td>
                <td>{itemdata.schedule}</td>
                <td>{itemdata.memo}</td>
                <td>{itemdata.regidate}</td>
                <td><Link to>수정</Link>|<Link to>삭제</Link></td>
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
