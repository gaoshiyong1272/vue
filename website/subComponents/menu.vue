<template>
  <div class="sub-menu-box">
    <div class="sub-menu-box-warpper" :style="`width:${$pageWidth}px`">
      <el-menu
        :default-active="activeIndex2"
        class="el-menu-demo"
        mode="horizontal"
        @select="handleSelect"
        background-color="#063390"
        text-color="#fff"
        active-text-color="#f90">
        <el-menu-item index="1">首页</el-menu-item>
        <el-submenu index="2">
          <template slot="title">我的工作台</template>
          <el-menu-item index="2-1">选项1</el-menu-item>
          <el-menu-item index="2-2">选项2</el-menu-item>
          <el-menu-item index="2-3">选项3</el-menu-item>
        </el-submenu>
        <el-menu-item index="3">消息中心</el-menu-item>
        <el-menu-item index="4"><a href="https://www.ele.me" target="_blank">订单管理</a></el-menu-item>
      </el-menu>
    </div>
  </div>
</template>

<script>
	import {mapState, mapActions, mapMutations, mapGetters} from 'vuex';

	export default {
		name: "sub-menu",
		data() {
			return {
				activeIndex2: '1'
			}
		},
		computed: {
			...mapState(['$pageWidth'])
    },
		methods: {
			handleSelect(key, keyPath) {
				console.log(key, keyPath);
			}
		}
	}
</script>

<style scoped type="scss">
  .sub-menu-box {
    width: 100%;
    height: 42px;
    background: #063390;
  }
  
  .sub-menu-box-warpper {
    margin: 0 auto;
  }
  
  /deep/ .el-menu--horizontal > .el-menu-item, /deep/ .el-menu--horizontal > .el-submenu .el-submenu__title {
    height: 42px;
    line-height: 42px;
  }
</style>
