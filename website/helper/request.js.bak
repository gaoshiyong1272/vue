import { forIn } from 'lodash';
import { paramJSON } from '../../website/common/helper';
import { refreshToken } from '../apis/common';
import cookie from './cookie';
import 'whatwg-fetch';


const request = ({ method = 'POST', url, data = null, isRefresh = false }) => {
    let options = {
            method,
            credentials: 'include'
        },
        params = paramJSON(data, true);
    if (method == 'GET') {
        url = params && params.length ? url + '?' + params : url;
    }
    if (method == 'POST' && data) {

        if (data instanceof FormData) {
            options.body = data;
        } else {
            options.headers = new Headers({
                "Content-Type": "application/x-www-form-urlencoded",
                "oasis-core-token": cookie.get('oasis-core-token')
            });
            options.body = params;
        }
    }
    return window.fetch(url, options).then(res => {
        if (!isRefresh) {
            refreshToken();
        }
        return res.text().then(text => {
            let tmp = text.toLowerCase().replace(/\s/g, '');
            if (tmp.indexOf('nologgedinuser') > -1) {
                window.location.reload();
                return true;
            };
            if (tmp.indexOf('malformedjwttoken') > -1) {
                window.location.reload();
                return true;
            };
            tmp = JSON.parse(text);

            if (!res.ok) {
                throw ({
                    statusText: res.statusText,
                    ok: res.ok,
                    code: tmp.code,
                    msg: tmp.msg,
                    status: res.status
                });
            }
            return tmp;
        });
    });
};

export default request;
