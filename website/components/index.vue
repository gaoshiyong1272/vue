<template>
    <div id="slimvue">
        <div>Index</div>
    </div>
</template>

<script>
    import {mapState, mapActions, mapMutations} from 'vuex';

    export default {
        name       : 'app',
        components : {},
        computed: {
            ...mapState(['$md5','$base64','$page'])
        },

        created() {
            console.log(this.$md5('qqqqqqqqq'));
            console.log(this.$md5('42'));
            console.log(this.$base64.encode('dankogai'));
            console.log(this.$page);
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
