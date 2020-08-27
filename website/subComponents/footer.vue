<template>
  <div class="sub-footer">
    <div class="sub-footer-warpper" :style="`width: ${$pageWidth}px`">
      <div class="sub-footer-friendly" v-if="friendly">
        <div class="sub-footer-friendly-title">
        
        </div>
      </div>
      <div class="sub-footer-copyright"></div>
    </div>
  </div>
</template>

<script>
	import {mapState, mapActions, mapMutations, mapGetters} from 'vuex';

	export default {
		name: "sub-footer",
		props: {
			friendly: {
				type: Boolean,
				default: false
			}
		},
		data() {
			return {
				login: false
			}
		},
		computed: {
			...mapState(['$pageWidth'])
    },
		methods: {}
	}
</script>

<style scoped type="scss">
  .sub-footer {
    width: 100%;
    padding-top: 20px;
  }
  .sub-footer-warpper {
    margin: 0 auto;
  }
  
  .sub-footer-friendly {
    border: 1px solid #ccc;
    border-top: 3px solid #666;
    
  }
  
  .sub-footer-copyright {
  }
</style>
