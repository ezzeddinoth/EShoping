import axios from "axios";
import URLService from "./URLService";
import Cookie from 'universal-cookie';

const cookie = new Cookie();

const baseURL = URLService.getAPIURL();

class AuthService {

    login = async (value) => {
        var response = false;
        await axios.post(baseURL + 'auth/login', {
            email: value.username,
            password: value.password
        })
            .then(res => {
                response = res;
                cookie.set("token", res.data)
            })
            .catch(err => {
                response = err.response;
            });
        return response;
    }
}
export default new AuthService();
