<template>
    <div id="slimvue">
        <img src="~assets/logo.png">
        <hello></hello>
        <div class="test">
            Nice Day 4
        </div>
        <el-button title="Hello" type="plain">Wow</el-button>
        <img src="/static/pic.png"/>
    </div>
</template>

<script>
    import Hello     from 'website/components/Hello';
    import locale    from 'element-ui/lib/locale/lang/en';
    import ElementUI from 'element-ui';
    import Vue       from 'vue';

    // noinspection JSUnresolvedFunction
    Vue.use(ElementUI, {locale});

    export default {
        name       : 'app',
        components : {
            Hello,
        },
    };
</script>

<style type="scss">
    #slimvue {
        font-family             : 'Menlo', Helvetica, Arial, sans-serif;
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
