<template>
    <div class="dashboard-container">
        <div class="dashboard-grid">
        <!-- Información del progreso de entrenamiento -->
        <div class="progress-cards">
            <div class="card progress-card hover-card">
                <div class="card-content align-items-center ">
                    <p>ENTRENAMIENTOS DE LA SEMANA</p>
                    <p >0/2</p>
                </div>
                
            </div>
            <div class="card progress-card hover-card">
                <div class="card-content">
                    <p>KG'S</p>
                    <p class="weight-change positive">-6.9kg (BAJA)</p>
                    <div class="start-current">
                    <span>INICIO - 129.5kg</span>
                    <span>ACTUAL - 122.6kg</span>
                    </div>

                </div>
            </div>
            <div class="card progress-card hover-card">
                <div class="card-content">
                    <p>GRASAS %</p>
                    <p class="weight-change positive">-2.50% (BAJA)</p>
                    <div class="start-current">
                    <span>INICIO - 29.4%</span>
                    <span>ACTUAL - 26.9%</span>
                    </div>

                </div>
            </div>

        </div>
            
        <div class="card-content-profile">
                <div class="card profile-cards hover-card">
                <div class="profile-header">
                <img class="profile-picture" :src="male3D" alt="Profile Picture" />
                <div class="profile-info">
                    <h4>Cristian Valenzuela</h4>
                    <p class="user-email">ejemplo.ejemplo@ejemplo.com</p><br>
                    <p>35 años</p><br><br>
                    <div class="role" >Rol <br><span class="badge rounded-pill text-bg-success">ENTRENADOR</span></div><br>
                    <p><span class="role">Principal Pupilo</span> <br>Camilo Baeza</p>
                </div>
                </div>
                <div class="contact-info">
                <h5 class="start-current" style="font-size: large;">INFORMACIÓN DE CONTACTO</h5>
                <div class="contact-info-detail">
                    <p class="contact-info-user" ><strong class="role">Teléfono</strong> <br>0401 845 683</p>
                    <p class="contact-info-user"><strong class="role">Nombre de Usuario</strong> <br>Jarrad_j45</p>
                    <p class="contact-info-user"><strong class="role">Weight</strong> <br>10.00 kg</p>
                    <p class="contact-info-user"><strong class="role">Dirección</strong> <br>West End 45th Street, San Francisco, California, US</p>
                </div>
                </div>
            </div>
    
            </div>
        <!-- Gráficas de salud -->
         <div class="flex-container-grid">

             <div class="card-content-health">
                 <div class="card hover-card">
                 <p>DIGESTIÓN</p>
                 <div id="digestion-chart"></div>
                 </div>
             </div>
             <div class="card-content-health">
                 <div class="card hover-card">
                 <p>ESTRÉS</p>
                 <div id="stress-chart"></div>
                 </div>
             </div>
             <div class="card-content-health">
                 <div class="card hover-card">
                 <p>ENERGÍA</p>
                 <div id="energy-chart"></div>
                 </div>
             </div>
             <!-- Gráfica de peso -->
             <div class=" weight-graph">
             <div class="card indicator-card hover-card">
                 <h4>WEIGHT GRAPH</h4>
                 <div class="graph-controls">
                 <button class="graph-button">1 Mon</button>
                 <button class="graph-button">3 Mon</button>
                 <button class="graph-button">6 Mon</button>
                 <button class="graph-button">1 Year</button>
                 </div>
                 <div class="graph-select">
                     <div id="weight-graph" style="width: 100% !important;"></div>
                 </div>
                 </div>
             </div>
             </div>
                 <!-- Indicadores de salud -->
         </div>
    </div>



</template>

<script>
import male3D from '@/assets/images/3D-Player.png'
import ApexCharts from 'apexcharts';

export default {
    name: 'DetailsOfUser',

    data() {
        return {
            male3D,
        }
    },
    mounted() {
    // Llama a la función createChart para cada gráfico
    this.$nextTick(() => {
        setTimeout(() => {
            this.createChart('digestion-chart', 6.5, 'PH', 1, 14); // Rango 1-14, valor 6.5
            this.createChart('stress-chart', 600, 'PTS', 1, 1200); // Rango 0-1200, valor 600
            this.createChart('energy-chart', 2500, 'PTS', 1, 5000);
            this.createWeightChart();
        }, 2000);
    });
    },
    methods: {
    createChart(id, value, label, minRange, maxRange) {
        if (typeof value !== 'number' || typeof maxRange !== 'number' || maxRange === 0) {
            console.error('Valores inválidos para el gráfico:', { value, maxRange });
            return;
        }
        const chartElement = document.querySelector(`#${id}`);
        if (!chartElement) {
            console.error(`No se pudo encontrar el contenedor con ID: #${id}`);
            return;
        }
      const options = {
        series: [(value / maxRange) * 100],
        chart: {
          height: 500,
          type: 'radialBar',
        },
        plotOptions: {
          radialBar: {
            hollow: {
              size: '50%',
            },
            dataLabels: {
              show: true,
              name: {
                show: true,
              },
              value: {
                fontSize: '22px',
                fontWeight: 'bold',
                offsetY: 8, // Centra el número verticalmente
                color: '#333', // 
                show: true,
                formatter: function () {
                  return `${value}`; // Muestra el valor original
                },
              },
            },
          },
        },
        labels: [label],
      };
      const chart = new ApexCharts(document.querySelector(`#${id}`), options);
      chart.render();
    },
    createWeightChart() {
        const options = {
            series: [{
                name: 'Peso',
                data: [
                    { x: '2024-01-01', y: 130 },
                    { x: '2024-02-01', y: 127 },
                    { x: '2024-03-01', y: 125 },
                    { x: '2024-04-01', y: 123 },
                    { x: '2024-05-01', y: 122 },
                    { x: '2024-06-01', y: 121 },
                ]
            }],
            chart: {
                type: 'line',
                height: 200,
                width: '100%',
            },
            xaxis: {
                type: 'datetime',
                title: {
                    text: 'Fecha',
                },
            },
            yaxis: {
                title: {
                    text: 'Peso (kg)',
                },
                min: 120, // Ajusta esto según tus datos para mejor visualización
                max: 135,
            },
            stroke: {
                curve: 'smooth',
            },
            markers: {
                size: 5,
                hover: {
                    sizeOffset: 6
                }
            },
            tooltip: {
                x: {
                    format: 'MMM yyyy' // Formato de fecha para el tooltip
                },
            },
            grid: {
                borderColor: '#f1f1f1',
            }
        };

        const chart = new ApexCharts(document.querySelector("#weight-graph"), options);
        chart.render();
    },
  },
    
    }

</script>

<style scoped>
@import '@/assets/css/userdetails.css';

</style>
