import slimvue from 'slimvue';
import App from 'website/components/list.vue';
import store from "../store/app";

store.commit('CHANGE_PAGE', 'list');
store.dispatch('APP_INIT',function(){
    slimvue.mount(App);
});

