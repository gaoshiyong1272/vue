<template>
    <div id="@entryname@">
        <div>@entryname@</div>
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
</template>

<script>
    import {mapState, mapActions, mapMutations, mapGetters} from 'vuex';

    export default {
        name       : 'app',
        components : {},
        computed: {
            ...mapState(['$md5','$base64','$page', '$lodash', '$helper']),
            ...mapState('@entryname@', []),
            ...mapActions('@entryname@', [])
        },

        watch:{},
        created() {
            console.log(this.$md5('qqqqqqqqq'));
            console.log(this.$base64.encode('dankogai'));
            console.log(this.$base64.decode('ZGFua29nYWk='));
            console.log(this.$page);
            console.log(this.$lodash['size']('aaaaaa'));
            console.log(this.$helper.helper.parseURL());
        },
        mounted(){},
        methods: {
            ...mapActions('@entryname@', []),

            /**
             * xlsx data 导出
             */
            dataSave() {
                let time = '2019112801';
                let fileName = '员工信息' + time + '.xlsx',
                    exportData = [];
                let tableHead = [
                    '员工编号',
                    '邮箱',
                ];
                let data = [
                    {company_id: 1, email: 'demo@oasgames.com'},
                    {company_id: 2, email: 'demo2019@oasgames.com'},
                    {company_id: 3, email: 'demo2019@oasgames.com'},
                    {company_id: 4, email: 'demo2017@oasgames.com'}
                ];
                exportData.push(tableHead);
                data.forEach(function (item) {
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
            tableSave() {
                this.$helper.excel.tableSave('.table');
            }
        }
    };
</script>

<style type="scss">
    #@entryname@ {
        font-family: 'Avenir', Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        text-align: center;
        color: #2C3E50;
        margin-top: 60px;

    }

    .test {
        background-image: url("~assets/logo.png");
    }
</style>
