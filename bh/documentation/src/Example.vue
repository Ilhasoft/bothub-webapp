<template>
  <bh-card>
    <div class="bh-grid">
      <div class="bh-grid__item">
        <div :is="component" />
        <pre v-highlightjs="code"><code :class="codeClass" /></pre>
      </div>
    </div>
  </bh-card>
</template>

<script>
export default {
  name: 'Example',
  props: {
    component: {
      type: Object,
      required: true,
    },
    code: {
      type: String,
      required: true,
    },
    codeClass: {
      type: String,
      default: 'html',
    },
  },
};
</script>
