/**
 * Created by shiyonggao on 2019/1/28.
 */
const MD5 = require('md5.js');

import Vue from 'vue';
import Vuex from 'vuex';
import VueI18n from 'vue-i18n';
import {Base64} from 'js-base64';
import Lodash from "lodash";
import Jquery from "jquery";
import Helper from "./../helper/autoload"
import Moment from "moment";
import routerMaps from "./../config/router";
const Config = require('./../config/config');


/**root vuex**/
import rootActions from './actions';
import rootMutations from './mutations';
import rootGetters from './actions';
import modules from './modules/autoload';

const locale = 'zh-CN';

Vue.use(Vuex);
Vue.use(VueI18n);

const i18n = new VueI18n({
    locale: locale,
    messages: require('./../language/lang_config')
});

/**
 * md5算法
 * @param str
 * @param hex
 * @returns {*}
 */
const md5Fn = (str, hex = 'hex') => {
    return new MD5()['update'](str)['digest'](hex);
};

/**转换路由器方法**/
const routeFn = (routeName, data, blank = false)=>{
    Helper.helper.route(routeName, data, blank);
};


const state = {
    $i18n: i18n,
    $md5 : md5Fn,
    $base64: Base64,
    $page : 'index',
    $config : Config,
    $lodash: Lodash,
    $jquery: Jquery,
    $helper : Helper,
    $moment : Moment,
    $loading: true,
    $vue: null,
    $s_title : 'ODP4发行平台',
    $title: 'ODP4发行平台 欢迎您！',
    $route: routeFn,
    $routerMaps: routerMaps,
    $contentHeight: 400,
    $iframeHeight : 400,
    $loadingPrivate: false
};


const actions = rootActions;
const mutations = rootMutations;
const getters = rootGetters;
const store = new Vuex.Store({
    modules,
    state,
    actions,
    mutations,
    getters
});

export default store;
