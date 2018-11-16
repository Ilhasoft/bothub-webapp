<template>
  <div class="bh-grid">
    <div
      class="bh-grid__item item"
      shadow="shaded">
      <h5>Drop Item to left side of dropdown</h5>
      <div>
        <bh-dropdown
          title="All categories"
          position="left">
          <bh-dropdown-item >Edit</bh-dropdown-item>
          <bh-dropdown-item >Remove</bh-dropdown-item>
        </bh-dropdown>
      </div>
    </div>
    <div
      class="bh-grid__item item"
      shadow="shaded">
      <h5>Drop Item to right side of dropdown</h5>
      <div>
        <bh-dropdown title="All languages">
          <bh-dropdown-item>Edit</bh-dropdown-item>
          <bh-dropdown-item>Remove</bh-dropdown-item>
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
