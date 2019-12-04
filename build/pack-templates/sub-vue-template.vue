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
            @rootStateLoad@,
        },

        created() {
        },

        methods: {
        }
    };
</script>

<style type="scss">
</style>
