<template>
    <div class="up-down-vote">
        <div class="vote-button" v-on:click="vote('UP')">UP ICON</div>
        <div>{{reputation}}</div>
        <div class="vote-button" v-on:click="vote('DOWN')">DOWN ICON</div>
    </div>
</template>
<script>
    export default {
        props:{
            reputation: {
                type: Number,
                required: true
            }
        },
        methods:{
            vote(option){
                if(option == 'UP'){
                    this.reputation += 1
                }else{
                    this.reputation -= 1
                }
            }
        }
    }
</script>
<style lang="less">
    .up-down-vote {
        .vote-button {
            cursor: pointer;
            &:hover {
                color:blue;
            }
        }
    }
</style>
    
