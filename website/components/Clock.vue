<template>
    <div>
        <img src="~website/assets/logo.png"/>
        <div>{{ display }}</div>
    </div>
</template>
<script>
    import moment from 'moment';

    export default {
        name     : 'my-clock',
        data() {
            return {
                time : Date.now()
            };
        },
        computed : {
            display() {
                return moment(this.time).format("HH:mm:ss");
            }
        },
        created() {
            setInterval(() => {
                this.time = Date.now();
            }, 1000);
        }
    };
</script>