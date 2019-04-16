<template>
  <div>
    <button @click="openNav()">active</button>
    <div
      id="mySidenav"
      class="sidenav">
      <a
        href="javascript:void(0)"
        class="closebtn"
        @click="closeNav()">&times;</a>
      <a href="#">About</a>
      <a href="#">Services</a>
      <a href="#">Clients</a>
      <a href="#">Contact</a>
    </div>
  </div>
</template>
<script>
export default {
  name: 'VsSidebar',
  methods: {
    openNav() {
      document.getElementById('mySidenav').style.width = '250px';
    },
    closeNav() {
      document.getElementById('mySidenav').style.width = '0';
    },
  },
};
</script>
<style lang="scss">
.sidenav {
  height: 100%;
  width: 0;
  position: fixed;
  z-index: 10;
  top: 0;
  left: 0;
  background-color: rgb(223, 219, 219);
  overflow-x: hidden;
  transition: 0.5s;
  padding-top: 60px;
}

.sidenav a {
  padding: 8px 8px 8px 32px;
  text-decoration: none;
  font-size: 25px;
  color: #818181;
  display: block;
  transition: 0.3s;
}

.sidenav a:hover {
  color: #f1f1f1;
}

.sidenav .closebtn {
  position: absolute;
  top: 0;
  right: 25px;
  font-size: 36px;
  margin-left: 50px;
}

@media screen and (max-height: 450px) {
  .sidenav {padding-top: 15px;}
  .sidenav a {font-size: 18px;}
}
</style>
