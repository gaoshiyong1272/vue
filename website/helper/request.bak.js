import lodash from 'lodash';
import Axios from 'axios';

class request {
    define(){
        return {
            method: 'get',
            baseURL: '',
            data: {},
            timeout: 120 * 60,
            responseType: 'json'
        }
    }
    constructor(options){

    }

    get(){}

    post(){}
};

export default request;
