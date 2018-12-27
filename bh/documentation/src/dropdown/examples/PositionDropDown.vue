<template>
  <div class="bh-grid">
    <div
      class="bh-grid__item item"
      shadow="shaded">
      <h5>Drop Item to the corner top left the side of dropdown</h5>
      <div>
        <bh-dropdown
          title="All categories"
          position="top-left">
          <bh-dropdown-item>Edit</bh-dropdown-item>
          <bh-dropdown-item>Remove</bh-dropdown-item>
        </bh-dropdown>
      </div>
    </div>
    <div
      class="bh-grid__item item"
      shadow="shaded">
      <h5>Drop Item to the corner top right the side of dropdown</h5>
      <div>
        <bh-dropdown
          position="top-right"
          title="All languages">
          <bh-dropdown-item>Edit</bh-dropdown-item>
          <bh-dropdown-item>Remove</bh-dropdown-item>
        </bh-dropdown>
      </div>
    </div>
    <div
      class="bh-grid__item item"
      shadow="shaded">
      <h5>Drop Item to the corner bottom left the side of dropdown</h5>
      <div>
        <bh-dropdown
          position="bottom-left"
          title="All languages">
          <bh-dropdown-item>Edit</bh-dropdown-item>
          <bh-dropdown-item>Remove</bh-dropdown-item>
        </bh-dropdown>
      </div>
    </div>
    <div
      class="bh-grid__item item"
      shadow="shaded">
      <h5>Drop Item to the corner bottom left the side of dropdown</h5>
      <div>
        <bh-dropdown
          position="bottom-right"
          title="All languages">
          <bh-dropdown-item>Edit</bh-dropdown-item>
          <bh-dropdown-item>Remove</bh-dropdown-item>
        </bh-dropdown>
      </div>
    </div>
    <div
      class="bh-grid__item item"
      shadow="shaded">
      <h5>Drop Item to the center and left the side of dropdown</h5>
      <div>
        <bh-dropdown
          position="left"
          title="All languages">
          <bh-dropdown-item>Edit</bh-dropdown-item>
          <bh-dropdown-item>Remove</bh-dropdown-item>
        </bh-dropdown>
      </div>
    </div>
    <div
      class="bh-grid__item item"
      shadow="shaded">
      <h5>Drop Item to the center and rigth the side of dropdown</h5>
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
  name: 'PositionDropDownExample',
};
</script>
