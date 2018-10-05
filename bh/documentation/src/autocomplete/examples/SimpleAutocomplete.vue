<template>
  <div>
    <bh-autocomplete
      :data="['Brazil', 'USA', 'Angola', 'Japan', 'Belgium', 'China']"
      placeholder="Countries" />
  </div>
</template>

<script>
export default {
  name: 'SimpleAutocomplete',
};
</script>
