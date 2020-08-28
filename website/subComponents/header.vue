<template>
  <div class="sub-header-box">
    <div class="sub-header-bar">
      <div class="sub-header-bar-warpper" :style="`width:${$pageWidth}px` ">
        <div class="sub-header-login-and-reg" v-if="!login">欢迎来到鞍山科技大市场，请 <a href="javascript:void(0)"
                                                                             @click="openLogin">登录</a> | <a
          @click="openReg" href="javascript:void(0)">注册</a></div>
        <div class="sub-header-logined" v-else>欢迎来到鞍山科技大市场，<span>gaoshiyong</span></div>
        <div class="sub-header-right">
          <a href="javascript:void(0)">帮助中心</a>|
          <a href="javascript:void(0)">联系我们</a>
        </div>
      </div>
    </div>
    <div class="sub-header-logo" :style="`width:${$pageWidth}px` ">
      <div class="sub-header-logo-left"><a href="/"></a></div>
      <div class="sub-header-logo-right">
        <el-tabs v-model="tabsCurrent" @tab-click="handleClick">
          <el-tab-pane label="成果" name="first">
            <el-input class="search" v-model="form.first"></el-input>
            <el-button type="primary" icon="el-icon-search">搜索</el-button>
          </el-tab-pane>
          <el-tab-pane label="专家" name="second">
            <el-input class="search" v-model="form.second"></el-input>
            <el-button type="primary" icon="el-icon-search">搜索</el-button>
          </el-tab-pane>
          <el-tab-pane label="院校" name="third">
            <el-input class="search" v-model="form.third"></el-input>
            <el-button type="primary" icon="el-icon-search">搜索</el-button>
          </el-tab-pane>
          <el-tab-pane label="需求" name="fourth">
            <el-input class="search" v-model="form.fourth"></el-input>
            <el-button type="primary" icon="el-icon-search">搜索</el-button>
          </el-tab-pane>
        </el-tabs>
      </div>
    </div>
  </div>
</template>

<script>
	import {mapState, mapActions, mapMutations, mapGetters} from 'vuex';

	export default {
		name: "sub-header",
		data() {
			return {
				tabsCurrent: 'first',
        login: true,
				form: {
					
        }
			}
		},
		computed: {
			...mapState(['$pageWidth']),
		},
		methods: {
			...mapActions(['LOADING', 'SAVE_VUE_OBJECT', 'LOGOUT']),

			handleClick(){},

			openLogin() {
				alert('用户登录')
			},

			openReg() {
				alert('用户注册')
			},
		}
	}
</script>

<style scoped type="scss">
  .search {
    width: 77%;
  }
  
  /deep/ .el-button {
    padding: 12px 10px;
  }
  
  /deep/ .el-tabs__active-bar {
    padding: 0 15px;
    margin-left: -20px;
    height: 40px;
    background: #f90;
    z-index: 0;
  }
  
  /deep/ .el-tabs__header {
    margin-bottom: 6px;
  }
  
  /deep/ .el-tabs__item {
    padding: 0 15px!important;
    height: 35px;
    line-height: 35px;
    font-size: 13px;
  }

  /deep/ .el-tabs__item:hover {
    color: #333;
  }


  /deep/ .el-tabs__item.is-active {
    color: #fff;
  }
  
  /deep/ .el-tabs__nav {
    background: #eee;
  }
  
  .sub-header-box {
    width: 100%;
    background: url('/static/images/top_bga.png') no-repeat center 31px;
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
    position: relative;
  }
  
  .sub-header-logo-left {
    position: absolute;
    top: 10px;
    left: 0;
    width: 464px;
    height: 140px;
  }
  
  .sub-header-logo-left * {
    display: inline-block;
    width: 100%;
    height: 100%;
  }
  
  .sub-header-logo-right {
    width: 320px;
    position: absolute;
    right: 150px;
    top: 50px;
  }
  
  
  .sub-header-select {
    width: 220px;
  }
  
  
  .el-radio-button.is-active > > > .el-radio-button__inner {
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
  .sub-header-box .sub-header-right {
    flex: 1;
    width: 50%;
    display: flex;
    justify-content: flex-start;
    flex-wrap: wrap;
    align-items: center;
  }
  
  .sub-header-right {
    justify-content: flex-end !important;
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
  .sub-header-logout:hover i {
    opacity: 0.8;
  }
  
  
  .sub-header-setting {
  }

  .sub-header-setting > > > .el-submenu__title {
    width: 100%;
    height: 100%;
    background: none !important;
    border: 0;
    margin: 0;
    padding: 0;
    line-height: 25px;
  }

  .el-menu-demo {
    width: 100%;
    height: 100%;
    background: none !important;;
    border: 0;
  }
  
  .el-menu-demo li {
    width: 100%;
    height: 100%;
    background: none !important;;
    margin: 0;
    padding: 0;
    border: 0;
  }
  
  .sub-header-setting > > > .el-submenu__icon-arrow {
    display: none;
  }


</style>
