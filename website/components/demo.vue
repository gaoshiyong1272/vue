<template>
    <layout :padding="0">
        <div style="display: none" id="demo">
            <div class="demo-btn">
                <a href="javascript:void(0)" @click="dataSave">data导出Excel</a>
                <a href="javascript:void(0)" @click="tableSave">table导出Excel</a>
                <a href="javascript:void(0)" @click="showLoading">显示/隐藏LOADING</a>
                <a href="javascript:void(0)" @click="urlJump(false)">Route 当前页面打开</a>
                <a href="javascript:void(0)" @click="urlJump(true)">Route 新页面打开</a>
            </div>

            <table class="table" v-show="0">
                <tr>
                    <td>a</td>
                    <td>a</td>
                    <td>a</td>
                    <td>a</td>
                </tr>

                <tr>
                    <td>a</td>
                    <td>a</td>
                </tr>
                <tr>
                    <td>a</td>
                    <td>a</td>
                </tr>
                <tr>
                    <td>a</td>
                    <td>a</td>
                    <td>a</td>
                    <td>a</td>
                    <td>a</td>
                    <td>a</td>
                </tr>
            </table>
        </div>
        <iframe src="https://www.baidu.com" :height="$iframeHeight" frameborder="0" width="100%"></iframe>
<!--        <div style="width: 500px; padding: 50px 0; margin: 0 auto">-->
<!--            <el-input class="testClass" type="number" v-model="munber" placeholder="输入金额"></el-input>-->
<!--            <div class="testClass" ref="testdom"><strong>RMB:</strong><span v-html="munbertoUpperCase"></span></div>-->
<!--        </div>-->
    </layout>
</template>

<script>
    import {mapState, mapActions, mapMutations, mapGetters} from 'vuex';
    import Axios from 'axios';

    export default {
        name       : 'app',
        components : {},
        data(){
            return {
                showLoad: false,
                munber: ''
            }
        },
        computed: {
            ...mapState(['$md5','$base64','$page', '$lodash', '$helper','$route', '$iframeHeight']),
            ...mapGetters('userInfo', []),

			munbertoUpperCase(){
            	return this.munbertoUpperCaseHandle(this.munber);
            },
        },

        created() {
			console.log(this.$refs.testdom);
			console.log(document.getElementsByClassName('testClass'));
            console.log(this.$md5('qqqqqqqqq'));
            console.log(this.$md5('42'));
            console.log(this.$base64.encode('dankogai'));
            console.log(this.$page);
            console.log(this.$lodash['size']('aaaaaa'));
            console.log(this.$helper.helper.parseURL());

            //this.PRIVATE_LOADING(true)



            // this.$helper.cookie.set(
            //     'access-token',
            //     'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJjb3JlLm9hc2dhbWVzLmNvbSIsImlhdCI6MTU3NTU5NzQwNSwiZXhwIjoxNTc1NjQwNjAzLCJ1aWQiOjI1MywiYXBwaWQiOjI1MSwiZGVsZWdhdGUiOiIyNTUiLCJyb2xlcyI6WyJST0xFX0NPUkVfVVNFUiIsIlJPTEVfQ09SRV9ERUxFR0FURURfVVNFUiJdLCJpcCI6IiIsImNoZWNrc3VtIjoiN2YyOWQ3ZGEzNWMxNjM2OSIsInBhcmFtcyI6eyJpc19hZG1pbiI6IjEiLCJpc19wYW5lbF9hZG1pbl91c2VyIjoiMSJ9fQ.X-fxPBUM1vcOEPuTlT8w3oMIUcOkHia9yk8UMjNBjRs',
            //     {expires: 24*365}
            // )

            // let options = [
            //     {url: 'static/login.json', data: {param1: 'param1'}, method: 'get'},
            //     {url: 'static/userinfo.json', data: {param2: 'param2'}, method: 'get'}
            // ];
            // this.$helper.request.all(options,(data)=>{
            //     console.log('111111', data);
            // },(res)=>{
            //
            // })

            this.$helper.request.get('http://panel-udp-test.oasgames.com/v5/games/mtester/servers',{game_code: 'lotr'}).then((res)=>{
                console.log(res);
            }).catch((res)=>{
                console.log(res);
            })

            // Axios.get('http://panel-udp-test.oasgames.com/v5/games/mtester/servers', {
            //     params: {game_code: 'lotr'},
            //     headers: {'X-Requested-With': 'XMLHttpRequest', 'game-code': 'lotr'},
            //     // withCredentials: true,
            //     // crossDomain: true
            //
            // }).then((res) => {
            //     console.log(res);
            // }).catch((res) => {
            //     console.log(res);
            // })

        },

        methods: {
            ...mapActions(['LOADING', 'SET_TITLE']),
            ...mapMutations(['PRIVATE_LOADING']),

			munbertoUpperCaseHandle(str){
            	let retunErrorStr = '输入的金额格式有无！';
				let regz = /^(([0-9]+\.[0-9]*[1-9][0-9]*)|([0-9]*[1-9][0-9]*\.[0-9]+)|([0-9]*[1-9][0-9]*))$/;
				let regs = /^[0]{1,}[0-9]{1,}$/;
				if(!str) {
					return '';
                }
                
                if(str=== '.') {
                	return retunErrorStr;
                }

				if (!(regz.test(str))) {
					return retunErrorStr;
				}
				
				if(regs.test(str)){
					return retunErrorStr;
                }
				
                let num = parseFloat(str);
				let strOutput = "",
                    strUnit = '仟佰拾亿仟佰拾万仟佰拾元角分';
                num += "00";
				let intPos = num.indexOf('.');
                if (intPos >= 0) {
                    num = num.substring(0, intPos) + num.substr(intPos + 1, 2);
                }
                strUnit = strUnit.substr(strUnit.length - num.length);
                for (let i = 0; i < num.length; i++) {
                    strOutput += '零壹贰叁肆伍陆柒捌玖'.substr(num.substr(i, 1), 1) + strUnit.substr(i, 1);
                }
                let newStr = strOutput.replace(/零角零分$/, '整').replace(/零[仟佰拾]/g, '零').replace(/零{2,}/g, '零').replace(/零([亿|万])/g, '$1').replace(/零+元/, '元').replace(/亿零{0,3}万/, '亿').replace(/^元/, "零元")
                let reg = /^.{1,}(零分)$/;
                if(reg.test(newStr)) {
					newStr = newStr.replace(/零分/, '');
                }
                return newStr;
            },

            urlJump(blank){
                /**
                 * 默认
                 * blank=true 新页面打开
                 * blank=false 当前页面打开
                 **/
                this.$route('list/index', {id: 1, name: 'gaoshiyong'}, blank);
            },

            showLoading(){
                this.showLoad = !this.showLoad;
                console.log(this.showLoad);
                this.LOADING(this.showLoad);
            },

            /**
             * xlsx data 导出
             */
            dataSave(){
                let time = '2019112801';
                let fileName = '员工信息' + time + '.xlsx',
                exportData = [];
                let tableHead = [
                    '员工编号',
                    '邮箱',
                ]
                let data = [
                    {company_id: 1, email: 'gaoshiyong@oasgames.com'},
                    {company_id: 2, email: 'gaoshiyong1270@oasgames.com'},
                    {company_id: 3, email: 'gaoshiyong1983@oasgames.com'},
                    {company_id: 4, email: 'gaoshiyong7710@oasgames.com'}
                ]
                exportData.push(tableHead);

                data.forEach(function(item) {
                    exportData.push([
                        item.company_id,
                        item.email,
                    ])
                });
                this.$helper.excel.dataSave(fileName, exportData);
            },

            /**
             * xlsx table 导出
             */
            tableSave(){
                this.$helper.excel.tableSave('.table');
            }
        }
    };
</script>

<style type="scss" scoped>
    #demo {
        height: 1800px;
    }
    a {

        position: relative;
        z-index: 10001;
        color: #00a9e1;
        display: inline-block;
        padding: 0 10px;
    }
</style>
