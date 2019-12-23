<template>
  <div class="sidebarlink">
    <div v-if="colapse">
      <b-icon
        icon="account"
        size="is-medium" />
    </div>
    <div v-else>
      <b-menu-item
        :icon="icon"
        :label="label"
        :active="false" />
    </div>
  </div>
</template>
<script>
export default {
  name: 'SidebarLink',
  inheritAttrs: false,
  props: {
    label: String,
    icon: String,
    colapse: Boolean,
  },
};
</script>
<style>
.sidebarlink .icon i {
  height: 2rem;
  width: 2rem;
}
</style>
