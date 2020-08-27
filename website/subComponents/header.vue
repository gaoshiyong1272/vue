<template>
    <div class="sub-header-box">
        <div class="sub-header-bar">
            <div class="sub-header-bar-warpper" :style="`width:${$pageWidth}px` ">
                <div class="sub-header-login-and-reg" v-if="!login">欢迎来到鞍山科技大市场，请 <a href="javascript:void(0)" @click="openLogin">登录</a> | <a
                    @click="openReg" href="javascript:void(0)">注册</a></div>
                <div class="sub-header-logined" v-else>欢迎来到鞍山科技大市场，<span>gaoshiyong</span></div>
                <div class="sub-header-right">
                    <a href="javascript:void(0)">帮助中心</a>|
                    <a href="javascript:void(0)">联系我们</a>
                </div>
            </div>
        </div>
        <div class="sub-header-logo" :style="`width:${$pageWidth}px` ">
            <div class="sub-header-logo-left">logo</div>
            <div class="sub-header-logo-right">搜索</div>
        </div>
    </div>
</template>

<script>
import {mapState, mapActions, mapMutations, mapGetters} from 'vuex';

export default {
    name: "sub-header",
    data() {
        return {
        	login: false
        }
    },
    computed: {
        ...mapState(['$pageWidth']),
    },
    methods: {
        ...mapActions(['LOADING', 'SAVE_VUE_OBJECT','LOGOUT']),

        openLogin(){
        	alert('用户登录')
        },

        openReg() {
            alert('用户注册')
        },
    }
}
</script>

<style scoped type="scss">
    .sub-header-box {
        width: 100%;
    }
    
    .sub-header-bar {
        height: 31px;
        line-height: 31px;
        background: #fafafa;
        overflow: hidden;
    }

    .sub-header-bar-warpper {
        margin: 0 auto;
        height: 100%;
        display: flex;
        justify-content: space-between;
        flex-wrap: wrap;
        align-items: center;
    }
    
    .sub-header-logined span {
        color: #2d64b3;
    }

    .sub-header-logo {
        height: 158px;
        margin: 0 auto;
    }
    

    .sub-header-select {
        width: 220px;
    }


    .el-radio-button.is-active >>> .el-radio-button__inner {
        background: #f1f1f1;
        color: #333;
    }

    .sub-header-project-type {
        margin-left: 40px;
        display: flex;
        justify-content: center;
        flex-wrap: wrap;
        align-items: center;
    }

    .sub-header-project-type > * {
        margin: 0;
        height: 34px;
        line-height: 34px;
        background: #fff;
        padding: 0 25px;
        font-size: 15px;
        color: #333;
    }

    .sub-header-project-type > *:hover {
        text-decoration: none;
    }

    .sub-header-project-type > *:first-child {
        border-radius: 5px 0 0 5px;
    }

    .sub-header-project-type > *:last-child {
        border-radius: 0 5px 5px 0;
    }

    .sub-header-project-type > *.active {
        background: #f1f1f1;
    }


    .sub-header-box .sub-header-left,
    .sub-header-box .sub-header-right
    {
        flex: 1;
        width: 50%;
        display: flex;
        justify-content: flex-start;
        flex-wrap: wrap;
        align-items: center;
    }

    .sub-header-right {
        justify-content: flex-end!important;
    }

    .sub-header-right > * {
        margin: 0 6px;
    }

    .sub-header-username {
        color: #fff;
        font-size: 14px;
        font-weight: bold;
    }

    .sub-header-setting,
    .sub-header-logout {
        width: 25px;
        height: 25px;
        cursor: pointer;
    }

    .sub-header-setting i,
    .sub-header-logout i {
        font-size: 25px;
        color: #fff;
        margin-right: 0;

    }

    .sub-header-setting:hover i,
    .sub-header-logout:hover i
    {
        opacity: 0.8;
    }


    .sub-header-setting {}
    .sub-header-setting >>> .el-submenu__title {
        width: 100%;
        height: 100%;
        background: none!important;
        border: 0;
        margin: 0;
        padding: 0;
        line-height: 25px;
    }
    .el-menu-demo {
        width: 100%;
        height: 100%;
        background: none !important;;
        border:0;
    }

    .el-menu-demo li {
        width: 100%;
        height: 100%;
        background: none !important;;
        margin: 0;
        padding: 0;
        border: 0;
    }

    .sub-header-setting >>> .el-submenu__icon-arrow {
        display: none;
    }





</style>
