import slimvue from 'slimvue';
import App from 'website/components/index.vue';
import store from "../store/app";







store.commit('CHANGE_PAGE', 'index');
slimvue.mount(App);
