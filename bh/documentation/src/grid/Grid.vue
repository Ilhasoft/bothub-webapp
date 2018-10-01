<template>
  <div>
    <h2>Grid</h2>
    <h3>Simple grid</h3>
    <simple-grid />
    <h3>Multiline grid</h3>
    <multiline-grid />
    <h3>Grow item</h3>
    <grow-item />
    <h3>Nested item</h3>
    <nested-item />
    <h3>Half Gap</h3>
    <half-gap />
  </div>
</template>

<script>
import SimpleGrid from './examples/SimpleGrid';
import MultilineGrid from './examples/MultilineGrid';
import GrowItem from './examples/GrowItem';
import NestedItem from './examples/NestedItem';
import HalfGap from './examples/HalfGap';


export default {
  name: 'Grid',
  components: {
    SimpleGrid,
    MultilineGrid,
    GrowItem,
    NestedItem,
    HalfGap,
  },
};
</script>

<style lang="scss">
$colors: (
  'red',
  'green',
  'blue',
  'pink',
  'purple',
);

@each $color in $colors {
  .#{$color} {
    background-color: #{$color};
    color: white;
    font-weight: bolder;

    &.item {
      padding: 1rem;
      text-align: center;
    }
  }
}
</style>
