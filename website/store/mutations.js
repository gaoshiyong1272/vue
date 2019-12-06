const mutations = {
    /**当前页面**/
    CHANGE_PAGE(state, page){
        state.$page = page;
    },

    _updateLoading(state, args){
        state.$loading = args;
    },

    _updateSaveVueObject(state, $vue){
        state.$vue = $vue;
    },

    _setTitle(state, pageName){
        state.$title = state.$s_title + ` - ${pageName}`;
    }

};

export default mutations;
