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
              <input v-model="form.password" type="password" name="password" id="password" class="input-field" placeholder="contraseña">
            </div>
            <input name="login" id="login" class="btn btn-block login-btn" type="submit" value="Register">
          </form>
          <a href="#!" class="forgot-password-link">¿Olvidó su contraseña?</a>
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
        }
      }
    },
    mounted() {
      
    },
    methods: {
      async submitForm() {
        console.log(this.form);
        try {
          const response = await axios.post('/register', this.form);
          console.log(response) 
          console.log(response.data);
          
          if (response.status === 200) {
            alert('Registro exitoso');
            this.$router.push('/dashboard'); // Redirige a la página de dashboard o a donde sea necesario
          }
        } catch (error) {
          console.error('Error al registrar:', error);
          alert('Error en el registro, intenta nuevamente.');
        }
      }
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