/**
 * Created by shiyonggao on 2019/11/28.
 */
import {forIn, forEach, cloneDeep, keys, findKey, isEmpty, unescape, isPlainObject, isFunction, toString} from 'lodash';


class Helper {
    /***
     * 去掉两端空格
     * @param s
     * @returns {s}
     */
    tirm(s) {
        return s.replace(/^\s+|\s+$/gm, '');
    }

    /**
     * 获取URL参数
     * @param key
     * @returns {string}
     */
    getParamers(key) {
        let reg = new RegExp("(^|&)" + key + "=([^&]*)(&|$)");
        let r = window.location.search.substr(1).match(reg);
        if (r != null) return unescape(r[2]);
        return '';
    }

    /***
     * 解析url地址
     * @param url
     * @returns {}
     */
    parseURL(url) {
        if (!url) url = window.location.href;
        let a = document.createElement('a');
        a.href = url;
        return {
            source: url,
            protocol: a.protocol.replace(':', ''),
            host: a.hostname,
            port: a.port,
            query: a.search,
            params: (function () {
                let ret = {},
                    seg = a.search.replace(/^\?/, '').split('&'),
                    len = seg.length, i = 0, s;
                for (; i < len; i++) {
                    if (!seg[i]) {
                        continue;
                    }
                    s = seg[i].split('=');
                    if (s[1]) {
                        ret[s[0]] = s[1];
                    }
                }
                return ret;
            })(),
            file: (a.pathname.match(/\/([^\/?#]+)$/i) || [, ''])[1],
            hash: a.hash.replace('#', ''),
            path: a.pathname.replace(/^([^\/])/, '/$1'),
            relative: (a.href.match(/tps?:\/\/[^\/]+(.+)/) || [, ''])[1],
            segments: a.pathname.replace(/^\//, '').split('/')
        };
    }

    /**
     * object to request params
     * @param o
     * @returns string   b=1&b=2
     */
    paramJSON(o){
        let s = [],
            add = (key, valueOrFunction) => {
                let value = isFunction(valueOrFunction) ? valueOrFunction() : valueOrFunction;
                s[s.length] = encodeURIComponent(key) + "=" + encodeURIComponent(value == null ? "" : value);
            },
            buildParams = (prefix, obj) => {
                if (Array.isArray(obj)) {
                    obj.forEach((value, i) => {
                        buildParams(prefix + "[" + (typeof value === "object" && value != null ? i : "") + "]", value);
                    });
                } else if (isPlainObject(obj)) {
                    forIn(obj, (value, key) => {
                        buildParams(prefix + "[" + key + "]", value)
                    });
                } else {
                    add(prefix, obj);
                }
            };

        if (isEmpty(o)) {
            return "";
        }

        forIn(o, (value, prefix) => {
            buildParams(prefix, value);
        });

        return s.join("&");
    }


}

export default new Helper();
