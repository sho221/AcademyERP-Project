import axios from 'axios';

const USER_API_BASE_URL = "http://localhost:8080/api/ins_stu";

class ApiService {

    addStudent(student){
        return axios.post(USER_API_BASE_URL, student);
    }

}

export default new ApiService();