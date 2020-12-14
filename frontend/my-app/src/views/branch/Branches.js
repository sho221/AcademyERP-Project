import React, {Component} from "react";
import axios from "axios";
import './table.css';
import BranchAdd from "./BranchAdd";
import Branch from "./Branch";

class Branches extends Component {
  constructor(props) {
    super(props)
    this.state = {
        BranchList: ""
    }
    this.stateRefresh = this.stateRefresh.bind(this);
}

  stateRefresh() {
    this.setState({
      BranchList: "",
    });
    this.getApi();

  }

componentDidMount() {
    this.getApi();
}

getApi = () => {
    axios.get("http://localhost:8080/api2/branch")
        .then(res => {
            this.setState({
              BranchList: res.data.message
            })
        })
        .catch(res => console.log(res))
}

  render() {
    const { BranchList } = this.state;

    return (
      <div>
        <header>
          <BranchAdd stateRefresh={this.stateRefresh}/>
          <br></br>
        </header>
        <table>
        <thead>
          <tr>
            <td>NO</td><td>NAME</td><td>Address</td><td>HP</td><td>Owner</td>
          </tr>
        </thead>
        <tbody>
         {BranchList&&BranchList.map((branchdata, insertIndex) => {
            return (
            <tr key={insertIndex}>
                <td>{branchdata.no}</td>
                <td> <Branch stateRefresh={this.stateRefresh} id={branchdata.no}/></td>
                <td>{branchdata.address}</td>
                <td>{branchdata.hp}</td>
                <td>{branchdata.owner}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
      </div>
    );
  }
}

export default Branches;
