import React, { Component } from "react";
import axios from "axios";
import { Link } from 'react-router-dom';
import '../css/table.css';


class Users extends Component {
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
      axios.get("http://localhost:8083/api/users")
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
        <table  class="a">
        <thead>
          <tr  class="a"><td class="a">NO</td><td  class="a">NAME</td><td  class="a">ID</td><td  class="a">password</td><td  class="a">HP</td><td  class="a">ADDRESS</td>
          <td  class="a">E-MAIL</td><td  class="a">BIRTH</td><td  class="a">SEX</td><td  class="a">RANK</td><td  class="a">SAL</td><td  class="a">DEPART</td><td  class="a">BRANCH</td>
          <td class="a">PROFILE</td><td class="a">VERIFY</td><td class="a">DATE</td></tr>
        </thead>
        <tbody>
         {ItemList&&ItemList.map((itemdata, insertIndex) => {
            return (
            <tr key={insertIndex} class="a">
                <td class="a">{itemdata.no}</td>
                <td class="a"><Link to={`/users/${itemdata.no}`}>{itemdata.name}</Link></td>
                <td class="a">{itemdata.id}</td>
                <td class="a">{itemdata.password}</td>
                <td class="a">{itemdata.hp}</td>
                <td class="a">{itemdata.address}</td>
                <td class="a">{itemdata.email}</td>
                <td class="a">{itemdata.birth}</td>
                <td class="a">{itemdata.sex}</td>
                <td class="a">{itemdata.rank}</td>
                <td class="a">{itemdata.salary}</td>
                <td class="a">{itemdata.department}</td>
                <td class="a">{itemdata.branch}</td>
                <td class="a">{itemdata.profile_name}</td>
                <td class="a">{itemdata.verify}</td>
                <td class="a">{itemdata.regidate}</td>
                <td><Link to={`/logintest/${itemdata.no}/${itemdata.name}`}>로그인</Link></td>
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
