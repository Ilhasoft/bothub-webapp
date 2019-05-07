<template>
  <div class="bh-grid bh-grid--column">
    <div class="bh-grid__item">
      <h2>Notifications</h2>
      <example
        :component="NotificationExample"
        :code="notificationExampleCode" />
    </div>
  </div>
</template>

<script>
import Example from '@/Example';
import Api from '@/Api';
import NotificationExample from './examples/NotificationExample';
import notificationExampleCode from '!!raw-loader!./examples/NotificationExample';


export default {
  name: 'Notification',
  components: {
    Example,
    Api,
  },
  data() {
    return {
      NotificationExample,
      notificationExampleCode,
    };
  },
};
</script>
