<template>
  <nav class="header">
    <div class="bh-grid item">
      <div class="bh-grid__item">
        <h1>BH Documentation</h1>
        <p>Everything you need to know about BH</p>
        <bh-icon
          size="medium"
          value="botinho" />
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  name: 'HeaderComponent',
};
</script>

<style lang="scss">
.header {
  background-color: #00d1b2;
  color: white;
}
</style>
