<template>
    <main>
    <div class="container-fluid">
      <div class="row">
        <div class="col-sm-6 px-0 d-none d-sm-block">
          <img :src="registerImage" alt="login image" class="login-img">
        </div>
        <div class="col-sm-6 login-section-wrapper ">
          <div class="login-wrapper">
            <div class="brand-wrapper">
              <img :src="logo" alt="logo" class="logo">
            </div>
            <h1 class="login-title">Regístrate</h1>
            <form @submit.prevent="submitForm">
              <div class="form-group">
                <label for="username" class="text-center">Nombre de Usuario<strong class="text-danger"> *</strong></label>
                <input v-model="form.username" type="text" name="username" id="username" class="input-field" placeholder="Nombre y Apellido" maxlength="30">
                <span v-if="isLimitReached" class="limit-warning">Has alcanzado el límite de 30 caracteres.</span>
              </div>
              <div class="form-group">
                <label for="email">Correo Electrónico <strong class="text-danger"> *</strong></label>
                <input v-model="form.email" type="email" name="email" id="email" class="input-field" placeholder="email@example.com">
              </div>
              <div class="form-group">
                <label for="password">Contraseña<strong class="text-danger"> *</strong></label>
                <input v-model="form.password" type="password" name="password" id="password" class="input-field" placeholder="contraseña" @input="validatePassword">
                <span v-if="!isPasswordValid" class="text-danger text-center">La contraseña debe contener al menos una mayúscula, una minúscula, un número y un carácter especial.</span>
              </div>
              <div class="form-group mb-4">
                <label for="role">Escoja su rol<strong class="text-danger"> *</strong></label>
                <select v-model="form.role" name="role" id="role" class="input-field" placeholder="Rol">
                  <option v-for="role in roles" :key="role.value" :value="role.value">
                    {{ role.label }}
                  </option>
                </select>
              </div>
              <input name="login" id="login" class="btn btn-block login-btn" type="submit" value="Registrarse">
            </form>
            <router-link to="/login/" class="forgot-password-link">¿Ya tiene cuenta? Inicie sesión</router-link>
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
          roles: [
            { value: 'COACH', label: 'Entrenador' },
            { value: 'PLAYER', label: 'Jugador' },
          ],
          form: {
            username: '',
            email: '',
            password: '',
            role: '',
          },
          isPasswordValid: true,
        }
      },
      mounted() {
        
      },
      computed: {
        isLimitReached() {
          return this.form.username.length >= 30;
        },
      },
      methods: {
        validatePassword() {
          const password = this.form.password;
          const hasUpperCase = /[A-Z]/.test(password);
          const hasLowerCase = /[a-z]/.test(password);
          const hasNumber = /\d/.test(password);
          const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);
          const isValidLength = password.length >= 8;
          this.isPasswordValid = hasUpperCase && hasLowerCase && hasNumber && hasSpecialChar && isValidLength;
        },
        async submitForm() {
          console.log(this.form);
          try {
            const response = await axios.post('https://goalstats-api.onrender.com/api/register/', this.form);
            console.log(response) 
            console.log(response.data);
            
            if (response.status === 201) {
              alert('Registro exitoso');
              this.$router.push('/login/'); // Redirige a la página de dashboard o a donde sea necesario
            }
          } catch (error) {
            console.error('Error al registrar:', error);
            alert('Error en el registro, intenta nuevamente.');
          };
          

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