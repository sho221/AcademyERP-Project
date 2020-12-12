import React from 'react'
import axios from 'axios';

class Consult_Update extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      name: this.props.ItemList.name,
      hp1: this.props.ItemList.hp1,
      hp2: this.props.ItemList.hp2,
      hp3: this.props.ItemList.hp3,
      schedule: this.props.ItemList.schedule,
      memo: this.props.ItemList.memo
    }

    this.handleFormSubmit = this.handleFormSubmit.bind(this)
    this.handleValueChange = this.handleValueChange.bind(this)
    this.updateConsult = this.updateConsult.bind(this)
    this.handleClickOpen = this.handleClickOpen.bind(this)
    this.handleClose = this.handleClose.bind(this);

  }

  handleFormSubmit(e) {
    e.preventDefault()
    this.updateConsult()
    this.setState({
      name: '',
      hp1: '',
      hp2: '',
      hp3: '',
      schedule: '',
      memo: ''
    })
    alert("수정되었습니다.");
    this.props.history.push('/consult/Consult_Call');
  }

  handleValueChange(e) {
    let nextState = {};
    nextState[e.target.name] = e.target.value;
    this.setState(nextState);
  }

  updateConsult() {
    console.log(this.state.name);
    console.log(this.state.hp1);
    console.log(this.state.hp2);
    console.log(this.state.hp3);
    console.log(this.state.schedule);
    console.log( this.state.memo);
               

    axios({
        url: 'http://localhost:8080/api/consult/edit/' + this.props.ItemList.no,
        method: "PUT",
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
          open: false
        })
      }
    
  render() {
    let ItemList = this.props.ItemList;
    console.log(ItemList);

    return (
      <div>
      <table>
            <tr>
              <td>작성자</td>
              {/* <td>{ItemList.id}</td> */}
            </tr>   
            <tr>
              <td>성명</td>
              <td><input type="text" name="name" readOnly="true" defaultValue={this.state.name}/></td>
            </tr>
            <tr>
              <td>전화번호</td>
              <td>
                <input type="text" name="hp1" size="4" defaultValue={this.state.hp1}/>-
                <input type="text" name="hp2" size="4" defaultValue={this.state.hp2}/>-
                <input type="text" name="hp3" size="4" defaultValue={this.state.hp3}/>
              </td>
            </tr>
            <tr>
              <td>상담날짜</td>
              <td><input type="date" name="regidate" placeholder="date" defaultValue={this.state.schedule}/></td>
            </tr> 
            <tr>
              <td>메모</td>
              <td>
                <textarea name="memo" rows="6" cols="50" defaultValue={this.state.memo}/>
              </td>
            </tr>
            <tr>
              <button onClick={this.handleFormSubmit}>저장</button>
            </tr>
        </table>
      </div>
    )

  }

}


export default Consult_Update;