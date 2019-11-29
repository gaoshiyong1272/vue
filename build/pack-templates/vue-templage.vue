<template>
    <div id="@entryname@">
        <div>@entryname@</div>
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
            ...mapState(['$md5','$base64','$page', '$lodash', '$helper','$i18n','$moment']),
            ...mapState('@entryname@', []),
            ...mapGetters('@entryname@', []),
        },

        watch:{},
        created() {},
        mounted(){},
        methods: {
            ...mapActions('@entryname@', []),
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
