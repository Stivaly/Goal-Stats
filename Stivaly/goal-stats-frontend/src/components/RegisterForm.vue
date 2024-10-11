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
            <h1 class="login-title">Regístrate</h1>
            <form @submit.prevent="submitForm">
              <div class="form-group">
                <label for="username">Username</label>
                <input v-model="form.username" type="text" name="username" id="username" class="form-control" placeholder="Username">
              </div>
              <div class="form-group">
                <label for="email">Email</label>
                <input v-model="form.email" type="email" name="email" id="email" class="form-control" placeholder="email@example.com">
              </div>
              <div class="form-group">
                <label for="role">Escoja su rol</label>
                <select v-model="form.role" name="role" id="role" class="form-control">
                  <option value="coach">Entrenador</option>
                  <option value="player">Deportista</option>
                </select>
              </div>
              <div class="form-group mb-4">
                <label for="password">Password</label>
                <input v-model="form.password" type="password" name="password" id="password" class="form-control" placeholder="enter your passsword">
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
    name: 'RegisterForm',
    data() {
      return {
          logo,
          registerImage,
          form: {
            username: '',
            email: '',
            password: '',
            role: '',
          }
        }
      },
      methods: {
        async submitForm() {
          try {
            const response = await axios.post('/register', this.form);
            console.log(response) 
            console.log(response.data);
            
            if (response.status === 200) {
              alert('Registro exitoso');
              this.$router.push('/login'); // Redirige a la página de dashboard o a donde sea necesario
            }
          } catch (error) {
            console.error('Error al registrar:', error);
            alert('Error en el registro, intenta nuevamente.');
          }
        }
      }
    }
  </script>