import axios from "axios";
import URLService from "./URLService";
import Cookie from 'universal-cookie';

const cookie = new Cookie();
const baseURL = URLService.getAPIURL();

class OrdersService {

    getOrders = async () => {
        var response = false;
        axios.interceptors.request.use(
            config => {
                config.headers.authorization = 'Bearer ' + cookie.get('token');
                return config;
            }
        )
        await axios.get(baseURL + 'orderDTO/all',
        )
            .then(res => {
                response = res;
            })
            .catch(err => {
                response = err.response;
            });
        return response;
    }

    addToBasket = async (value) => {
        var response = false;
        axios.interceptors.request.use(
            config => {
                config.headers.authorization = 'Bearer ' + cookie.get('token');
                return config;
            }
        )
        await axios.post(baseURL + 'basket/addTo?count=' + value.count,
            value.product
        )
            .then(res => {
                response = res;
            })
            .catch(err => {
                response = err.response;
            });
        return response;
    }

    getBasket = async () => {
        var response = false;
        axios.interceptors.request.use(
            config => {
                config.headers.authorization = 'Bearer ' + cookie.get('token');
                return config;
            }
        )
        await axios.get(baseURL + 'basket/myBasket'
        )
            .then(res => {
                response = res;
            })
            .catch(err => {
                response = err.response;
            });
        return response;
    }

    getPaidOrder = async () => {
        var response = false;
        axios.interceptors.request.use(
            config => {
                config.headers.authorization = 'Bearer ' + cookie.get('token');
                return config;
            }
        )
        await axios.get(baseURL + 'basket/myPaidOrder'
        )
            .then(res => {
                response = res;
            })
            .catch(err => {
                response = err.response;
            });
        return response;
    }

    buyBasket = async ()  => {
        var response = false;
        axios.interceptors.request.use(
            config => {
                config.headers.authorization = 'Bearer ' + cookie.get('token');
                return config;
            }
        )
        await axios.put(baseURL + 'basket/buyBasket'
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
export default new OrdersService();
