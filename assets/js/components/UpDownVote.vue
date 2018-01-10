<template>
    <div class="up-down-vote">
        <div class="vote-button" v-on:click="vote('UP')"><img src="/static/images/components/up_down_vote/arrow.png" alt=""></div>
        <div class="reputation-value">{{reputation}}</div>
        <div class="vote-button arrow-down" v-on:click="vote('DOWN')"><img src="/static/images/components/up_down_vote/arrow.png" alt=""></div>
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
        width: 100%;
        height: 100%;
        margin-top: 40%;
        .reputation-value {
            font-size: 24px;
            padding: 3px;
            text-align: center;
        }
        .vote-button {
            cursor: pointer;
            img {
                margin: 0 auto;
                display: block;
                // width: 32px;
                // height: 20px;
            }
            &:hover {
                opacity: 0.6;
                transition: 0.5s;
            }
        }
        .arrow-down{
            transform: rotate(-180deg);
        }
    }
</style>
    
