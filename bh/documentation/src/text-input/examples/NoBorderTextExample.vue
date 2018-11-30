<template>
  <div class="background">
    <div class="bh-grid--column">
      <div class="bh-grid__item">
        <bh-text
          v-model="value"
          no-border
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
  </div>
</template>

<script>
export default {
  name: 'NoBorderTextExample',
  data() {
    return {
      value: '',
    };
  },
};
</script>

<style lang="scss">

.background {
  padding: 1rem;
  background-color: #dddddd;
}
</style>
