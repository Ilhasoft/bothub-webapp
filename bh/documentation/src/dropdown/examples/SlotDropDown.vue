<template>
  <div class="bh-grid">
    <bh-card
      class="bh-grid__item item"
      shadow="shaded">
      <h5>Drop Item to left side of dropdown</h5>
      <div>
        <bh-dropdown position="left">
          <bh-icon-button
            slot="trigger"
            value="dots-horizontal"
            size="large" />
          <bh-dropdown-item >Edit</bh-dropdown-item>
          <bh-dropdown-item >Remove</bh-dropdown-item>
        </bh-dropdown>
      </div>
    </bh-card>
    <bh-card
      class="bh-grid__item item"
      shadow="shaded">
      <h5>Drop Item to right side of dropdown</h5>
      <div>
        <bh-dropdown>
          <bh-icon-button
            slot="trigger"
            value="dots-horizontal"
            size="large" />
          <bh-dropdown-item>Edit</bh-dropdown-item>
          <bh-dropdown-item>Remove</bh-dropdown-item>
        </bh-dropdown>
      </div>
    </bh-card>
  </div>
</template>

<script>
export default {
  name: 'SlotDropDownExample',
};
</script>
