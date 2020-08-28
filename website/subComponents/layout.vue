<template>
  <div class="dev-container">
    <sub-header></sub-header>
    <sub-menu v-if="!menutype"></sub-menu>
    <div class="sub-content-box">
      <div class="sub-content" :style="`min-height: ${$contentHeight}px; width:${$pageWidth}px`">
        <el-breadcrumb v-if="breadcrumb.length > 0" separator-class="el-icon-arrow-right" class="sub-breadcrumb">
          <el-breadcrumb-item>当前位置: </el-breadcrumb-item>
          <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item>活动管理</el-breadcrumb-item>
          <el-breadcrumb-item>活动列表</el-breadcrumb-item>
        </el-breadcrumb>
        <slot></slot>
      </div>
    </div>
    <sub-footer :friendly="friendly"></sub-footer>
  </div>
</template>

<script>
	import {mapState, mapActions, mapMutations, mapGetters} from 'vuex';

	export default {
		name: "layout",
		props: {
			/**
       * @description 是否启用友情连接
       * @type {boolean}
			 */
			friendly: {
				type: Boolean,
				default: false
			},
			/***
       * @description 是否为首页展示模式
			 */
			menutype: {
				type: Boolean,
				default: false
      },

			/**
       * @description 面包屑展示
       * @type Array
			 */
			breadcrumb:{
				type: Array,
				default: ()=>{
					return [
						{title: '首页', url: ''}
          ]
        }
      }
		},
		date() {
			return {
				contentHeight: 0,
				lodingHeight: 0,
			}
		},
		computed: {
			...mapState(['$page', '$lodash', '$helper','$contentHeight', '$pageWidth']),
		},

		created() {
			this.LOADING(false);
			this.SAVE_VUE_OBJECT(this);
		},
		mounted() {

		},
		watch: {
			$loading(val) {
				let loading = document.getElementById('loading');
				if (val) loading.style.display = 'block';
				else loading.style.display = 'none';
			},

			$title(val) {
				document.title = val;
			}
		},
		methods: {
			...mapActions(['LOADING', 'SAVE_VUE_OBJECT']),
		}
	}
</script>

<style type="scss">
  .dev-container {
    width: 100%;
  }
  .sub-content-box {
    width: 100%;
    background: #f4f4f4;
  }
  
  .sub-content {
    margin: 0 auto;
  }
  
  
  .sub-breadcrumb {
    height: 50px;
    font-size: 13px;
    line-height: 50px;
  }
  
  /deep/ .el-breadcrumb__separator[class*=icon] {
    margin: 0 2px;
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
