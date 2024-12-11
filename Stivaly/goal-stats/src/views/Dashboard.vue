<template>
  <div class="py-4 container-fluid">
    <div class="row">
      <div class="col-xl-4 col-sm-6 mb-xl-0 mb-4">
        <mini-statistics-card
          title="Usuarios Totales"
          :value="totalUsers"
          :percentage="{
            value: '+505%',
            color: 'text-primary',
          }"
          :icon="{
            component: 'ni ni-world',
            background: iconBackground,
          }"
          direction-reverse
        />
      </div>
      <div class="col-xl-4 col-sm-6 mb-xl-0 mb-4">
        <mini-statistics-card
          title="Usuarios En Línea"
          :value="totalUsersActive"
          :percentage="{
            value: '+3%',
            color: 'text-primary',
          }"
          :icon="{
            component: ' ni ni-world',
            background: iconBackground,
          }"
          direction-reverse
        />
      </div>
      <div class="col-xl-4 col-sm-12 mb-xl-0 mb-4">
        <mini-statistics-card
          title="Disponibilidad"
          value="200 Horas"
          :percentage="{
            value: '-2%',
            color: 'text-danger',
          }"
          :icon="{
            component: 'ni ni-paper-diploma',
            background: iconBackground,
          }"
          direction-reverse
        />
      </div>
    </div>
    <div class="row">
      <div class="col-lg-12 mb-lg-0 mb-4">
        <div class="card">
          <div class="card-body p-3">
            <div class="row">
              
                <div class="border-radius-lg h-100">
                  <img
                    src="../assets/img/shapes/waves-white.svg"
                    class="position-absolute h-100 w-50 top-0 d-lg-block d-none"
                    alt="waves"
                  />

                  <div class="card z-index-2">
                      <BarChart
                        v-if="chartData.datasets"
                        :chartData="chartData"
                        title="Usuarios por Rol"
                        description="Distribución actual de usuarios por rol en el sistema"
                      />
                  </div>

           
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="mt-4 row">
      <div class="mb-4 col-lg-12 mb-lg-0">
        <div class="card z-index-2">
          <div class="p-3 card-body">
            <reports-bar-chart
              v-if="chartData2.datasets"
              id="chart-bar"
              title="Usuarios por Edad"
              description="Distribución actual de usuarios por edad en el sistema"
              :chart="chartData2"
              :items="[
                {
                  icon: {
                    color: 'primary',
                    component: faUsers,
                  },
                  label: 'usuarios',
                  progress: { content: totalUsers, percentage: 60 },
                },
                {
                  icon: { color: 'info', component: faHandPointer },
                  label: 'clicks',
                  progress: { content: '2m', percentage: 90 },
                },
              ]"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import UserService from '@/assets/js/userService.js';
import MiniStatisticsCard from "@/examples/Cards/MiniStatisticsCard.vue";
import ReportsBarChart from "@/examples/Charts/ReportsBarChart.vue";
//import GradientLineChart from "@/examples/Charts/GradientLineChart.vue";
import BarChart  from "@/examples/Charts/BarChart.vue";
// import TimelineList from "./components/TimelineList.vue";
// import TimelineItem from "./components/TimelineItem.vue";
// import ProjectsCard from "./components/ProjectsCard.vue";
import US from "../assets/img/icons/flags/US.png";
import DE from "../assets/img/icons/flags/DE.png";
import GB from "../assets/img/icons/flags/GB.png";
import BR from "../assets/img/icons/flags/BR.png";
import {
  faHandPointer,
  faUsers,
  faCreditCard,
  faScrewdriverWrench,
} from "@fortawesome/free-solid-svg-icons";

const userService = new UserService('https://goalstats-api.onrender.com/api');

export default {
  name: "dashboard-default",
  data() {
    return {
      iconBackground: "bg-gradient-primary",
      faCreditCard,
      faScrewdriverWrench,
      faUsers,
      faHandPointer,
      sales: {
        us: {
          country: "United States",
          sales: 2500,
          value: "$230,900",
          bounce: "29.9%",
          flag: US,
        },
        germany: {
          country: "Germany",
          sales: "3.900",
          value: "$440,000",
          bounce: "40.22%",
          flag: DE,
        },
        britain: {
          country: "Great Britain",
          sales: "1.400",
          value: "$190,700",
          bounce: "23.44%",
          flag: GB,
        },
        brasil: {
          country: "Brasil",
          sales: "562",
          value: "$143,960",
          bounce: "32.14%",
          flag: BR,
        },
      },
      totalUsers: 0,
      totalUsersActive: 0,
      chartData: {},
      chartData2: {},
      roleCounts: {
        SUPER_ADMIN: 0,
        ADMIN: 0,
        COACH: 0,
        PLAYER: 0,
      },
    };
  },
  components: {
    MiniStatisticsCard,
    ReportsBarChart,
    //GradientLineChart,
    BarChart,
    // ProjectsCard,
    // TimelineList,
    // TimelineItem,
  },
  async mounted() {
    if (this.isTokenExpired()) {
        localStorage.removeItem('authToken');
        localStorage.removeItem('tokenExpiration');
        this.$router.push('/sign-in'); 
    }

    this.totalUsers = await userService.usersCount();
    this.totalUsersActive = await userService.usersCountByIsActive();
    this.roleCounts = await userService.usersCountByRole();
    console.log(this.roleCounts.SUPER_ADMIN);
    this.intervalId = setInterval(() => {
      console.log("refrescando")
    }, 30000);

    this.chartData = {
      labels: ["SUPER ADMIN", "ADMIN", "ENTRENADOR", "DEPORTISTA"], 
      datasets: [
        {
          label: "Cantidad",
          data: [this.roleCounts.SUPER_ADMIN, this.roleCounts.ADMIN, this.roleCounts.COACH, this.roleCounts.PLAYER], 
        },
      ],
      colors: ["#17c1e8", "#cb0c9f", "#82d616", "#FBC02D"],
    };
    const ageGroups = await userService.distributeAgeGroups();
    this.chartData2 = {
      labels: Object.keys(ageGroups),
      datasets: {
        label: 'Usuarios por Edad',
        data: Object.values(ageGroups),
        },
      };
  },
  methods: {
    isTokenExpired() {
        const expiration = localStorage.getItem('tokenExpiration');
        if (!expiration) return true;
        const now = new Date();
        return now > new Date(expiration); 
    },
    
  },
};
</script>
