<template>
  <div class="sub-footer">
    <div class="sub-footer-warpper" :style="`width: ${$pageWidth}px`">
      <div class="sub-footer-friendly" v-if="friendly">
        <div class="sub-footer-friendly-title"><span>友情链接</span></div>
        <ul>
          <li v-for="(item,index) in friendlyList" :key="index">
            <a :title="item.title" :href="item.url" target="_blank" rel="nofollow">
              <img :src="item.logo" :alt="item.title"/>
            </a>
          </li>
        </ul>
      </div>
      <div class="sub-footer-copyright">
        <p>Copyright © 2017 鞍山科技大市场网上技术交易中心平台 All Rights Reserved 辽ICP备16008871号-2</p>
        <p>运营商：科易网</p>
      </div>
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
				login: false,
				friendlyList: [
          {
          	title: '科技部',
            logo: 'http://yun.upload.1633.com/upload/users/20171211110851083811.jpg',
						url: 'http://www.most.gov.cn/'
          },
					{
						title: '辽宁省科技厅',
						logo: 'http://yun.upload.1633.com/upload/users/20171211110922333100.jpg',
						url: 'http://www.lninfo.gov.cn/'
					},
					{
						title: '鞍山市人民政府',
						logo: 'http://yun.upload.1633.com/upload/users/20171211110943411387.jpg',
						url: 'http://www.anshan.gov.cn/'
					},
					{
						title: '鞍山市科技局',
						logo: 'http://yun.upload.1633.com/upload/users/20171211111010270547.jpg',
						url: 'http://www.most.gov.cn/'
					},
					{
						title: '科易网',
						logo: 'http://yun.upload.1633.com/upload/users/20171211110817411905.jpg',
						url: 'http://www.most.gov.cn/'
					}
        
        ]
			}
		},
		computed: {
			...mapState(['$pageWidth'])
    },
    created(){
			this.friendlyList = [...this.friendlyList, ...this.friendlyList, ...this.friendlyList, ...this.friendlyList, ...this.friendlyList]
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
    padding: 10px 20px;
    margin-bottom: 20px;
  }
  
  .sub-footer-friendly-title {
    height: 30px;
    line-height: 30px;
    font-size: 16px;
    border-bottom: 1px #eee solid;
    margin-bottom: 20px;
  }

  .sub-footer-friendly-title span {
    display: inline-block;
    line-height: 27px;
    padding: 0 20px;
    border-bottom: 3px #f60 solid;
  }
  
  .sub-footer-friendly ul {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    flex-direction: row;
    flex-wrap: wrap;
  }

  .sub-footer-friendly li {
    margin: 0 10px 10px 0;
    font-size: 0;
  }
  
  .sub-footer-copyright {
    padding: 20px 30px;
    line-height:25px;
    text-align: center;
  }
</style>
