import slimvue from 'slimvue';
import App from 'website/components/demo.vue';
import store from "../store/app";

store.commit('CHANGE_PAGE', 'demo');
store.dispatch('APP_INIT',function(){
    slimvue.mount(App);
});

