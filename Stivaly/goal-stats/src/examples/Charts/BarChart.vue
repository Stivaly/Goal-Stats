<template>
    <div class="p-3 pb-0 card-header">
      <h6>{{ title }}</h6>
      <p v-if="description" class="text-sm">{{ description }}</p>
    </div>
    <div class="p-3 card-body">
      <div id="chart">
        <apexchart
          type="bar"
          :options="chartOptions"
          :series="chartSeries"
          :height="height"
        />
      </div>
    </div>
  </template>
  
  <script>
  import VueApexCharts from "vue3-apexcharts";
  
  export default {
    name: "BarChart",
    components: {
      apexchart: VueApexCharts,
    },
    props: {
      height: {
        type: String,
        default: "300",
      },
      title: {
        type: String,
        default: "Título del Gráfico",
      },
      description: {
        type: String,
        default: "",
      },
      chartData: {
        type: Object,
        required: true,
      },
    },
    computed: {
      chartOptions() {
        return {
          chart: {
            toolbar: {
              show: false,
            },
          },
          plotOptions: {
            bar: {
              horizontal: false,
              columnWidth: "55%",
              distributed: true,
            },
          },
          dataLabels: {
            enabled: false,
          },
          xaxis: {
            categories: this.chartData.labels,
          },
          yaxis: {
            title: {
              text: "",
            },
          },
          colors: this.chartData.colors || [
            "#F44336",
            "#cb0c9f",
            "#9C27B0",
            "#3F51B5",
          ],
          legend: {
            position: "top",
          },
        };
      },
      chartSeries() {
        return this.chartData.datasets.map((dataset) => ({
          name: dataset.label,
          data: dataset.data,
        }));
      },
    },
  };
  </script>
  
  <style>
  /* Opcional: Ajusta estilos adicionales si es necesario */
  </style>
  