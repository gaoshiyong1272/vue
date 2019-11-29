/**
 * Created by shiyonggao on 2019/11/28.
 */

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
     * 读取cookie值
     * @param key
     * @param options
     */
    getCookie(key, options) {
        options = options || {};
        let result, decode = options.raw ? function (s) {
            return s;
        } : decodeURIComponent;
        return (result = new RegExp('(?:^|; )' + encodeURIComponent(key) + '=([^;]*)').exec(document.cookie)) ? decode(result[1]) : null;
    }

    /**
     * 删除指定键值所对应的cookie值
     * @param key
     * @param options
     */
    removeCookie(key, options) {
        this.setCookie(key, null, options ? options : {});
    }


    /**
     * 添加指定名称cookie值 , 过期时间小时制
     * @param key
     * @param value
     * @param options
     */
    setCookie(key, value, options) {
        options = lodash.extend({}, {
            domain: '',
            path: '/'
        }, options);

        //删除cookie操作处理
        if (value === null) {
            options.expires = -1;
        }

        //设置过期时间
        if (typeof options.expires === 'number') {
            let seconds = options.expires, t = options.expires = new Date();
            t.setTime(t.getTime() + seconds * 1000 * 60 * 60);
        }

        //强制转换为字符串格式
        value = '' + value;

        //设置cookie信息
        return (document.cookie = [
            encodeURIComponent(key), '=',
            options.raw ? value : encodeURIComponent(value),
            options.expires ? '; expires=' + options.expires.toUTCString() : '',
            options.path ? '; path=' + options.path : '',
            options.domain ? '; domain=' + options.domain : '',
            options.secure ? '; secure' : ''
        ].join(''));

    }

    /***
     * 错误统一处理
     * @param $vue
     * @param res
     */
    error($vue, res) {
    }

}

export default new Helper();
