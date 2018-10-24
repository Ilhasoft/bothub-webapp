<template>
  <div class="bh-grid bh-grid--column">
    <div class="bh-grid__item">
      <h2>Colors</h2>
      <h3>Colors palette</h3>
      <example
        :component="ColorsPalette"
        :code="colorsPaletteCode" />
      <h3>Contrast</h3>
      <example
        :component="ContrastColors"
        :code="contrastColorsCode" />
    </div>
  </div>
</template>

<script>
import Example from '@/Example';

import ColorsPalette from './examples/ColorsPalette';
import colorsPaletteCode from '!!raw-loader!./examples/ColorsPalette';
import ContrastColors from './examples/Contrast';
import contrastColorsCode from '!!raw-loader!./examples/Contrast';


export default {
  name: 'Colors',
  components: {
    Example,
  },
  data() {
    return {
      ColorsPalette,
      colorsPaletteCode,
      ContrastColors,
      contrastColorsCode,
    };
  },
};
</script>
