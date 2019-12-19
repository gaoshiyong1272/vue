/**
 * Created by shiyonggao on 2019/12/13.
 */

class sessionStorage {
    constructor(){
        this.regKey = /^[a-zA-Z_]{1,}$/;
        this.store = window.sessionStorage ? window.sessionStorage : null;
    }

    check(key){
        if (!this.store){
            throw "Browser don't support localStorage";
        }

        if (!this.regKey.test(key)) {
            throw "Key the rules is error";
        }
    }


    /***
     * 设置值
     * @param key [a-zA-Z_]
     * @param value
     * @param expire 小时单位 type='number'
     */
    set(key , value, expire){
        this.check(key);
        this.store.setItem(key, JSON.stringify(value));
    }

    /**
     * 获取值
     * @param key
     * @returns {string|null}
     */
    get(key){
        this.check(key);
        return this.store.getItem(key);
    }

    /**
     * 删除值
     * @param key
     */
    remove(key){
        this.check(key);
        this.store.removeItem(key);

    }
}

export default new sessionStorage();
