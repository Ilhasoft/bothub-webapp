<template>
  <div class="topbar">

    <div class="topbar-brand">
      <img src="../assets/images/logo-white.svg" alt="Logo BotHub">
    </div>

    <div class="topbar-action-buttom">
      <a href="#" class="btn">Start your bot</a>
    </div>

    <div class="topbar-avatar">
      <img src="../assets/images/man.png" alt="Avatar">
    </div>
  </div>
</template>

<script>

</script>

<style scoped lang="scss">
  @import '../assets/scss/_colors';
  .topbar {
    background-color: transparent;
    position: relative;
    display: flex;
    align-items: center;
    height: 60px;
  }
  .topbar-brand {
    width: 140px;
    position: relative;
    left: 30px;
    img  {
      width: 140px;
    }
  }
  .topbar-action-buttom {
    position: absolute;
    right: 90px;
    .btn {
      color: $dark-green2;
      padding: 10px 20px;
      text-transform: none;
      font-size: 14px;
      background-color: $light-green;
      border-color: $light-green;
    }
  }
  .topbar-avatar {
    width: 44px;
    height: 44px;
    overflow: hidden;
    border-radius: 100%;
    position: absolute;
    right: 30px;
    img {
      width: 100%;
      object-fit: cover;
    }
  }
</style>
