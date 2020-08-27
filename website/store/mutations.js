import jQuery from 'jquery';

const mutations = {
    /**当前页面**/
    CHANGE_PAGE(state, page){
        state.$page = page;
    },

    /***
     * 设置内容区域高度
     * @constructor
     */
    SET_CONTENT_HEIGHT(state, height) {
        state.$contentHeight = height;
        state.$iframeHeight = height - 5;
    },

    /**内容区域LOADING**/
    PRIVATE_LOADING(state, args) {
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
