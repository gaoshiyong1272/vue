/**
 * Created by shiyonggao on 2019/12/13.
 */

class LocalStorage {
    constructor(){
        this.regKey = /^[a-zA-Z_]{1,}$/;
        this.store = window.localStorage ? window.localStorage : null;
    }

    check(key){
        if (!this.store){
            throw "Browser don't support localStorage";
        }

        if (!this.regKey.test(key)) {
            throw "Key the rules is error";
        }
    }

    getTime(){
        return Math.floor(new Date().getTime()/1000);
    }

    /***
     * 设置值
     * @param key [a-zA-Z_]
     * @param value
     * @param expire 小时单位 type='number'
     */
    set(key , value, expire){
        this.check(key);
        value = JSON.stringify(value);

        /**已设置过期期间处理**/
        if(expire && typeof expire === 'number'){
            let expireKey = `${key}_expire_date`;
            let expireValue = this.getTime() + expire*60*60;
            this.store.setItem(expireKey, expireValue);
            this.store.setItem(key, value);
        }else{
            this.store.setItem(key, value);
        }
    }

    /**
     * 获取值
     * @param key
     * @returns {string|null}
     */
    get(key){
        this.check(key);
        let value = this.store.getItem(key);

        /**有值**/
        if(value){
            let expireKey = `${key}_expire_date`;
            let time = this.store.getItem(expireKey);
            /**判断是否设置有效期**/
            if(time){
                /**数据已过期**/
               if(time < this.getTime()) {
                   this.remove(key);
                   this.remove(expireKey);
                   return null;
               } else{
                   return JSON.parse(value);
               }
            }else {
               return JSON.parse(value);
            }
        }else {
            return null;
        }
    }

    /**
     * 删除值
     * @param key
     */
    remove(key){
        this.check(key);
        let expireKey = `${key}_expire_date`;
        let time = this.store.getItem(expireKey);
        this.store.removeItem(key);
        if(time) this.store.removeItem(key);
    }
}

export default new LocalStorage();
