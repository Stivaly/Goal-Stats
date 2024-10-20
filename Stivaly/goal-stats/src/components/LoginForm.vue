<template>
  <main>
  <div class="container-fluid">
    <div class="row">
      <div class="col-sm-6 px-0 d-none d-sm-block">
        <img :src="registerImage" alt="login image" class="login-img">
      </div>
      <div class="col-sm-6 login-section-wrapper">
        <div class="login-wrapper my-auto">
          <div class="brand-wrapper">
            <img :src="logo" alt="logo" class="logo">
          </div>
          <h1 class="login-title">Inicia Sesión</h1>
          <form @submit.prevent="submitForm">
            <div class="form-group">
              <label for="username">Usuario</label>
              <input v-model="form.username" type="text" name="username" id="username" class="input-field" placeholder="Usuario">
            </div>
            <div class="form-group mb-4">
              <label for="password">Contraseña</label>
              <input v-model="form.password" type="password" name="password" id="password" class="input-field" placeholder="Contraseña">
            </div>
            <span v-if="errorMessage" class="error-message">{{ errorMessage }}</span>
            <input name="login" id="login" class="btn btn-block login-btn" type="submit" value="Register">
          </form>
          <a href="#!" class="forgot-password-link">¿Olvidó su contraseña?</a>
          <router-link to="/register/" class="forgot-password-link">¿No tienes cuenta? Registrate ahora</router-link>
        </div>
      </div>
    </div>
  </div>
</main>
</template>

<script>
import axios from 'axios'
import logo from '@/assets/images/logo_goal.svg'
import registerImage from '@/assets/images/login.jpg'


export default {
  name: 'LoginForm',
  data() {
    return {
        logo,
        registerImage,
        form: {
          username: '',
          password: '',
        },
        errorMessage: '',
      }
    },
    mounted() {
      if (!this.isTokenExpired() && localStorage.getItem('authToken')) {
        console.log('Ya hay un token válido, redirigiendo al dashboard...');
        this.$router.push('/dashboard/');
      }
      
    },
    methods: {
      async submitForm() {
        console.log(this.form);
        try {
          const response = await axios.post('https://goalstats-api.onrender.com/api/login/', this.form)
          if (response.status === 200) {
            // Suponiendo que el token viene en la respuesta
            const token = response.data.token; 
            console.log(token)// Ajusta según cómo se devuelve el token en la respuesta
            const now = new Date();
            const expirationDate = new Date(now.getTime() + 10 * 24 * 60 * 60 * 1000); // 10 días en milisegundos
            
            // Guardar el token y la fecha de expiración en localStorage
            localStorage.setItem('authToken', token);
            localStorage.setItem('tokenExpiration', expirationDate.toISOString()); // Almacena la fecha como cadena
            this.$router.push('/dashboard/'); // Redirige a la página de dashboard o a donde sea necesario
          };
          console.log(response) 
          console.log(response.data);

        } catch (error) {
          console.error('Error al registrar:', error);
          if (error.response) {
            // Errores HTTP (como 400 o 500)
            if (error.response.status === 400) {
              this.errorMessage = 'Datos inválidos. Por favor, Verifica tus credenciales.';
            } else if (error.response.status === 401) {
              this.errorMessage = 'No autorizado. Verifica tus credenciales.';
            } else if (error.response.status === 500) {
              this.errorMessage = 'Error del servidor. Contacta al administrador del sistema.';
            } else {
              this.errorMessage = `Error ${error.response.status}: ${error.response.data.message}`;
            }
          } else if (error.request) {
            // No se recibió respuesta
            this.errorMessage = 'No se pudo conectar al servidor. Revisa tu conexión de internet.';
          } else {
            // Otros errores desconocidos
            this.errorMessage = 'Ocurrió un error inesperado. Intenta nuevamente más tarde.';
          };
        };
      },
      isTokenExpired() {
        const expiration = localStorage.getItem('tokenExpiration');
        console.log('Fecha de expiración del token:', expiration);
        if (!expiration) return true;

        const now = new Date();
        return now > new Date(expiration); // Retorna true si ya expiró
      },
    }
  }

</script>

<style scoped>
  .input-field {
          width: 100%;
          padding: 10px 15px;
          margin-bottom: 15px;
          border: 1px solid #e0e0e0; /* Borde gris claro */
          border-radius: 50px; /* Bordes curvos */
          outline: none;
          font-size: 16px;
      }

      .input-field:focus {
          border-color: #b3b3b3; /* Cambia el borde en foco */
      }

      .recover-password {
          display: block;
          text-align: center;
          color: #00aaff;
          text-decoration: none;
          font-size: 14px;
          margin-top: 10px;
      }

      .recover-password:hover {
          text-decoration: underline;
      }
</style>