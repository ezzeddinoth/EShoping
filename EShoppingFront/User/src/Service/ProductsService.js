import axios from "axios";
import URLService from "./URLService";
import Cookie from 'universal-cookie';

const cookie = new Cookie();
const baseURL = URLService.getAPIURL();

/*const config = {
    headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
        "Access-Control-Allow-Origin" : "",
        "Allow": "GET",
        "Content-type": "Application/json",
    }
};*/
class ProductsService {

    getProducts = async () => {
        var response = false;

        await axios.get(baseURL + 'product/all',
        )
            .then(res => {
                response = res;
            })
            .catch(err => {
                response = err.response;
            });
        return response;
    }

    saveProducts = async (value) => {
        var response = false;
        axios.interceptors.request.use(
            config => {
                config.headers.authorization = 'Bearer ' + cookie.get('token');
                return config;
            }
        )
        await axios.post(baseURL + 'product/save',
            value
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
export default new ProductsService();
