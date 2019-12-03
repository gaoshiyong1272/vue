import Vue from 'vue';
import index from './index';
import listIndex from './list/index';
import listListIndex from './list/list/index';
import list from './list';

Vue.component('sub-index',index);
Vue.component('sub-list-index',listIndex);
Vue.component('sub-list-list-index',listListIndex);
Vue.component('sub-list',list);

