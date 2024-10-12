<template>
    <div>
      <LoginForm /> <!-- Componente que contiene el formulario de login -->
    </div>
  </template>
  
  <script>
  // Importa el componente que contiene el formulario de Login
  import LoginForm from '@/components/LoginForm.vue'
  
  export default {
    name: 'InicioSesion',
    components: {
        LoginForm
    }
  }
  </script>
  
  <style scoped>

  </style>