/**
 * Created by shiyonggao on 2019/2/25.
 */

/**
 * state 中的方法命名规则（小驼峰规则）
 */
const state = {
    userinfo: {}
};

/**
 * actions 中的方法命名规则（外部调用和内部调用）
 * 内部规则：_demo
 * 外部调用：DEMO
 */
const actions = {

};

/**
 * getters 中的方法命名规则（外部调用）
 * 外部调用：DEMO
 */
const getters = {

};

/**
 * mutations 中的方法命名规则（外部调用和内部调用）
 * 内部规则：_demo
 * 外部调用：DEMO
 * 描述：建议不对外提供映射关系
 */
const mutations = {

};

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}
