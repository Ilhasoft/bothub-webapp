<template>
  <bh-card class="bh-grid">
    <div class="bh-grid__item">
      <h2>Notifications</h2>
    </div>
    <div class="bh-grid__item">
      <example
        :component="NotificationExample"
        :code="notificationExampleCode" />
    </div>
    <div class="bh-grid__item">
      <api :data="api" />
    </div>
  </bh-card>
</template>

<script>
import Example from '@/Example';
import Api from '@/Api';
import NotificationExample from './examples/NotificationExample';
import notificationExampleCode from '!!raw-loader!./examples/NotificationExample';
import api from './api';


export default {
  name: 'Autocomplete',
  components: {
    Example,
    Api,
  },
  data() {
    return {
      NotificationExample,
      notificationExampleCode,
      api,
    };
  },
};
</script>
