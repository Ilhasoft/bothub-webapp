<template>
  <div>
    <h2>Avatar</h2>
    <h3>Examples of Avatar field</h3>
    <example
      :component="AvatarExample"
      :code="avatarExampleCode" />
    <h3>Sizes</h3>
    <example
      :component="AvatarSize"
      :code="avatarSizeCode" />
    <api :data="api" />
  </div>
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
