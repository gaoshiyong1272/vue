/**
 * Created by shiyonggao on 2019/11/28.
 */

class test {
    /***
     * 去掉两端空格
     * @param s
     * @returns {s}
     */
    test(s) {
        return s.replace(/^\s+|\s+$/gm, '');
    }

}

export default new test();
