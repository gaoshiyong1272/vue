<template>
    <div class="left-menu-box">
        <el-col>
            <el-menu v-if="key !== 'system'" :key="key"
                     v-for="(item,key) in $routerMaps"
                     :default-active="activeHandle(item,key)"
                     class="el-menu-vertical-demo"
                     :collapse-transition="false"
                     @open="handleOpen"
                     @close="handleClose"
                     @select="subMenuSelected"
            >
                <el-submenu class="el-menu-item-has-parent" :index="key" v-if="item.children">
                    <template slot="title">
                        <i :class="`left-menu-icon iconfont ${item.icon}`"></i>
                        <span v-html="item.title"></span>
                    </template>
                    <template v-for="(subItem,subkey) in item.children">
                        <el-menu-item v-if="subItem.active === subkey" class="el-menu-item-has-children"
                                      :index="`${key}-${subItem.active}`">
                            <i class="el-icon-custom el-icon-caret-right"></i>{{subItem.title}}
                        </el-menu-item>
                    </template>
                </el-submenu>
                <el-menu-item :index="key" v-else class="el-menu-item-no-children">
                    <i :class="`left-menu-icon iconfont ${item.icon}`"></i>
                    <span v-html="item.title"></span>
                </el-menu-item>

            </el-menu>
        </el-col>
    </div>
</template>

<script>
import {mapState, mapActions, mapMutations, mapGetters} from 'vuex';
export default {
    name: "sub-aside",
    data() {
        return {};
    },
    computed: {
        ...mapState(['$md5', '$base64', '$page', '$lodash', '$helper', '$route', '$routerMaps']),
    },

    created() {
        console.log('11111', this.$routerMaps);
    },
    
    methods: {
		/**
		 * 设置当前选择样式
		 * @returns {string}
		 */
		activeHandle() {
			console.log('1111', this.$page);
			let patharr = this.$page.split('/');

			if (patharr.length > 1) {
				let mune = this.$routerMaps[patharr[0]]['children'][patharr[1]];
				return `${patharr[0]}-${mune.active}`;
			} else {
				return this.$page;
			}
		},

		/**
		 * 选择Menu页面跳转
		 * @param key
		 * @param keyPath
		 */
		subMenuSelected(key, keyPath) {
			/**无子节点菜单**/
			if (keyPath.length === 1) {
				let menu = this.$routerMaps[keyPath];
				/**自定义路由跳转**/
				if (menu['jumpToRoute']) {
					this.$route(menu['jumpToRoute'].toLocaleLowerCase());
				} else {
					this.$route(keyPath[0].toLocaleLowerCase());
				}
				return;
			}
			/**有子节点菜单**/
			let arr = keyPath[1].split('-');
			let menu = this.$routerMaps[arr[0]]['children'][arr[1]];
			if (menu['jumpToRoute']) {
				this.$route(menu['jumpToRoute'].toLocaleLowerCase());
			} else {
				this.$route(arr.join('/').toLocaleLowerCase());
			}
			console.log(arr, menu);
		},
		handleOpen(key, keyPath) {
			console.log(key, keyPath);
		},
		handleClose(key, keyPath) {
			console.log(key, keyPath);
		}
    }

    
}
</script>

<style scoped>
    .el-container {
        height: 100%
    }

    .el-aside {
        height: 100%
    }

    .el-main {
        padding: 0;
    }

    .el-header {
        padding: 0;
    }
</style>
