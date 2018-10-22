<template>
  <div class="bh-grid">
    <div class="bh-grid__item">
      <h2>Typography</h2>
      <h3>Headers</h3>
      <example
        :component="HeadersTypography"
        :code="headersTypographyCode" />
      <h3>Paragraphs</h3>
      <example
        :component="ParagraphsTypography"
        :code="paragraphsTypographyCode" />
      <h3>Links and modifiers</h3>
      <example
        :component="LinksAndModifiersTypography"
        :code="linksAndModifiersTypographyCode" />
      <h3>Text Colors</h3>
      <example
        :component="TextColorsTypography"
        :code="textColorsTypographyCode" />
    </div>
  </div>
</template>

<script>
import Example from '@/Example';
import HeadersTypography from './examples/Headers';
import headersTypographyCode from '!!raw-loader!./examples/Headers';
import ParagraphsTypography from './examples/Paragraphs';
import paragraphsTypographyCode from '!!raw-loader!./examples/Paragraphs';
import LinksAndModifiersTypography from './examples/LinksAndModifiers';
import linksAndModifiersTypographyCode from '!!raw-loader!./examples/LinksAndModifiers';
import TextColorsTypography from './examples/TextColors';
import textColorsTypographyCode from '!!raw-loader!./examples/TextColors';


export default {
  name: 'Typography',
  components: {
    Example,
  },
  data() {
    return {
      HeadersTypography,
      headersTypographyCode,
      ParagraphsTypography,
      paragraphsTypographyCode,
      LinksAndModifiersTypography,
      linksAndModifiersTypographyCode,
      TextColorsTypography,
      textColorsTypographyCode,
    };
  },
};
</script>
