import Axios from 'axios';
import Helper from "./helper";
const Config = require('../config/config');

class request {
    constructor(){
        this.data = {};
        this.headers = {};
        this.axios = Axios.create({
            timeout: 120 * 60,
            responseType: 'json',
            baseURL: Config.apiBaseUrl,
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
        return this.axios({
            url : url,
            method: 'get',
            params: Object.assign({}, this.data, data),
            headers : Object.assign({},this.headers, header)
        })
    }

    /**
     * ajax put request
     * @param url
     * @param data
     * @param header
     * @returns {AxiosPromise}
     */
    put(url, data = {}, header = {}) {
        return this.axios({
            url: url,
            method: 'put',
            data: Object.assign({}, this.data, data),
            headers : Object.assign({}, this.headers, header)
        })
    }

    /**
     * ajax delete request
     * @param url
     * @param data
     * @param header
     * @returns {AxiosPromise}
     */
    delete(url, data = {}, header = {}) {
        return this.axios({
            url: url,
            method: 'delete',
            data: Object.assign({}, this.data, data),
            headers: Object.assign({}, this.headers, header)
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
        data = Object.assign({}, this.data, data);
        header = Object.assign({}, this.headers, header);

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


    /**
     * ajax post request data use FormData
     * @param url
     * @param data
     * @param header
     * @returns {AxiosPromise}
     */
    formDataPost(url, data = {}, header) {
        let params = new FormData();
        for (let key in data) {
            params.append(key, data[key]);
        }
        params = new URLSearchParams(params);
        return this.axios({
            url: url,
            method: 'post',
            data: params,
            headers : header
        })
    }
}

export default new request();
