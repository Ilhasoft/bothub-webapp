<template>
  <div class="blue">
    <div class="bh-grid">
      <div class="bh-grid__item bh-grid__item--nested purple item">Nested A</div>
    </div>
    <div class="bh-grid">
      <div class="bh-grid__item bh-grid__item--nested green item">Nested B</div>
      <div class="bh-grid__item red item">A</div>
      <div class="bh-grid__item red item">B</div>
      <div class="bh-grid__item red item">C</div>
      <div class="bh-grid__item bh-grid__item--nested green item">Nested C</div>
    </div>
    <div class="bh-grid">
      <div class="bh-grid__item bh-grid__item--nested pink item">Nested D</div>
      <div class="bh-grid__item red item">D</div>
      <div class="bh-grid__item bh-grid__item--nested pink item">Nested E</div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'NestedItem',
};
</script>
