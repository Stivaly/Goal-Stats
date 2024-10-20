<template>
    <div>
      <DashboardViewAdmin /> <!-- Componente que contiene el formulario de login -->
    </div>
  </template>
  
  <script>
  // Importa el componente que contiene el formulario de Login
  import DashboardViewAdmin from '@/components/UsersAdmin.vue'
  
  export default {
    name: 'Dashboard',
    components: {
        DashboardViewAdmin
    }
  }
  </script>
  
  <style scoped>

  </style>