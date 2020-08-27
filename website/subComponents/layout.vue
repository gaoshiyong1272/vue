<template>
  <div class="dev-container">
    <sub-header></sub-header>
    <sub-menu></sub-menu>
    <div class="sub-content-box">
      <div class="sub-content" :style="`min-height: ${$contentHeight}px;`">
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
			}
		},
		date() {
			return {
				contentHeight: 0,
				lodingHeight: 0,
			}
		},
		computed: {
			...mapState(['$md5', '$base64', '$page', '$lodash', '$helper', '$loading', '$title', '$jquery', '$loadingPrivate', '$contentHeight']),
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
			...mapMutations(['SET_CONTENT_HEIGHT']),

		}
	}
</script>

<style type="scss">
  .dev-container {
    width: 100%;
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
