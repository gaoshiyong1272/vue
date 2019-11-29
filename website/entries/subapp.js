import slimvue from 'slimvue';
import App from 'website/components/subapp.vue';
import store from "../store/app";

store.commit('CHANGE_PAGE', 'subapp');
store.dispatch('APP_INIT',function(){
    slimvue.mount(App);
});

