<template>
  <div class="bh-grid--column">
    <div class="bh-grid__item">
      <bh-text
        v-model="value"
        prepend-text="Type something">
        <div slot="append">
          <bh-icon-button
            value="chevron-right"
            size="small"
            type="submit" />
        </div>
      </bh-text>
    </div>
    <div class="bh-grid__item">
      <p>{{ value || 'Type Something..' }}</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SlotTextExample',
  data() {
    return {
      value: '',
    };
  },
};
</script>
