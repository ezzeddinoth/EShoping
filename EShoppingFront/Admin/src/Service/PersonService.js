import axios from "axios";
import URLService from "./URLService";
import Cookie from 'universal-cookie';

const cookie = new Cookie();
const baseURL = URLService.getAPIURL();

class PersonService {

    getPeople = async () => {
        var response = false;
        axios.interceptors.request.use(
            config => {
                config.headers.authorization = 'Bearer ' + cookie.get('token');
                return config;
            }
        )
        await axios.get(baseURL + 'person/all',
           )
            .then(res => {
                response = res;
            })
            .catch(err => {
                response = err.response;
            });
        return response;
    }
    
}
export default new PersonService();
