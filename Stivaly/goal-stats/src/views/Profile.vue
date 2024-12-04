<template>
  <div class="container-fluid">
    <div
      class="mt-4 page-header min-height-200 border-radius-xl"
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
          <div class="col-auto my-auto">
          <div class="w-100 text-center">
            <h5 class="mb-1">{{ this.selectedUser.nombre }} {{ this.selectedUser.apellido }}</h5>
            <p class="mb-0 text-md font-weight-bold">{{ this.selectedDisciplina.nombre_disciplina }}</p>
          </div>
          </div>
          <div class="avatar avatar-custom position-relative">
            <img
              src="@/assets/img/3D-Player.png"
              alt="profile_image"
              class="shadow-sm h-100 border-radius-lg"
              style="object-position: top;"
            />
          </div>
        </div>
        
        <div
          class="mt-7 ms-6 col-auto text-start justify-content-center align-items-center"
        >
        <div class="d-flex align-items-center justify-content-between">

          <h6 class="mb-0">Métricas</h6>
          <soft-button
            type="button"
            color="primary"
            variant="gradient"
            class="btn my-3 mb-2"
            @click="submitForm"
            > Agregar Nueva Métrica </soft-button>
        </div>
        
        <div class="table-responsive">
          <table class="table border border-secondary-subtle  mt-3">
            <thead class="">
              <tr>
                <th class="text-center">Metros <br>Recorridos</th>
                <th class="text-center">Goles <br>Anotados</th>
                <th class="text-center">Pases <br>Interceptados</th>
                <th class="text-center">Pases <br>Exitosos</th>
                <th class="text-center">Puntuación <br>de Rendimiento</th>
                <th class="text-center">Posición <br>Sugerida</th>
                <th class="text-center">Fecha <br>del Partido</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="metric in metrics" :key="metric.id">
                <td class="text-center" >{{ metric.meters_covered }} m</td>
                <td class="text-center">{{ metric.goals_scored }}</td>
                <td class="text-center">{{ metric.intercepted_passes }}</td>
                <td class="text-center">{{ metric.successful_passes }}</td>
                <td class="text-center">{{ metric.performance_score || 'Sin Información' }}</td>
                <td class="text-center">{{ metric.suggested_position || 'Sin Información' }}</td>
                <td class="text-center">{{ formatDate(metric.match_date) }}</td>
              </tr>
            </tbody>
          </table>    
        </div>
      </div>
      </div>
    </div>
  </div>
  <div class="py-4 container-fluid">
    <div class="mt-3 row">
      <div class="mt-4 col-12 offset-md-3 col-md-6 offset-xl-3 col-xl-6 mt-md-0">
        <profile-info-card
          title="Información del Jugador"
          description="Talentoso lateral derecho conocido por su velocidad y capacidad para anticiparse a las jugadas. Comenzó su carrera en la academia juvenil de su ciudad natal, donde rápidamente destacó por su entrega en el campo y su habilidad para crear oportunidades ofensivas desde la defensa. A los 18 años, fue fichado por el equipo de segunda división FC Highlands, donde se consolidó como titular en su primera temporada y ayudó al equipo a ganar el ascenso a la primera división."
          :info="{
            fullName: this.selectedUser.nombre,
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
import SoftButton from '../components/SoftButton.vue';
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
import MetricsService from '@/assets/js/metricsService.js';
import axios from 'axios';

axios.defaults.withCredentials = false;
axios.defaults.baseURL = 'https://goalstats-api.onrender.com/api'

const metricsService = new MetricsService();

export default {
  name: "ProfileOverview",
  components: {
    // SoftSwitch,
    ProfileInfoCard,
    // SoftAvatar,
    // DefaultProjectCard,
    // PlaceHolderCard,
    SoftButton,
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
      user: '',
      selectedUser: {},
      selectedDisciplina: {},
      disciplinas: [],
      metrics: {},
      loading: true,
    };
  },
  methods:{
    formatDate(dateString) {

      const date = new Date(dateString);

      const options = { year: 'numeric', month: 'long', day: 'numeric' };

      return date.toLocaleDateString('es-ES', options);
    },
  },
  async mounted() {
    this.$store.state.isAbsolute = true;
    setNavPills();
    setTooltip(this.$store.state.bootstrap);
    try {

    const [response1, response2] = await Promise.all([
      axios.get('https://goalstats-api.onrender.com/api/disciplines/'),
      axios.get('https://goalstats-api.onrender.com/api/users/'),
    ]);
    
    const disciplinas = response1.data;
    const users = response2.data;
    
    // Buscar el usuario con el nombre de usuario almacenado en localStorage
    const user = users.find(user => user.username === this.username);
    this.metrics = await metricsService.getMetricsByAthlete(21);
    console.log('Métricas del jugador:', this.metrics);
    
    if (user) {
      console.log('Usuario encontrado:', user);
      this.selectedUser = user;
      console.log('Usuario seleccionado:', this.selectedUser);
      // Buscar la disciplina correspondiente según el ID almacenado en el usuario
      const disciplina = disciplinas.find(d => d.id === user.nombre_disciplina);

      if (disciplina) {
        this.selectedDisciplina = disciplina;
        console.log('Disciplina seleccionada:', this.selectedDisciplina);
      } else {
        console.error('No se encontró la disciplina correspondiente para el usuario');
      }

    } else {
      console.error('Usuario no encontrado');
    }
    } catch (error) {
      console.error('Error al obtener los datos', error);
    }


    
  },
  beforeUnmount() {
    this.$store.state.isAbsolute = false;
  },

};
</script>
