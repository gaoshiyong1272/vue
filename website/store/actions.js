const actions = {
    APP_INIT({state, commit, dispatch, rootState}, callback){
        console.log('app init done');
        callback();
    }
};

export default actions;
