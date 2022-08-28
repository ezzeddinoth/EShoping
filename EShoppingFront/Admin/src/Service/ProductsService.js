import axios from "axios";
import URLService from "./URLService";
import Cookie from 'universal-cookie';

const cookie = new Cookie();
const baseURL = URLService.getAPIURL();

class ProductsService {

    getProducts = async () => {
        var response = false;
        axios.interceptors.request.use(
            config => {
                config.headers.authorization = 'Bearer ' + cookie.get('token');
                return config;
            }
        )
        await axios.get(baseURL + 'product/all',
        )
            .then(res => {
                response = res;
            })
            .catch(err => {
                response = err;
            });
        return response;
    }

    saveProduct = async (value) => {
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
                response = err;
            });
        return response;
    }

    updateProduct = async (value) => {
        var response = false;
        axios.interceptors.request.use(
            config => {
                config.headers.authorization = 'Bearer ' + cookie.get('token');
                return config;
            }
        )
        await axios.put(baseURL + 'product/update',
            value
        )
            .then(res => {
                response = res;
            })
            .catch(err => {
                response = err;
            });
        return response;
    }

    deleteProduct = async (value) => {
        var response = false;
        axios.interceptors.request.use(
            config => {
                config.headers.authorization = 'Bearer ' + cookie.get('token');
                return config;
            }
        )
        await axios.delete(baseURL + 'product/delete?id=' +
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

    test = async () => {
        var response = false;
        axios.interceptors.request.use(
            config => {
                config.headers.authorization = 'Bearer ' + cookie.get('token');
                return config;
            }
        )
        await axios.post(baseURL + 'auth/login', {
            email: "ezzeddinothman@gmail",
            password: "1234"
        }
        )
            .then(res => {
                response = res;
                console.log(res)
                cookie.set("token", res.data)
            })
            .catch(err => {
                response = err;
            });
        return response;
    }
}
export default new ProductsService();
