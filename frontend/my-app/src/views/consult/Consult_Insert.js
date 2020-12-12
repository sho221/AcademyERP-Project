import React, { Component } from "react";
import axios from "axios";
import '../users/table.css';
class Consult_Insert extends Component{

  constructor(props) {
    super(props);
    this.state = {
      name: '',
      hp1: '',
      hp2: '',
      hp3: '',
      schedule: '',
      memo: ''
    }

    this.handleFormSubmit = this.handleFormSubmit.bind(this)
    this.handleValueChange = this.handleValueChange.bind(this)
    this.insertConsult = this.insertConsult.bind(this)
    this.handleClickOpen = this.handleClickOpen.bind(this)
    this.handleClose = this.handleClose.bind(this);

}

handleFormSubmit(e) {
  e.preventDefault()
  this.insertConsult()
  this.setState({
    name: '',
    hp1: '',
    hp2: '',
    hp3: '',
    schedule: '',
    memo: ''
  })
  alert("등록되었습니다.");
  this.props.history.push('/consult/Consult_Call');
}

handleValueChange(e) {
  let nextState = {};
  nextState[e.target.name] = e.target.value;
  this.setState(nextState);
}

insertConsult() {
  axios({
    url: 'http://localhost:8080/api/Consult_Call',
    method: "POST",
    headers: {'content-type': 'application/json'},
    data: {
      name: this.state.name,
      hp1: this.state.hp1,
      hp2: this.state.hp2,
      hp3: this.state.hp3,
      schedule: this.state.schedule,
      memo: this.state.memo
    }
  })
    .then(function (response){
      console.log(response)
    })
    .catch(function (error){
      console.log(error)
    })
}

handleClickOpen() {
  this.setState({
    open: true
  });
}

handleClose() {

  this.setState({
    name: '',
    hp1: '',
    hp2: '',
    hp3: '',
    schedule: '',
    memo: '',
    open: false
  })
}

// class Consult_Insert extends Component {

//     constructor(props) {
//         super(props)
//         this.state = { 
//             ItemList: ""
//         }
//       }
    
//       componentDidMount() {
//           this.getApi();
//       }
      
//       getApi = () => {
//           axios.get("http://localhost:8080/api/Consult_Insert")
//               .then(res => {
//                   console.log(res);
//                   this.setState({
//                     ItemList: res.data.message
//                   })
//               })
//               .catch(res => console.log(res))
//       }

// render() {
//     const { ItemList } = this.state;
//     console.log(ItemList);
render() {
    return (
      <div>
        <table>
              {/* <tr>
                <td>작성자</td>
                <td>{ItemList.id}</td>
              </tr>    */}
              <tr>
                <td>성명</td>
                <td><input type="text" name="name"/></td>
              </tr>
              <tr>
                <td>전화번호</td>
                <td>
                  <input type="text" name="hp1" size="4"/>-
                  <input type="text" name="hp2" size="4"/>-
                  <input type="text" name="hp3" size="4"/>
                </td>
              </tr>
              <tr>
                <td>상담날짜</td>
                <td><input type="date" name="schedule" placeholder="date"/></td>
              </tr>
              <tr>
                <td>메모</td>
                <td>
                  <textarea name="memo" rows="6" cols="50"/>
                </td>
              </tr>
              <tr>
                <button onClick={this.handleFormSubmit}>저장</button>
              </tr>
          </table>
        </div>
  );
}
}


export default Consult_Insert;
