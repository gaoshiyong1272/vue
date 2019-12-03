<template>
    <div id="@entryname@">
        <div>@entryname@</div>
        <ul>
            <li v-for="item in demoList">
                <div v-html="`id: ${item.id}`"></div>
                <div v-html="`data: ${item.data}`"></div>
            </li>
        </ul>
    </div>
</template>

<script>
    import {mapState, mapActions, mapMutations, mapGetters} from 'vuex';


    export default {
        name       : '@entryname@',
        components : {},
        data(){
            return {};
        },
        computed: {
            ...mapState(['$md5','$base64','$page', '$config', '$lodash', '$helper','$i18n','$moment']),
            ...mapState('@entryname@', ['demoList']),
            ...mapGetters('@entryname@', ['GET_DEMO_GETTER']),
        },

        watch:{
            GET_DEMO_GETTER(val) {
                if(val) {
                    console.log(this.GET_DEMO_GETTER)
                }
            }
        },
        created() {
            /**调用Actions方法**/
            this.DEMO_ACTIONS({args:1});

            /**调用Mutations方法**/
            this.DEMO_MUTATIONS(true);


        },
        mounted(){},
        methods: {
            ...mapActions('@entryname@', ['DEMO_ACTIONS']),
            ...mapMutations('@entryname@', ['DEMO_MUTATIONS'])
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
</style>
