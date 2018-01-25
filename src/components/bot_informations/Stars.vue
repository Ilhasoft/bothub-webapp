<template>
    <div class="stars">
      <span>{{count}} Stars</span>
      <img v-on:click="set_image()" :src="star" alt="">
    </div>
</template>

<script>
    export default {
        props: {
            count: {
                type: Number,
                required: true
            },
            status: {
                type: Boolean,
                required: true
            },
            star: {
                default: '/static/images/components/bot_informations/star.png'
            }
        },
        methods: {
            set_image(){
                // call function that change status
                this.status = !this.status
                if(this.status){
                    this.star = '/static/images/components/bot_informations/star_active.png'
                }else{
                    this.star = '/static/images/components/bot_informations/star.png'
                }
            }
        }
    }
</script>

<style lang="less">
    .stars {
        font-size: 15px;
        height: 15px;
        span {
            line-height: 15px;
            opacity: 0.39;
            font-size: 12px;
            font-weight: normal;
            font-style: normal;
            font-stretch: normal;
            line-height: normal;
            letter-spacing: normal;
            color: #000000;
        }
        img {
            width: 15px;
            height: 15px;
            vertical-align: middle;
        }
    }
</style>


