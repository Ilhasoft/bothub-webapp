<template>
  <div class="bh-grid bh-grid--column">
    <div class="bh-grid__item">
      <h2>Colors</h2>
      <h3>Color palette</h3>
      <example
        :component="ColorPalette"
        :code="colorPaletteCode" />
      <h3>Contrast</h3>
      <example
        :component="ContrastColors"
        :code="contrastColorsCode" />
    </div>
  </div>
</template>

<script>
import Example from '@/Example';

import ColorPalette from './examples/ColorPalette';
import colorPaletteCode from '!!raw-loader!./examples/ColorPalette';
import ContrastColors from './examples/Contrast';
import contrastColorsCode from '!!raw-loader!./examples/Contrast';


export default {
  name: 'Colors',
  components: {
    Example,
  },
  data() {
    return {
      ColorPalette,
      colorPaletteCode,
      ContrastColors,
      contrastColorsCode,
    };
  },
};
</script>
