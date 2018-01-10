<template>
  <div class="bot-card">
    {{card.bot_name}}
  </div>
</template>
<script>
export default {
  name: 'card',
  props: {
    card: {
      type: Object,
      required: true
    }
  },
  mounted() {
  },
  methods:{
  }
}
</script>
<style>
  .bot-card{
      width: 80%;
      background: red;
      border-radius: 25px;
      padding: 25px;
      height: 160px;
  }
</style>