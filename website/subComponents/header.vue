<template>
    <div class="sub-header-box">
        <div class="sub-header-left">
            <div class="sub-header-select-box">
                <el-select v-model="value" class="sub-header-select">
                    <el-option
                        v-for="item in options"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                    </el-option>
                </el-select>
            </div>
            <div class="sub-header-project-type">
                <a class="active" href="">发行配置</a>
                <a href="">业务管理</a>
            </div>
        </div>
        <div class="sub-header-right">
            <div class="sub-header-username">gaoshiyong@oasgames.com</div>
            <div class="sub-header-setting">
                <el-menu
                    :default-active="activeIndex2"
                    mode="horizontal"
                    @select="subMenuSelected"
                    class="el-menu-demo">
                    <el-submenu index="1" popper-class="sub-header-setting-pop">
                        <template slot="title"><i class="el-icon-setting"></i></template>
                        <el-menu-item index="system/sdk">SDK版本管理</el-menu-item>
                    </el-submenu>
                </el-menu>
            </div>
            <div class="sub-header-logout" @click="$helper.helper.logout()"><i class="el-icon-switch-button"></i></div>
        </div>
    </div>
</template>

<script>
import {mapState, mapActions, mapMutations, mapGetters} from 'vuex';

export default {
    name: "sub-header",
    data() {
        return {
            options: [{
                value: '选项1',
                label: '黄金糕'
            }, {
                value: '选项2',
                label: '双皮奶'
            }, {
                value: '选项3',
                label: '蚵仔煎'
            }, {
                value: '选项4',
                label: '龙须面'
            }, {
                value: '选项5',
                label: '北京烤鸭'
            }],
            value: '',
            tabPosition: 'left',
            activeIndex: '1',
            activeIndex2: '1'
        }
    },
    computed: {
        ...mapState(['$md5', '$base64', '$page', '$lodash', '$helper', '$route']),
    },
    methods: {
        ...mapActions(['LOADING', 'SAVE_VUE_OBJECT','LOGOUT']),

        subMenuSelected(key, keyPath){
            this.$route(keyPath)
        }
    }
}
</script>

<style scoped type="scss">
    .sub-header-box {
        display: flex;
        justify-content: space-around;
        flex-wrap: wrap;
        align-items: center;
        background: rgba(22, 155, 213, 1);
        /*background: rgba(50,51,50, 1);*/
        height: 60px;
        padding: 0 20px;
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
