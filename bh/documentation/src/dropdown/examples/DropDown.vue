<template>
  <div class="bh-grid">
    <div
      class="bh-grid__item item"
      shadow="shaded">
      <h5>Choose your category</h5>
      <div>
        <bh-dropdown
          title="All categories"
          position="left">
          <bh-dropdown-item>Communication</bh-dropdown-item>
          <bh-dropdown-item>Commerce</bh-dropdown-item>
          <bh-dropdown-item>Tools</bh-dropdown-item>
          <bh-dropdown-item>Finance</bh-dropdown-item>
        </bh-dropdown>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SlotDropDownExample',
};
</script>
