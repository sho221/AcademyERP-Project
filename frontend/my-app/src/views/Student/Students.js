import React,{ Component } from "react";
import axios from "axios";
import './table.css';
import { Link } from 'react-router-dom';

class Students extends Component {

    constructor(props) {
        super(props)
        this.state = {
            StudentList: ""
        }
    }

    componentDidMount() {
        this.getApi();
    }

    getApi = () => {
        axios.get("http://localhost:8080/api/students")
            .then(res => {
                console.log(res);
                this.setState({
                    StudentList : res.data.listdata
                })
            })
            .catch(res => console.log(res))
    }

    render() {
        const { StudentList } =  this.state;
        console.log(StudentList);
        return (
            <div>
            <table>
            
            <tr><td>no</td><td>name</td><td>hp</td><td>email</td><td>birth</td><td>address</td><td>curri</td>
            <td>gender</td><td>regdate</td></tr>
           
            
                {StudentList&&StudentList.map((itemdata, insertIndex) => {
                    return (
                    <tr>
                    <td>{itemdata.no}</td>
                    <td>{itemdata.name}</td>
                    <td>{itemdata.hp}</td>
                    <td>{itemdata.email}</td>
                    <td>{itemdata.birth}</td>
                    <td>{itemdata.address}</td>
                    <td>{itemdata.curri}</td>
                    <td>{itemdata.gender}</td>
                    <td>{itemdata.regdate}</td>
                    </tr>
                    );
                })}
            <tr><td>
                <Link to={"/ins_stu"}>학생등록하기</Link>
                </td></tr>
            </table>
            </div>
        );
 
    }

}

export default Students;
