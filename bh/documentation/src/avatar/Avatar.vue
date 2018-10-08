<template>
  <bh-card class="buttons">
    <h2>Avatar</h2>
    <div class="bh-grid bh-grid--column">
      <div class="bh-grid__item">
        <h3>Examples of Avatar field</h3>
        <example
          :component="AvatarExample"
          :code="avatarExampleCode" />
      </div>
      <div class="bh-grid__item">
        <h3>Avatar Sizes</h3>
        <example
          :component="AvatarSize"
          :code="AvatarSizeCode" />
      </div>
    </div>
    <api :data="api" />
  </bh-card>
</template>

<script>
import Example from '@/Example';
import Api from '@/Api';
import AvatarExample from './examples/AvatarExample';
import avatarExampleCode from '!!raw-loader!./examples/AvatarExample';
import AvatarSize from './examples/AvatarSize';
import AvatarSizeCode from '!!raw-loader!./examples/AvatarSize';
import api from './api';


export default {
  name: 'Buttons',
  components: {
    Example,
    Api,
  },
  data() {
    return {
      AvatarExample,
      avatarExampleCode,
      AvatarSize,
      AvatarSizeCode,
      api,
    };
  },
};
</script>

<style lang="scss">
.buttons {
  padding: 1rem;
}
</style>
