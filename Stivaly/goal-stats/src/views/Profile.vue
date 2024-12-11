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
      <div v-if="!showCreate" class="mx-4 overflow-hidden card card-body blur shadow-blur mt-n6">
        <div class="row gx-4">
          <div  class="col-auto" >
            <div class="col-auto my-auto">
            <div class="w-100 text-center">
              <h5 class="mb-1">{{ this.selectedUser.nombre }} {{ this.selectedUser.apellido }}</h5>
              <p class="mb-0 text-md font-weight-bold">{{ this.selectedDisciplina.nombre_disciplina }}</p>
            </div>
            </div>
            <div class="py-4 container-fluid">
              <!-- Contenedor con CSS Grid -->
              <div class="player-info-grid">
                <!-- Avatar -->
                <div class="avatar-container">
                  <div class="avatar avatar-custom position-relative">
                    <img
                      src="@/assets/img/3D-Player.png"
                      alt="profile_image"
                      class="shadow-sm h-100 border-radius-lg"
                      style="object-position: top;"
                    />
                  </div>
                </div>

                <!-- Información del jugador -->
                <div class="info-container">
                  <profile-info-card
                    :key="profileKey"
                    :user="selectedUser"
                    v-if="selectedUser.fecha_nacimiento"
                    title="Información del Jugador"
                    :description="`Talentoso ${this.selectedDisciplina.nombre_disciplina} conocido por su velocidad y capacidad para anticiparse a las jugadas. Comenzó su carrera en la academia juvenil de su ciudad natal, donde rápidamente destacó por su entrega en el campo y su habilidad para crear oportunidades ofensivas desde la defensa. A los 18 años, fue fichado por el equipo de segunda división FC Highlands, donde se consolidó como titular en su primera temporada y ayudó al equipo a ganar el ascenso a la primera división.`"
                    :info="this.selectedUser"
                    :action="{
                      route: 'javascript:;',
                      tooltip: isEditing ? 'Guardar' : 'Editar Perfil',
                    }"
                    @toggle-edit="toggleEdit"
                    @update-info="updateUserInfo"
                  />
                </div>
              </div>
            </div>
          </div>
        
        
      </div>
    </div>
    <div v-if="!showCreate" class="container-fluid mt-2">
      <div class="card p-3">
        <div class="ms-6 col-auto text-start justify-content-center align-items-center">
          <div class="d-flex align-items-center justify-content-between">
            <h6 class="mb-0">Métricas</h6>
            <soft-button
              type="button"
              color="primary"
              variant="gradient"
              class="btn my-3 mb-2"
              @click="showCreate = true"
              > Agregar Nueva Métrica </soft-button>
          </div>
        
        </div>
        <div  class="table-responsive">
          <table class="table border border-secondary-subtle  mt-3">
            <thead class="">
              <tr>
                <th class="text-center">Metros <br>Recorridos</th>
                <th class="text-center">Goles <br>Anotados</th>
                <th class="text-center ">Pases <br>Interceptados</th>
                <th class="text-center">Pases <br>Exitosos</th>
                <th class="text-center">Puntuación <br>de Rendimiento</th>
                <th class="text-center">Posición <br>Sugerida</th>
                <th class="text-center d-md-none d-lg-none d-xxl-table-cell">Fecha <br>del Partido</th>
                <th class="text-center">Acción</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="metric in metrics" :key="metric.id">
                <td class="text-center" >{{ metric.meters_covered }} m</td>
                <td class="text-center">{{ metric.goals_scored }}</td>
                <td class="text-center ">{{ metric.intercepted_passes }}</td>
                <td class="text-center">{{ metric.successful_passes }}</td>
                <td class="text-center">{{ metric.performance_score || 'Sin Información' }}</td>
                <td class="text-center">{{ getPositionLabel(metric.suggested_position) || 'Sin Información' }}</td>
                <td class="text-center d-md-none d-lg-none d-xxl-table-cell">{{ formatDate(metric.match_date) }}</td>
                <td class="text-center"> 
                  <button class="btn btn-link" @click="deleteMetric(metric.id)">
                      <div class="d-flex align-items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" fill="#9E0000" class="bi bi-trash3 me-2" viewBox="0 0 16 16">
                          <path d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5M11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47M8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5"/>
                        </svg>
                        <div>
                          <span v-if="loadingRows[metric.id]" class="loader" style="width: 15px; height: 15px; display: inline-block;"></span>
                        </div>
                      
                      </div>
                    </button> 
                </td>
              </tr>
            </tbody>
          </table>    
        </div>

      </div>
    </div>

    <!-- Create Metric -->
  <div v-if="showCreate" class="card mt-3">
    <div class="p-3 pb-0 card-header">
      <h6 class="mb-0 text-center">Agregar Nueva Métrica</h6>
        <div class="p-3 card-body">
          <form @submit.prevent="addMetric">
            <div class="row mb-3">
              <div class="col-md-4">
                <label for="metersCovered" class="form-label">Metros Recorridos</label>
                <input
                  type="number"
                  id="metersCovered"
                  class="form-control"
                  v-model="metric.meters_covered"
                  step="0.01"
                  required
                  placeholder="Ej: 12.50"
                  oninvalid="this.setCustomValidity('El campo es obligatorio.')"
                  oninput="this.setCustomValidity('')"
                />
              </div>
              <div class="col-md-4">
                <label for="goalsScored" class="form-label">Goles Anotados</label>
                <input
                  type="number"
                  id="goalsScored"
                  class="form-control"
                  v-model="metric.goals_scored"
                  required
                  placeholder="Ej: 2"
                  oninvalid="this.setCustomValidity('El campo es obligatorio.')"
                  oninput="this.setCustomValidity('')"
                />
              </div>
              <div class="col-md-4">
                <label for="interceptedPasses" class="form-label">Pases Interceptados</label>
                <input
                  type="number"
                  id="interceptedPasses"
                  class="form-control"
                  v-model="metric.intercepted_passes"
                  required
                  placeholder="Ej: 4"
                  oninvalid="this.setCustomValidity('El campo es obligatorio.')"
                  oninput="this.setCustomValidity('')"
                />
              </div>
            </div>
            <div class="row mb-3">
              <div class="col-md-6">
                <label for="successfulPasses" class="form-label">Pases Exitosos</label>
                <input
                  type="number"
                  id="successfulPasses"
                  class="form-control"
                  v-model="metric.successful_passes"
                  required
                  placeholder="Ej: 30"
                  oninvalid="this.setCustomValidity('El campo es obligatorio.')"
                  oninput="this.setCustomValidity('')"
                />
              </div>
              <div class="col-md-6">
                <label for="" class="form-label">Fecha del Encuentro</label>
                <flatpickr 
                  class="form-control"
                  v-model="metric.match_date"
                  required 
                  :config="{ enableTime: true, dateFormat: 'Y-m-d\\TH:i:S', time_24hr: true, }"/>
                <p>Fecha seleccionada: {{ processDate(metric.match_date) }}</p>
                
              </div>
            </div>
            <div class="d-flex justify-content-end">
              <button type="button" class="btn btn-secondary me-2" @click="showCreate = false">Cancelar</button>
              <button type="submit" class="btn btn-primary" :disabled="loading" >Crear Métrica</button>
              <div class="ms-3" v-if="loading">
                  <span class="loader justify-center"></span>
              </div>
            </div>
          </form>
        </div>
    </div>
  </div>
             </div>
  
</template>

<script>
// import SoftSwitch from "@/components/SoftSwitch.vue";
import ProfileInfoCard from "./components/ProfileInfoCard.vue";
// import SoftAvatar from "@/components/SoftAvatar.vue";
import SoftButton from '../components/SoftButton.vue';
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
import UserService from '@/assets/js/userService.js';
import flatPickr from "vue-flatpickr-component";
import "flatpickr/dist/flatpickr.css";
import axios from 'axios';
import { DateTime } from 'luxon';

axios.defaults.withCredentials = false;
axios.defaults.baseURL = 'https://goalstats-api.onrender.com/api'

const metricsService = new MetricsService();
const userService = new UserService('https://goalstats-api.onrender.com/api');

export default {
  name: "ProfileOverview",
  components: {
    // SoftSwitch,
    ProfileInfoCard,
    // SoftAvatar,
    // DefaultProjectCard,
    // PlaceHolderCard,
    SoftButton,
    flatpickr: flatPickr,
  },
  data() {
    return {
      showCreate: false,
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
      loading: false,
      metric: {
        athlete: null,
        meters_covered: null,
        goals_scored: null,
        intercepted_passes: null,
        successful_passes: null,
        match_date: null,
        sport: null,
        performance_score: null,
        suggested_position: null, 
      },
      positions: [
        { value: 'FORWARD', label: 'Delantero' },
        { value: 'MIDFIELDER', label: 'Mediocampista' },
        { value: 'DEFENDER', label: 'Defensa' },
        { value: 'GOALKEEPER', label: 'Portero' },
      ],
      loadingRows: {},
      isEditing: false,
      profileKey: 0,
    };
  },
  methods:{
    getPositionLabel(value) {
      const position = this.positions.find(p => p.value === value);
      return position ? position.label : 'Sin Información';
    },
    async loadMetrics() {
      try {
        await userService.usersData();
        this.disciplinas = userService.disciplinas;
        this.users = userService.users;

        this.selectedUser = this.users.find(user => user.username === this.username);
        this.metrics = await metricsService.getMetricsByAthlete(this.selectedUser.id);
        this.metrics.forEach(metric => {
          this.loadingRows[metric.id] = false;
        });
        this.selectedDisciplina = this.disciplinas.find(d => d.id === this.selectedUser.nombre_disciplina);

        } catch (error) {
          console.error('Error al obtener los datos', error);
        }
    },
    processDate(selectedDate) {
      const isoDate = DateTime.fromISO(selectedDate).toISO({ includeOffset: true });
      return isoDate;
    },
    formatDate(dateString) {

      const date = new Date(dateString);

      return date.toLocaleDateString('es-ES');
    },
    async addMetric(event) {
        event.preventDefault();
        this.loading = true;
        const newMetric = {
            athlete: this.selectedUser.id,
            meters_covered: String(this.metric.meters_covered),
            goals_scored: this.metric.goals_scored,
            intercepted_passes: this.metric.intercepted_passes,
            successful_passes: this.metric.successful_passes,
            sport: this.selectedUser.nombre_disciplina,
            match_date: this.processDate(this.metric.match_date),
        };

        try {
            await metricsService.createMetric(newMetric);
            event.target.reset();
            await this.loadMetrics();
            this.showCreate = false;
            this.loading = false;
            alert("Métrica creada con éxito");
        } catch (error) {
            this.loading = false;
            console.error("Error al crear la métrica:", error);
        }
    },  
    async deleteMetric(metricId) {
      this.loadingRows[metricId] = true;
      try {
        await metricsService.deleteMetric(metricId);
        await this.loadMetrics();
        this.loadingRows[metricId] = false;
        alert("Métrica eliminada con éxito");
      } catch (error) {
        this.loadingRows[metricId] = false;
        console.error("Error al eliminar la métrica:", error);
      }
    },
    toggleEdit() {
      this.isEditing = !this.isEditing;
    },
    async updateUserInfo(updatedInfo) {
      await userService.editUser(this.selectedUser.id, updatedInfo);
      Object.assign(this.selectedUser, updatedInfo);
      this.profileKey += 1;
      await this.loadMetrics();
  }
  },
  async mounted() {
    this.$store.state.isAbsolute = true;
    setNavPills();
    setTooltip(this.$store.state.bootstrap);
    await this.loadMetrics();
  },
  beforeUnmount() {
    this.$store.state.isAbsolute = false;
  },

};
</script>

<style scope>
.loader {
        transform: rotateZ(45deg);
        perspective: 1000px;
        border-radius: 50%;
        width: 18px;
        height: 18px;
        color: #f708a8;
      }
        .loader:before,
        .loader:after {
          content: '';
          display: block;
          position: absolute;
          width: inherit;
          height: inherit;
          border-radius: 50%;
          transform: rotateX(70deg);
          animation: 1s spin linear infinite;
        }
        .loader:after {
          color: #3b0066;
          transform: rotateY(70deg);
          animation-delay: .4s;
        }

      @keyframes rotate {
        0% {
          transform: translate(-50%, -50%) rotateZ(0deg);
        }
        100% {
          transform: translate(-50%, -50%) rotateZ(360deg);
        }
      }

      @keyframes rotateccw {
        0% {
          transform: translate(-50%, -50%) rotate(0deg);
        }
        100% {
          transform: translate(-50%, -50%) rotate(-360deg);
        }
      }

      @keyframes spin {
        0%,
        100% {
          box-shadow: .2em 0px 0 0px currentcolor;
        }
        12% {
          box-shadow: .2em .2em 0 0 currentcolor;
        }
        25% {
          box-shadow: 0 .2em 0 0px currentcolor;
        }
        37% {
          box-shadow: -.2em .2em 0 0 currentcolor;
        }
        50% {
          box-shadow: -.2em 0 0 0 currentcolor;
        }
        62% {
          box-shadow: -.2em -.2em 0 0 currentcolor;
        }
        75% {
          box-shadow: 0px -.2em 0 0 currentcolor;
        }
        87% {
          box-shadow: .2em -.2em 0 0 currentcolor;
        }
      }
      .player-info-grid {
        display: grid;
        grid-template-columns: auto 1fr; /* Avatar en la primera columna, información en la segunda */
        gap: 20px; /* Espacio entre las columnas */
        align-items: start; /* Alinea los elementos al inicio */
      }

      .avatar-container {
        max-width: 200px; /* Limita el tamaño del avatar */
      }

      .info-container {
        display: flex;
        flex-direction: column; /* Asegura que los elementos dentro de la información se apilen */
      }
</style>
