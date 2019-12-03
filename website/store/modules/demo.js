/**
 * Created by shiyonggao on 2019/2/25.
 */

/**
 * state 中的方法命名规则（小驼峰规则）
 */
const state = {
    demoList: [],
    demoStatus: false,
};

/**
 * actions 中的方法命名规则（外部调用和内部调用）
 * 内部规则：_demo
 * 外部调用：DEMO
 */
const actions = {
    DEMO_ACTIONS({state, commit, dispatch, rootState}, args){
        console.log('DEMO_ACTIONS=>', args, rootState);
        let data = [{id: 1, data: 'aata1'}, {id: 2, data: 'aata2'}, {id: 3, data: 'aata3'}];
        commit('_updateDemoList', data);
    }
};

/**
 * getters 中的方法命名规则（外部调用）
 * 外部调用：DEMO
 */
const getters = {
    GET_DEMO_GETTER(state, getters){
        let data = getters.getDemoGetterOthr;
        state.demoList = state.demoList.concat(data);
        return state.demoList;

    },

    getDemoGetterOthr(state, getters){
        return[{id: 4, data: 'aata4'}]
    }
};

/**
 * mutations 中的方法命名规则（外部调用和内部调用）
 * 内部规则：_demo
 * 外部调用：DEMO
 * 描述：建议不对外提供映射关系
 */
const mutations = {
    _updateDemoList(state, args){
        state.demoList = args;
        console.log(state.demoList);
    },

    /**
     * 对外的方法
     * @param state
     * @param args
     * @constructor
     */
    DEMO_MUTATIONS(state, args){
        state.demoStatus = args;
        console.log(state.demoStatus);
    }
};

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}
