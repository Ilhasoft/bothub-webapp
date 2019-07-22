<template>
  <div class="bh-grid bh-grid--column">
    <bh-toast-notification
      :open="openValue"
      status="success"/>
    <bh-button
      @click="open"
    >Show</bh-button>
  </div>
</template>

<script>
export default {
  name: 'NotificationAlert',
  data() {
    return {
      openValue: true,
    };
  },
  methods: {
    open() {
      this.$bhToastNotification({
        message: 'Danger Notification',
        type: 'danger',
        time: 3000,
      });
      this.$bhToastNotification({
        message: 'Warning Notification',
        type: 'warning',
        time: 3000,
      });
      this.$bhToastNotification({
        message: 'Success notification',
        type: 'success',
        time: 5000,
      });
      this.$bhToastNotification({
        message: 'Question/Info notification',
        type: 'question',
        time: 5000,
      });
      this.openValue = !this.openValue;
    },
  },
};
</script>
