<template>
  <bh-card class="bh-grid">
    <div class="bh-grid__item">
      <h2>Avatar</h2>
    </div>
    <div class="bh-grid__item">
      <h3>Examples of Avatar field</h3>
      <example
        :component="AvatarExample"
        :code="avatarExampleCode" />
    </div>
    <div class="bh-grid__item">
      <h3>Sizes</h3>
      <example
        :component="AvatarSize"
        :code="avatarSizeCode" />
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
import avatarSizeCode from '!!raw-loader!./examples/AvatarSize';
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
      avatarSizeCode,
      api,
    };
  },
};
</script>
