import React, { Component } from "react";
import axios from "axios";
import { Link } from 'react-router-dom';
import './table.css';

class Lectures extends Component {
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
    axios.get("http://localhost:8080/api2/lecture")
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
        <header>
          <button>
            <Link to={`/lectureAdd`}>추가하기</Link>
          </button>
          <br></br>
        </header>
        <table>
        <thead>
          <tr><td>NO</td><td>NAME</td><td>Teacher</td><td>PRICE</td><td>Students</td><td>ROOM</td>
          <td>START_DATE</td><td>END_DATE</td><td>DAY</td><td>START_TIME</td><td>END_TIME</td><td>PART</td><td>BRANCH</td>
          </tr>
        </thead>
        <tbody>
         {ItemList&&ItemList.map((itemdata, insertIndex) => {
            return (
            <tr key={insertIndex}>
                <td>{itemdata.no}</td>
                <td>

                  <Link to={`/lecture/${itemdata.no}?id=${itemdata.no}`}>{itemdata.name}</Link>

                </td>
                <td>{itemdata.teacher}</td>
                <td>{itemdata.price}</td>
                <td>{itemdata.students}</td>
                <td>{itemdata.room}</td>
                <td>{itemdata.start_date}</td>
                <td>{itemdata.end_date}</td>
                <td>{itemdata.day}</td>
                <td>{itemdata.start_time}</td>
                <td>{itemdata.end_time}</td>
                <td>{itemdata.part}</td>
                <td>{itemdata.branch}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
      </div>
    );
  }
}

export default Lectures;
