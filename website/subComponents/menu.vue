<template>
    <div class="sub-menu-box">
        <div class="sub-menu-box-warpper" :style="`width:${$pageWidth}px` "></div>
    </div>
</template>

<script>
import {mapState, mapActions, mapMutations, mapGetters} from 'vuex';

export default {
    name: "sub-menu",
    data() {
        return {
        	login: false
        }
    },
    computed: {
        ...mapState(['$pageWidth']),
    },
    methods: {
        ...mapActions(['LOADING']),
    }
}
</script>

<style scoped type="scss">
    .sub-header-box {
        width: 100%;
    }
</style>
