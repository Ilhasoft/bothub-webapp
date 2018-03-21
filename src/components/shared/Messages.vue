<template>
  <ul v-if="list.length > 0" class="messages">
    <li
      v-for="(msg, index) in list"
      :key="index"
      :class="msg.class || 'default'"
      class="item">{{ msg.text }}</li>
  </ul>
</template>

<script>
export default {
  name: 'Messages',
  props: {
    msgs: {
      type: Array,
      required: true,
    },
  },
  computed: {
    list() {
      return this.msgs.map(msg => (typeof msg === 'object' ? msg : { text: msg }));
    },
  },
};
</script>

<style lang="scss" scoped>
  .messages {
    padding: 0;
    margin: 8px 0;
    list-style: none;
    border-radius: 16px;
    overflow: hidden;

    .item {
      padding: 8px 16px;
      text-align: left;
      font-size: 18px;
      font-weight: bold;
      color: black;

      &.default {
        background-color: #eeeeee;
      }
      &.success {
        background-color: green;
        color: white;
      }
      &.error {
        background-color: red;
        color: white;
      }
      &.warning {
        background-color: yellow;
      }
    }
  }
</style>

