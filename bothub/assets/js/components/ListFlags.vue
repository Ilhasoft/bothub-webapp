<template>
    <div>
        <span :key="i" v-for="(flag, i) in flags">
            {{flag}}
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
