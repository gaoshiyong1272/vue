<template>
    <layout>
        <div id="@entryname@">
            <div>content: @entryname@</div>
        </div>
    </layout>
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
            @rootStateLoad@,
            ...mapState('@entryname@', []),
            ...mapGetters('@entryname@', []),
        },

        watch:{},
        created() {},
        methods: {
            ...mapActions(['LOADING','SET_TITLE']),
            ...mapActions('@entryname@', []),
            ...mapMutations('@entryname@', [])
        }
    };
</script>

<style type="scss" scoped>
    #@entryname@ {
        font-family: 'Avenir', Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        text-align: center;
        color: #2C3E50;
    }
</style>
