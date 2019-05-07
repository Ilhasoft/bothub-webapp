<template>
  <div>
    <bh-highlighted-pre
      :code-class="codeClass"
      :code="code" />
    <div>
      <bh-text v-model="codeClass" />
    </div>
    <div>
      <bh-textarea v-model="code" />
    </div>
  </div>
</template>

<script>
export default {
  name: 'MutablePreExample',
  data() {
    return {
      codeClass: 'python',
      code: 'import time\ntime.sleep(3)\nprint("hi")',
    };
  },
};
</script>
