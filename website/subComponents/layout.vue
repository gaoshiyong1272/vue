<template>
    <el-container>
        <el-header>
            <sub-header></sub-header>
        </el-header>
        <el-container class="inner-container">
            <el-aside class="sub-menu-box">
                <sub-aside></sub-aside>
            </el-aside>
            <el-main id="page-main">
                <div class="sub-breadcrumb" id="page-main-breadcrumb">breadcrumb</div>
                <div class="loading-private"  id="loading-private" v-show="$loadingPrivate">
                    <div class="loading-private-wrap"></div>
                    <div class="loading-private-animate"></div>
                </div>
                <div class="sub-content-box" :style="`padding: ${padding}px`" id="page-main-content">
                    <div class="sub-content" :style="`min-height: ${$contentHeight}px;`">
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
    date(){
        return {
            contentHeight : 0,
            lodingHeight: 0,
        }
    },
    props: {
        padding : {
            type: Number,
            default: 25,
        }
    },
    computed:{
        ...mapState(['$md5', '$base64', '$page', '$lodash', '$helper', '$loading', '$title','$jquery', '$loadingPrivate', '$contentHeight']),
    },

    created(){
        this.LOADING(false);
        this.SAVE_VUE_OBJECT(this);
        document.title = this.$title;
        this.$jquery(window).resize(() => {
            this.getContentHeight();
        });
    },
    mounted(){
        /**计算内容区域高度**/
        this.getContentHeight();
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
        ...mapActions(['LOADING', 'SAVE_VUE_OBJECT']),
        ...mapMutations(['SET_CONTENT_HEIGHT']),

        getContentHeight() {
            let height = this.$jquery(window).height() - this.$jquery('.el-header').outerHeight();
            height = height - this.$jquery('#page-main-breadcrumb').outerHeight() - parseInt(this.padding) * 2;
            this.contentHeight = height;
            this.SET_CONTENT_HEIGHT(height);
        },

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
        background: #f4f4f4;
        padding: 0 !important;
        position: relative;
        height: 100%;
    }

    .el-header {
        padding: 0;
    }


    .sub-content {
        background: #f4f4f4;
    }

    .sub-breadcrumb {
        height: 50px;
        font-size: 16px;
        padding: 0 25px;
        line-height: 50px;
        border-bottom: #f4f4f4 solid 1px;
        /* Permalink - use to edit and share this gradient: https://colorzilla.com/gradient-editor/#fefefe+0,f4f4f4+100 */
        background: #fff; /* Old browsers */
        background: -moz-linear-gradient(top, #fefefe 0%, #f4f4f4 100%); /* FF3.6-15 */
        background: -webkit-linear-gradient(top, #fefefe 0%, #f4f4f4 100%); /* Chrome10-25,Safari5.1-6 */
        background: linear-gradient(to bottom, #fefefe 0%, #f4f4f4 100%); /* W3C, IE10+, FF16+, Chrome26+, Opera12+, Safari7+ */
        filter: progid:DXImageTransform.Microsoft.gradient(startColorstr='#fefefe', endColorstr='#f4f4f4', GradientType=0); /* IE6-9 */


    }

    .noaccess {
        font-family: 'Avenir', Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        color: #2C3E50;
        font-size: 25px;
        font-weight: bold;
        line-height: 40px;
        padding: 250px 0;
        text-align: center;
    }


</style>
