<template>
  <div>
    <nav v-if="showNav">
      <router-link to="/Dashboard">Dashboard</router-link>
    </nav>
    <router-view/>
  </div>
</template>

<script>
export default {
  computed: {
    showNav() {
      const routesWithNav = ['/dashboard',]; // Lista de rutas donde se muestra el menú
      return routesWithNav.includes(this.$route.path); 
    }
  }
}
</script>

<style>
@font-face {
  font-family: 'BudokanRounded';
  src: url('@/assets/fonts/BudokanRounded-Bold.ttf') format('truetype');
  font-weight: normal;
  font-style: normal;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #42b983;
}
</style>
