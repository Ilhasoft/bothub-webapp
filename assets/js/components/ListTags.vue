<template>
  <div class="list-tags">
      <div class="tag" :key="i" v-for="(tag, i) in tags">
          {{tag}}
      </div>
      <div class="tag">
          ...
      </div>
  </div>
</template>
<script>
    export default {
        props:{
            tags: {
                type: Array,
                required: true
            }
        }
    }
</script>

<style lang="less">
    .list-tags{
        display: inline-block;
        .tag{
            font-size: 12px; 
            display: inline-block;
            margin-right: 10px;
            border-radius: 12px;
            padding: 8px;
            color: #434343;
            background-color: #EDECED;
        }
    }
</style>
