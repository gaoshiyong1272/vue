<template>
    <div id="slimvue">
        <div>sub-list</div>
    </div>
</template>

<script>
    import {mapState, mapActions, mapMutations, mapGetters} from 'vuex';

    export default {
        name       : 'sub-list',
        props: [],
        components : {},
        computed: {
            ...mapState(['$md5', '$base64', '$page', '$config', '$lodash', '$helper', '$i18n', '$moment']),
        },

        created() {
        },

        methods: {
        }
    };
</script>

<style type="scss">
</style>
