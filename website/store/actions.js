import errorHandler from "../helper/error";

const actions = {
    APP_INIT({state, commit, dispatch, rootState}, callback){
        callback();
    },

    /**
     * 更新$loading状态
     * @constructor
     */
    LOADING({state, commit, dispatch, rootState}, args){
        commit('_updateLoading',args);
    },

    /**
     * 存储$vue
     * @constructor
     */
    SAVE_VUE_OBJECT({state, commit, dispatch, rootState}, $vue){
        commit('_updateSaveVueObject', $vue);
    },

    /**
     * 请求错误统一处理
     * @constructor
     */
    ERROR_HANDLE({state, commit, dispatch, rootState}, e){
        errorHandler.error(e, {state, commit, dispatch, rootState});
    },

    /**
     * 设置页面
     * @constructor
     */
    SET_TITLE({state, commit, dispatch, rootState}, pageName){
        commit('_setTitle', pageName);
    },

    /**
     * 用户退出
     * @constructor
     */
    LOGOUT({state, commit, dispatch, rootState},args){
        alert('LOGOUT');
    },

};

export default actions;
