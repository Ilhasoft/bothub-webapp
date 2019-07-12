<template>
  <div class="bh-grid bh-grid--column">
    <bh-notification-wrapper>
      <bh-toast-notification
      :open="openValue"
      status="success">
      </bh-toast-notification>
    </bh-notification-wrapper>

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
      openValue: true
    };
  },
  methods: {
    open() {
      console.log(this);

      this.openValue = !this.openValue;
    }
  }
};
</script>
