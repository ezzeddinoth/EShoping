class URLService {

    getAPIURL = () => {
        let APIURL;
        if (process.env.REACT_APP_ENV === 'DEV') {
            APIURL = process.env.REACT_APP_BASE_URL;
        }
        else {
            APIURL ="laterF";
        }
        return APIURL;
    }

    getOtherURL = () => {
        let otherURL;
        return otherURL;
    }
}
export default new URLService();