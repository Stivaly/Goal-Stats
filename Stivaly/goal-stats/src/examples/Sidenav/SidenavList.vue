<template>
  <div
    class="w-auto h-auto collapse navbar-collapse max-height-vh-100 h-100"
    id="sidenav-collapse-main"
  >
    <ul class="navbar-nav">
      <li class="nav-item">
        <sidenav-collapse navText="Dashboard" :to="{ name: 'Dashboard' }">
          <template #icon>
            <shop />
          </template>
        </sidenav-collapse>
      </li>
      
      <li class="nav-item">
        <sidenav-collapse navText="Usuarios" :to="{ name: 'Usuarios' }">
          <template #icon>
            <People />
          </template>
        </sidenav-collapse>
      </li>
      <li class="nav-item">
        <sidenav-collapse navText="Perfil" :to="{ name: 'Profile' }">
          <template #icon>
            <customer-support />
          </template>
        </sidenav-collapse>
      </li>
      <li class="mt-3 nav-item">
        <h6
          class="text-xs ps-4 text-uppercase font-weight-bolder opacity-6"
          :class="this.$store.state.isRTL ? 'me-4' : 'ms-2'"
        >
        </h6>
      </li>
    </ul>
  </div>
  <div class="text-center sidenav-footer">
    <soft-button
      type="button"
      class="my-4 mb-2"
      variant="gradient"
      id="logout"
      color="danger"
      full-width
      @click="logout"
      >Cerrar Sesión
    </soft-button>
  </div>
</template>
<script>
import SidenavCollapse from "./SidenavCollapse.vue";
// import SidenavCard from "./SidenavCard.vue";
import Shop from "../../components/Icon/Shop.vue";
// import Office from "../../components/Icon/Office.vue";
import People from "../../components/Icon/People.vue";
// import CreditCard from "../../components/Icon/CreditCard.vue";
// import Box3d from "../../components/Icon/Box3d.vue";
import CustomerSupport from "../../components/Icon/CustomerSupport.vue";
// import Document from "../../components/Icon/Document.vue";
// import Spaceship from "../../components/Icon/Spaceship.vue";
// import Settings from "../../components/Icon/Settings.vue";
import SoftButton from "../../components/SoftButton.vue";

export default {
  name: "SidenavList",
  props: {
    cardBg: String,
  },
  data() {
    return {
      title: "GOAL STATS",
      controls: "dashboardsExamples",
      isActive: "active",
    };
  },
  components: {
    SidenavCollapse,
    // SidenavCard,
    Shop,
    // Office,
    People,
    // CreditCard,
    // Box3d,
    CustomerSupport,
    SoftButton,
    // Document,
    // Spaceship,
    // Settings,
  },
  methods: {
    getRoute() {
      const routeArr = this.$route.path.split("/");
      return routeArr[1];
    },
    logout() {
        // Elimina el token y la fecha de expiración de localStorage
        localStorage.removeItem('authToken');
        localStorage.removeItem('tokenExpiration');
  
        console.log('El usuario ha cerrado sesión y el token ha sido destruido.');
  
        // Redirige al usuario a la página de inicio de sesión
        this.$router.push('/sign-in'); // Asegúrate de que la ruta sea correcta
    },
  },
};
</script>
<style scoped>
/* Ensures the sidebar and footer are stacked correctly */
#sidenav-collapse-main {
  display: flex;
  flex-direction: column;
  flex-grow: 1;
}

.sidenav-footer {
  padding: 1rem;
  text-align: center;
}
</style>