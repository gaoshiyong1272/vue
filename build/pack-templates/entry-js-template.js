import slimvue from 'slimvue';
import App from 'website/components/@entryname@.vue';
import store from "../store/app";

store.commit('CHANGE_PAGE', '@entryname@');
store.dispatch('APP_INIT',function(){
    slimvue.mount(App);
});

