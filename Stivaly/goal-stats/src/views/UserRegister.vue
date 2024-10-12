<template>
    <div>
      <RegisterForm /> <!-- Componente que contiene el formulario de login -->
    </div>
  </template>
  
  <script>
  // Importa el componente que contiene el formulario de Login
  import RegisterForm from '@/components/RegisterForm.vue'
  
  export default {
    name: 'Register',
    components: {
        RegisterForm
    }
  }
  </script>
  
  <style scoped>
  /* Estilos específicos del Login (si es necesario) */
  </style>