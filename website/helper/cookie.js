/**
 * Created by shiyonggao on 2019/11/28.
 */

class cookie {
    /**
     * 读取cookie值
     * @param key
     * @param options
     */
    get(key, options) {
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
    remove(key, options) {
        this.setCookie(key, null, options ? options : {});
    }


    /**
     * 添加指定名称cookie值 , 过期时间小时制
     * @param key
     * @param value
     * @param options
     */
    set(key, value, options) {
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
}

export default new cookie();
