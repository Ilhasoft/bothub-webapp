<template>
  <div class="bh-grid bh-grid--column">
    <div class="bh-grid__item">
      <h2>Grid</h2>
      <h3>Simple grid</h3>
      <example
        :component="SimpleGrid"
        :code="simpleGridCode" />
      <h3>Multiline grid</h3>
      <example
        :component="MultilineGrid"
        :code="multilineGridCode" />
      <h3>Grow item</h3>
      <example
        :component="GrowItem"
        :code="growItemCode" />
      <h3>Nested item</h3>
      <example
        :component="NestedItem"
        :code="nestedItemCode" />
      <h3>Half Gap</h3>
      <example
        :component="HalfGap"
        :code="halfGapCode" />
      <h3>Space Between</h3>
      <example
        :component="SpaceBetween"
        :code="spaceBetweenCode" />
      <h3>Inline Grid</h3>
      <example
        :component="InlineGridExample"
        :code="inlineGridExampleCode" />
    </div>
  </div>
</template>

<script>
import Example from '@/Example';
import SimpleGrid from './examples/SimpleGrid';
import simpleGridCode from '!!raw-loader!./examples/SimpleGrid';
import MultilineGrid from './examples/MultilineGrid';
import multilineGridCode from '!!raw-loader!./examples/MultilineGrid';
import GrowItem from './examples/GrowItem';
import growItemCode from '!!raw-loader!./examples/GrowItem';
import NestedItem from './examples/NestedItem';
import nestedItemCode from '!!raw-loader!./examples/NestedItem';
import HalfGap from './examples/HalfGap';
import halfGapCode from '!!raw-loader!./examples/HalfGap';
import SpaceBetween from './examples/SpaceBetween';
import spaceBetweenCode from '!!raw-loader!./examples/SpaceBetween';
import InlineGridExample from './examples/InlineGrid';
import inlineGridExampleCode from '!!raw-loader!./examples/InlineGrid';


export default {
  name: 'Grid',
  components: {
    Example,
  },
  data() {
    return {
      SimpleGrid,
      simpleGridCode,
      MultilineGrid,
      multilineGridCode,
      GrowItem,
      growItemCode,
      NestedItem,
      nestedItemCode,
      HalfGap,
      halfGapCode,
      SpaceBetween,
      spaceBetweenCode,
      InlineGridExample,
      inlineGridExampleCode,
    };
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
  'turquoise',
  'MediumAquaMarine'
);

@each $color in $colors {
  .#{$color} {
    background-color: #{$color};
    color: white;
    font-weight: bolder;

    &.item {
      padding: 1rem;
      text-align: center;
      border-radius: 0.5rem;
    }
  }
}
</style>
