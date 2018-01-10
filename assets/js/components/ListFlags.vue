<template>
    <div>
        <span :key="i" v-for="(flag, i) in flags">
            <img :src="'/static/images/components/flags/'+flag+'.png'" alt="">
        </span>
    </div>
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

<style>

</style>
