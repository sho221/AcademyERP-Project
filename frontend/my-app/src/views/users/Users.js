import React, { Component } from "react";
import axios from "axios";
import { Link } from 'react-router-dom';
import '../css/table.css';


class Users extends Component {
  constructor(props) {
    super(props)
    this.state = {
        userList: "",
        depList: ""
    }
  }

  componentDidMount() {
      this.getApi();
  }

  getApi = () => {
      axios.get("http://localhost:8083/api/users").then(res => {
        console.log(res);
        this.setState({
          userList: res.data.list
        })
      }).catch(res => console.log(res))
      axios.get("http://localhost:8083/api/depart").then(res => {
        console.log(res);
        this.setState({
          depList: res.data.depart
        })
      }).catch(res => console.log(res))
  }


    render() {
      const { userList } = this.state;
      const { depList } = this.state;
      return (
      <div>
        <table  class="a">
        <thead>
          <tr  class="a"><td class="a">NO</td><td  class="a">NAME</td><td  class="a">ID</td><td  class="a">password</td><td  class="a">HP</td><td  class="a">ADDRESS</td>
          <td  class="a">E-MAIL</td><td  class="a">BIRTH</td><td  class="a">SEX</td><td  class="a">RANK</td><td  class="a">SAL</td><td  class="a">DEPART</td><td  class="a">BRANCH</td>
          <td class="a">PROFILE</td><td class="a">VERIFY</td><td class="a">DATE</td></tr>
        </thead>
        <tbody>
         {userList&&userList.map((items) => {
            return (
            <tr class="a">
                <td class="a">{items.no}</td>
                <td class="a"><Link to={`/users/${items.no}`}>{items.name}</Link></td>
                <td class="a">{items.id}</td>
                <td class="a">{items.password}</td>
                <td class="a">{items.hp}</td>
                <td class="a">{items.address}</td>
                <td class="a">{items.email}</td>
                <td class="a">{items.birth}</td>
                <td class="a">{items.sex}</td>
                <td class="a">{items.rank}</td>
                <td class="a">{items.salary}</td>
                {depList&&depList.map((dep)=>{
                  if(dep.no===Number(items.department)){
                    return(<td class="a">{dep.name}</td>);
                  }else{
                    return("");
                  }
                })}
                <td class="a">{items.branch}</td>
                <td class="a">{items.profile_name}</td>
                <td class="a">{items.verify}</td>
                <td class="a">{items.regidate}</td>
                <td><Link to={`/logintest/${items.no}/${items.name}/${items.department}`}>로그인</Link></td>
              </tr>
            );
          })}
        </tbody> 
      </table>
      </div>
    );
  }
}

export default Users;
