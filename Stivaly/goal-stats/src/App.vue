<template>
  <div>
    <div class="wrapper">
      <aside id="sidebar" class="w-auto" v-if="showNav">
        <div class="d-flex flex-column">
          <router-link id="toggle-btn" class="sidebar-link-logo" to="/dashboard/" @click="toggleSidebar">
            <img :src="image" alt="" width="50" height="50">
            <span class="btn" style="font-size: 25px;">GOAL STATS</span> 
          </router-link>         
        </div>
        <ul class="sidebar-nav">
            <li class=" sidebar-item">
              <router-link id="toggle-btn" class="btn sidebar-link" to="/dashboard/">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-person" viewBox="0 0 16 16">
                  <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6m2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0m4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4m-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10s-3.516.68-4.168 1.332c-.678.678-.83 1.418-.832 1.664z"/>
                </svg>
                <span class="ms-3">Usuarios</span>
              </router-link>
            </li>
            <li class="sidebar-item">
              <router-link id="toggle-btn" to="/dashboard/" class="btn sidebar-link">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-bar-chart-fill" viewBox="0 0 16 16">
                  <path d="M1 11a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v3a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1zm5-4a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v7a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1zm5-5a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1h-2a1 1 0 0 1-1-1z"/>
                </svg>
                <span class="ms-3">Estadísticas</span>
              </router-link>
            </li>
            <li>
              <router-link id="toggle-btn" to="/dashboard/" class="btn sidebar-link">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-file-earmark-text" viewBox="0 0 16 16">
                  <path d="M5.5 7a.5.5 0 0 0 0 1h5a.5.5 0 0 0 0-1zM5 9.5a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5m0 2a.5.5 0 0 1 .5-.5h2a.5.5 0 0 1 0 1h-2a.5.5 0 0 1-.5-.5"/>
                  <path d="M9.5 0H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V4.5zm0 1v2A1.5 1.5 0 0 0 11 4.5h2V14a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1z"/>
                </svg>
                <span class="ms-3">Cargar Mis Datos</span>
              </router-link>
            </li>

            <li class="sidebar-item">
              <router-link id="toggle-btn" to="/dashboard/" class="btn sidebar-link gap-3">
                <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 20 20"><path fill="currentColor" d="m10 9.293l1.083-1.083c-.439-.556-.785-1.246-1.062-1.964c-.345-.897-.594-1.877-.774-2.777l-.08-.42a6.97 6.97 0 0 0-3.75 1.66zm1.79-.376L10.707 10l4.584 4.584a6.97 6.97 0 0 0 1.66-3.75l-.418-.079c-.9-.18-1.88-.43-2.777-.775c-.719-.276-1.41-.623-1.966-1.063m5.208.91a6.98 6.98 0 0 0-1.707-4.41l-2.788 2.787c.43.32.983.601 1.612.843c.826.318 1.747.554 2.614.728zm-5.202-2.33l2.788-2.788a6.98 6.98 0 0 0-4.41-1.707l.053.27c.174.868.41 1.789.728 2.615c.241.628.521 1.18.841 1.61M10 10.706l-1.081 1.081c.44.556.786 1.247 1.063 1.966c.345.897.595 1.877.775 2.777q.042.213.08.42a6.97 6.97 0 0 0 3.747-1.66zM8.206 12.5l-2.79 2.79a6.98 6.98 0 0 0 4.412 1.707l-.052-.271c-.174-.868-.41-1.788-.728-2.614c-.241-.629-.522-1.181-.842-1.611m-.708-.706c-.43-.32-.982-.6-1.61-.842c-.826-.318-1.747-.555-2.614-.728l-.272-.053a6.98 6.98 0 0 0 1.707 4.412zm.713-.714L9.293 10L4.709 5.416a6.97 6.97 0 0 0-1.66 3.748q.208.038.421.08c.9.18 1.88.43 2.777.775c.718.276 1.409.623 1.964 1.062m7.446 4.576A8 8 0 1 1 4.343 4.343a8 8 0 0 1 11.314 11.314"/></svg>
                <span class="ms-3">Disciplinas</span>
              </router-link>
            </li>
          </ul>
          <div class="sidebar-footer">

            <a id="logout" class="btn sidebar-link" style="display: block;"  @click="logout">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-box-arrow-left me-1" viewBox="0 0 16 16">
                <path fill-rule="evenodd" d="M6 12.5a.5.5 0 0 0 .5.5h8a.5.5 0 0 0 .5-.5v-9a.5.5 0 0 0-.5-.5h-8a.5.5 0 0 0-.5.5v2a.5.5 0 0 1-1 0v-2A1.5 1.5 0 0 1 6.5 2h8A1.5 1.5 0 0 1 16 3.5v9a1.5 1.5 0 0 1-1.5 1.5h-8A1.5 1.5 0 0 1 5 12.5v-2a.5.5 0 0 1 1 0z"/>
                <path fill-rule="evenodd" d="M.146 8.354a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L1.707 7.5H10.5a.5.5 0 0 1 0 1H1.707l2.147 2.146a.5.5 0 0 1-.708.708z"/>
              </svg>
              <span class="ms-3">Cerrar Sesión</span>
            </a>
          </div>
      </aside>
      <div class="main">
        <router-view/>
      </div>
    </div >
    
  </div>
</template>

<script>
import image from '@/assets/images/icono_goal.svg'

export default {
  data() {
    return {
      image,
    }
  },
  methods:  {
    logout() {
      // Elimina el token y la fecha de expiración de localStorage
      localStorage.removeItem('authToken');
      localStorage.removeItem('tokenExpiration');

      console.log('El usuario ha cerrado sesión y el token ha sido destruido.');

      // Redirige al usuario a la página de inicio de sesión
      this.$router.push('/login/'); // Asegúrate de que la ruta sea correcta

    },
    toggleSidebar() {
      // Alterna la clase 'expand' en el sidebar
      const sidebar = document.querySelector("#sidebar");
      sidebar.classList.toggle("expand");
    }
  },
  computed: {
    showNav() {
      const routesWithNav = ['/dashboard/',]; // Lista de rutas donde se muestra el menú
      return routesWithNav.includes(this.$route.path); 
    }

    
  },
}
</script>

<style>
@import "@/assets/css/sidebar.css";

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
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
