<template>
  <div class="bh-grid">
    <div
      class="bh-grid__item item"
      shadow="shaded">
      <h5>Normal Dropdown content size</h5>
      <div>
        <bh-dropdown
          title="All categories"
          position="bottom-left">
          <bh-dropdown-item>Edit</bh-dropdown-item>
          <bh-dropdown-item>Remove</bh-dropdown-item>
        </bh-dropdown>
      </div>
    </div>
    <div
      class="bh-grid__item item"
      shadow="shaded">
      <h5>Full Width for dropdown content</h5>
      <div>
        <bh-dropdown
          full-width
          position="bottom-left"
          title="All languages">
          <bh-dropdown-item>Edit</bh-dropdown-item>
          <bh-dropdown-item>Remove</bh-dropdown-item>
        </bh-dropdown>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SizeContentDropDownExample',
};
</script>
