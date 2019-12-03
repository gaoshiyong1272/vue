<template>
    <div id="slimvue">
        <div>@entryname@</div>
    </div>
</template>

<script>
    import {mapState, mapActions, mapMutations, mapGetters} from 'vuex';

    export default {
        name       : '@entryname@',
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
