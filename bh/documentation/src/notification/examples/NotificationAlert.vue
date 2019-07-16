<template>
  <div class="bh-grid bh-grid--column">
    <bh-toast-notification
      :open="openValue"
      status="success"/>

    <!-- <bh-toast-notification
    :open="openValue"
    status="success">
    </bh-toast-notification>
     <bh-toast-notification
    :open="openValue"
    status="info">
    </bh-toast-notification>
     <bh-toast-notification
    :open="openValue"
    status="danger">
    </bh-toast-notification> -->

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
        message: ' CuidadoCuidado CuidadoCuidadoCuidadoCuidado',
        type: 'danger',
        time: 3000,
      });
      this.$bhToastNotification({
        message: ' CuidadoCuidado CuidCuidado',
        type: 'warning',
        time: 3000,
      });
      this.$bhToastNotification({
        message: ' CuidadoCuidado ',
        type: 'success',
        time: 5000,
      });

      this.openValue = !this.openValue;
    },
  },
};
</script>
