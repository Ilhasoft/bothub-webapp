<template>
  <div>
    <div class="bh-grid bh-grid--column">
      <div class="bh-grid__item">
        <h2>Notifications</h2>
        <example
          :component="NotificationExample"
          :code="notificationExampleCode" />
      </div>
    </div>
    <div class="bh-grid bh-grid--column">
      <div class="bh-grid__item">
        <h2>Notifications Alert</h2>
        <example
          :component="NotificationAlertExample"
          :code="NotificationAlertExampleCode" />
      </div>
    </div>
  </div>
</template>

<script>
import Example from '@/Example';
import Api from '@/Api';
import NotificationAlertExample from './examples/NotificationAlert';
import NotificationAlertExampleCode from '!!raw-loader!./examples/NotificationAlert';
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
      NotificationAlertExample,
      NotificationAlertExampleCode,
      NotificationExample,
      notificationExampleCode,
    };
  },
};
</script>
