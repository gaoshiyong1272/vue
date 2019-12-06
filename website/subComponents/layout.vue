<template>
    <el-container>
        <el-header>
            <sub-header></sub-header>
        </el-header>
        <el-container class="inner-container">
            <el-aside class="sub-menu-box">
                <sub-aside></sub-aside>
            </el-aside>
            <el-main>
                <div class="sub-breadcrumb">breadcrumb</div>
                <div class="sub-content-box">
                    <div class="sub-content">
                        <slot></slot>
                    </div>
                </div>
            </el-main>
        </el-container>
    </el-container>
</template>

<script>
import {mapState, mapActions, mapMutations, mapGetters} from 'vuex';

export default {
    name: "layout",
    date(){},
    computed:{
        ...mapState(['$md5', '$base64', '$page', '$lodash', '$helper', '$loading', '$title']),
    },
    mounted(){
        this.LOADING(false);
        this.SAVE_VUE_OBJECT(this);
        document.title = this.$title;

    },
    watch:{
        $loading(val){
            let loading = document.getElementById('loading');
            if (val) loading.style.display = 'block';
            else loading.style.display = 'none';
        },

        $title(val){
            document.title = val;
        }
    },
    methods: {
        ...mapActions(['LOADING', 'SAVE_VUE_OBJECT'])
    }
}
</script>

<style type="scss">
    #slimvue-app {
        height: 100%;
    }
    .el-container {
        height: 100%;

    }
    .inner-container {
        height: 100%;
        height: -moz-calc(100% - 60px);
        height: -webkit-calc(100% - 60px);
        height: calc(100% - 60px);
    }

    .el-aside {
        width: 260px!important;
        border-right: 1px solid #ccc;
    }

    .el-main {
        background: #fafafa;
        padding: 0!important;
    }

    .el-header {
        padding: 0;
    }

    .sub-content-box {
        padding: 25px;
    }

    .sub-content {
        background: #fff;
        padding: 20px;
    }

    .sub-breadcrumb {
        height: 50px;
        background: #fff;
        font-size: 16px;
        padding: 0 25px;
        line-height: 50px;
    }


</style>
