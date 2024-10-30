<template>
  <div class="container-fluid">
    <div
      class="mt-4 page-header min-height-300 border-radius-xl"
      :style="{
        backgroundImage:
          'url(' + require('@/assets/img/curved-images/curved14.jpg') + ')',
        backgroundPositionY: '50%',
      }"
    >
      <span class="mask bg-gradient-primary opacity-6"></span>
    </div>
    <div class="mx-4 overflow-hidden card card-body blur shadow-blur mt-n6">
      <div class="row gx-4">
        <div class="col-auto">
          <div class="avatar avatar-xl position-relative">
            <img
              src="@/assets/img/3D-Player2.png"
              alt="profile_image"
              class="shadow-sm w-100 border-radius-lg"
              style="object-position: top;"
            />
          </div>
        </div>
        <div class="col-auto my-auto">
          <div class="h-100">
            <h5 class="mb-1">Alec Thompson</h5>
            <p class="mb-0 text-sm font-weight-bold">Entrenador</p>
          </div>
        </div>
        <div
          class="mx-auto mt-3 col-lg-4 col-md-6 my-sm-auto ms-sm-auto me-sm-0"
        >
          <div class="nav-wrapper position-relative end-0">
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="py-4 container-fluid">
    <div class="mt-3 row">
      <div class="mt-4 col-12 col-md-6 offset-xl-3 col-xl-6 mt-md-0">
        <profile-info-card
          title="Información del Jugador"
          description="Talentoso lateral derecho conocido por su velocidad y capacidad para anticiparse a las jugadas. Comenzó su carrera en la academia juvenil de su ciudad natal, donde rápidamente destacó por su entrega en el campo y su habilidad para crear oportunidades ofensivas desde la defensa. A los 18 años, fue fichado por el equipo de segunda división FC Highlands, donde se consolidó como titular en su primera temporada y ayudó al equipo a ganar el ascenso a la primera división."
          :info="{
            fullName: 'Alec M. Thompson',
            mobile: '(44) 123 1234 123',
            email: 'alecthompson@mail.com',
            location: 'CHILE',
          }"
          :social="[
            {
              link: 'https://www.facebook.com/CreativeTim/',
              icon: faFacebook,
            },
            {
              link: 'https://twitter.com/creativetim',
              icon: faTwitter,
            },
            {
              link: 'https://www.instagram.com/creativetimofficial/',
              icon: faInstagram,
            },
          ]"
          :action="{
            route: 'javascript:;',
            tooltip: 'Edit Profile',
          }"
        />
      </div>
    </div>
  </div>
</template>

<script>
// import SoftSwitch from "@/components/SoftSwitch.vue";
import ProfileInfoCard from "./components/ProfileInfoCard.vue";
// import SoftAvatar from "@/components/SoftAvatar.vue";
import sophie from "@/assets/img/kal-visuals-square.jpg";
import marie from "@/assets/img/marie.jpg";
import ivana from "@/assets/img/ivana-square.jpg";
import peterson from "@/assets/img/team-4.jpg";
import nick from "@/assets/img/team-3.jpg";
import img1 from "@/assets/img/home-decor-1.jpg";
import img2 from "@/assets/img/home-decor-2.jpg";
import img3 from "@/assets/img/home-decor-3.jpg";
import team1 from "@/assets/img/team-1.jpg";
import team2 from "@/assets/img/team-2.jpg";
import team3 from "@/assets/img/team-3.jpg";
import team4 from "@/assets/img/team-4.jpg";
import {
  faFacebook,
  faTwitter,
  faInstagram,
} from "@fortawesome/free-brands-svg-icons";
// import DefaultProjectCard from "./components/DefaultProjectCard.vue";
// import PlaceHolderCard from "@/examples/Cards/PlaceHolderCard.vue";
import setNavPills from "@/assets/js/nav-pills.js";
import setTooltip from "@/assets/js/tooltip.js";
import axios from 'axios';

axios.defaults.withCredentials = false;
axios.defaults.baseURL = 'https://goalstats-api.onrender.com/api'

export default {
  name: "ProfileOverview",
  components: {
    // SoftSwitch,
    ProfileInfoCard,
    // SoftAvatar,
    // DefaultProjectCard,
    // PlaceHolderCard,
  },
  data() {
    return {
      showMenu: false,
      sophie,
      marie,
      ivana,
      peterson,
      nick,
      img1,
      team1,
      team2,
      team3,
      team4,
      img2,
      img3,
      faFacebook,
      faTwitter,
      faInstagram,
      username: localStorage.getItem('username'),
      users: [],
      user: {},
    };
  },

  async mounted() {
    this.$store.state.isAbsolute = true;
    setNavPills();
    setTooltip(this.$store.state.bootstrap);
    try {
      const response = await axios.get('https://goalstats-api.onrender.com/api/users/');
      const users = response.data; 
      const user = users.find(user => user.username === this.username);
      
      if (user) {
        console.log('Usuario encontrado:', user);
        // Aquí puedes trabajar con el usuario encontrado
      } else {
        console.log('Usuario no encontrado');
      }
    } catch (error) {
      console.error('Error al obtener nombre de usuario', error);
    }; 
    
  },
  beforeUnmount() {
    this.$store.state.isAbsolute = false;
  },

};
</script>
