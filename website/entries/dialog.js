import slimvue from 'slimvue';
import App from '@websitedir/components/dialog.vue';
import store from "@websitedir/store/app";

store.commit('CHANGE_PAGE', 'dialog');
store.dispatch('APP_INIT',function(){
    slimvue.mount(App);
});

