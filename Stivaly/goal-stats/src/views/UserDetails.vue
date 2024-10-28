<template>
    <div>
      <DetailsOfUser /> 
    </div>
  </template>
  
  <script>
  // Importa el componente que contiene el formulario de Login
  import DetailsOfUser from '@/components/dashboard/Details.vue'
  
  export default {
    name: 'ProfileDetailes',
    components: {
        DetailsOfUser
    },
 }
  </script>
  
  <style scoped>

  </style>