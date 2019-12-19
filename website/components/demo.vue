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
            }
        },
        computed: {
            ...mapState(['$md5','$base64','$page', '$lodash', '$helper','$route', '$iframeHeight']),
            ...mapGetters('userInfo', [])
        },

        created() {
            console.log(this.$md5('qqqqqqqqq'));
            console.log(this.$md5('42'));
            console.log(this.$base64.encode('dankogai'));
            console.log(this.$page);
            console.log(this.$lodash['size']('aaaaaa'));
            console.log(this.$helper.helper.parseURL());

            //this.PRIVATE_LOADING(true)



            this.$helper.cookie.set(
                'access-token',
                'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJjb3JlLm9hc2dhbWVzLmNvbSIsImlhdCI6MTU3NTU5NzQwNSwiZXhwIjoxNTc1NjQwNjAzLCJ1aWQiOjI1MywiYXBwaWQiOjI1MSwiZGVsZWdhdGUiOiIyNTUiLCJyb2xlcyI6WyJST0xFX0NPUkVfVVNFUiIsIlJPTEVfQ09SRV9ERUxFR0FURURfVVNFUiJdLCJpcCI6IiIsImNoZWNrc3VtIjoiN2YyOWQ3ZGEzNWMxNjM2OSIsInBhcmFtcyI6eyJpc19hZG1pbiI6IjEiLCJpc19wYW5lbF9hZG1pbl91c2VyIjoiMSJ9fQ.X-fxPBUM1vcOEPuTlT8w3oMIUcOkHia9yk8UMjNBjRs',
                {expires: 24*365}
            )

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

<style type="scss">
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
