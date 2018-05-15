<template>
  <div class="messages">
    <div
      v-if="list.length > 0"
      v-for="(msg, index) in list"
      :key="index"
      :class="getClass(msg)">{{ msg.text }}</div>
  </div>
</template>

<script>
const notificationRelatedClass = {
  info: 'is-info',
  success: 'is-success',
  warning: 'is-warning',
  error: 'is-danger',
};

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
  methods: {
    getClass(msg) {
      const notificationClass = notificationRelatedClass[msg.class || 'info'];
      return `notification ${notificationClass}`;
    },
  },
};
</script>

<style lang="scss" scoped>
.messages {
  .notification {
    margin: 8px 0;

    &:first-child {
      margin: 0 0 8px;
    }
  }
}
</style>
