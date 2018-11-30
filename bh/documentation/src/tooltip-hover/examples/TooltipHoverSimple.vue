<template>
  <div>
    <bh-tooltip-hover>
      <div slot="tooltip">This is a link</div>
      <a>Link</a>
    </bh-tooltip-hover>
    <bh-tooltip-hover direction="up">
      <div slot="tooltip">This is a icon</div>
      <bh-icon value="botinho" />
    </bh-tooltip-hover>
  </div>
</template>

<script>
export default {
  name: 'TooltipHoverSimpleExample',
};
</script>
