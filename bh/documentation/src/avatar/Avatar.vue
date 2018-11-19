<template>
  <div class="bh-grid bh-grid--column">
    <div class="bh-grid__item">
      <h2>Avatar</h2>
      <h3>Simple Avatar Example</h3>
      <example
        :component="AvatarExample"
        :code="avatarExampleCode" />
    </div>
    <div class="bh-grid__item">
      <h3>Avatar Sizes</h3>
      <example
        :component="AvatarSize"
        :code="avatarSizeCode" />
    </div>
    <div class="bh-grid__item">
      <h3>Avatar Image</h3>
      <example
        :component="AvatarExampleImage"
        :code="avatarExampleImageCode" />
    </div>
    <div class="bh-grid__item">
      <api :data="api" />
    </div>
  </div>
</template>

<script>
import Example from '@/Example';
import Api from '@/Api';
import AvatarExample from './examples/AvatarExample';
import avatarExampleCode from '!!raw-loader!./examples/AvatarExample';
import AvatarSize from './examples/AvatarSize';
import avatarSizeCode from '!!raw-loader!./examples/AvatarSize';
import AvatarExampleImage from './examples/AvatarExampleImage';
import avatarExampleImageCode from '!!raw-loader!./examples/AvatarExampleImage';
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
      AvatarExampleImage,
      avatarExampleImageCode,
      api,
    };
  },
};
</script>
