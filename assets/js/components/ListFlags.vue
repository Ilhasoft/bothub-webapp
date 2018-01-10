<template>
    <span>
        <span :key="i" v-for="(flag, i) in flags">
            <img class="flag" :src="'/static/images/components/flags/'+flag+'.png'" alt="">
        </span>
    </span>
</template>

<script>
    export default {
        props: {
            flags: {
                type: Array,
                required: true
            }
        }
    }
</script>

<style lang="less">
    .flag {
        width: 20.1px;
        height: 20.1px;
        margin-right: 6px;
    }
</style>
