/**
 * Created by shiyonggao on 2019/11/28.
 */

class error {

    /***
     * 错误统一处理
     */
    error(e, {state, commit, dispatch, rootState}) {
        alert('error');
    }

}

export default new error();
