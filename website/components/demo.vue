<template>
    <layout>
        <div id="slimvue">
            <div>content: Index</div>
            <a href="javascript:void(0)" @click="dataSave">data导出Excel</a>
            <a href="javascript:void(0)" @click="tableSave">table导出Excel</a>
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
    </layout>
</template>

<script>
    import {mapState, mapActions, mapMutations, mapGetters} from 'vuex';

    export default {
        name       : 'app',
        components : {},
        computed: {
            ...mapState(['$md5','$base64','$page', '$lodash', '$helper']),
            ...mapGetters('userInfo', [])
        },

        created() {
            console.log(this.$md5('qqqqqqqqq'));
            console.log(this.$md5('42'));
            console.log(this.$base64.encode('dankogai'));
            console.log(this.$page);
            console.log(this.$lodash['size']('aaaaaa'));
            console.log(this.$helper.helper.parseURL());

            this.$helper.helper.getParamers()
        },

        methods: {

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
    #slimvue {
        font-family             : 'Avenir', Helvetica, Arial, sans-serif;
        -webkit-font-smoothing  : antialiased;
        -moz-osx-font-smoothing : grayscale;
        text-align              : center;
        color                   : #2C3E50;
        margin-top              : 60px;

    }

    .test {
        background-image : url("~assets/logo.png");
    }
</style>
