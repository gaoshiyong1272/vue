import Axios from 'axios';
import Helper from "./helper";
const Config = require('../config/config');

class request {
    constructor(){
        this.token = Helper.getToken();
        let headers = {};
        if(this.token) {
            headers[Config.userLoginAccessTokenKey] = this.token;
        }
        this.axios = Axios.create({
            timeout: 120 * 60,
            responseType: 'json',
            baseURL: Config.apiBaseUrl,
            headers: headers
        });
    }

    __getAjaxArrFn(ajaxOtions) {
        let temp = [];
        let len = ajaxOtions.length;
        for(let i = 0; i < len; i++){
            let fn;
            if(ajaxOtions[i]['method'] === 'get') {
                fn = ()=>{
                    return this.get(ajaxOtions[i]['url'], ajaxOtions[i]['data'], ajaxOtions[i]['header']);
                }
            }
            if(ajaxOtions[i]['method'] === 'post') {
                let isFormData = ajaxOtions[i]['isFormData'] === undefined ? true: ajaxOtions[i]['isFormData'];
                fn = () => {
                    return this.post(ajaxOtions[i]['url'], ajaxOtions[i]['data'], ajaxOtions[i]['header'], isFormData);
                }
            }
            temp.push(fn());
        }
        return temp;
    }

    /**
     * ajax get request
     * @param url
     * @param data
     * @param header
     * @returns {AxiosPromise}
     */
    get(url, data = {} , header = {}) {
        let token = {};
        data = Object.assign(Helper.getGameCode(),data);
        return this.axios({
            url : url,
            method: 'get',
            params: data,
            withCredentials : false
        })
    }

    /**
     * ajax post request
     * @param url
     * @param data
     * @param header
     * @param isFormData
     * @returns {AxiosPromise}
     */
    post(url, data = {}, header = {} , isFormData = false){
        let token = {};
        data = Object.assign(Helper.getGameCode(), data);

        /**使用FormData格式**/
        if(isFormData) {
            header['Content-Type'] = 'application/x-www-form-urlencoded';
            data = Helper.paramJSON(data);
        }

        return this.axios({
            url: url,
            method: 'post',
            headers: header,
            data: data
        })
    }


    /**
     * 一次请求多个接口方法
     * @param ajaxOtions [
     *      {url: url, data: {},header:{},method:'get'},
     *      {url: url, data: {},header:{},method:'post',isFormData: false}
     * ]
     * @param callback;
     * @param errorCallback
     */
    all(ajaxOtions=[],callback, errorCallback){
        if(ajaxOtions.length === 0) {
            console.error('Param is not empty');
            return
        }
        Axios.all(this.__getAjaxArrFn(ajaxOtions))
        .then(Axios.spread(function (...values) {
            callback(values);
        })).catch((res)=>{
            errorCallback(res);
        });
    }
};

export default new request();
