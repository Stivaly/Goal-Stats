<template>
  <div
    class="pt-5 m-3 page-header align-items-start min-vh-50 pb-11 border-radius-lg"
    :style="{
      backgroundImage:
        'url(' + require('@/assets/img/balls-8049598_1280.jpg') + ')',
    }"
  >
    <span class="mask bg-gradient-dark opacity-3"></span>
    <div class="container">
      <div class="row justify-content-center">
        <div class="mx-auto text-center col-lg-5">
          <h1 class="mt-5 mb-2 text-white">Bienvenido</h1>
          <p class="text-white text-lead">
            El esfuerzo que haces hoy te acerca un paso más a tus objetivos. 
            La constancia siempre rinde frutos.
          </p>
        </div>
      </div>
    </div>
  </div>
  <div class="container">
    <div class="row mt-lg-n10 mt-md-n11 mt-n10 justify-content-center">
      <div class="mx-auto mb-0 col-xl-4 col-lg-5 col-md-7">
        <div class="card z-index-0">
          <div class=" pt-4 text-center card-header">
            <h5>Registro</h5>
          </div>
          <div class="card-body">
            <form role="form">
              <div class="mb-3">
                <input
                  id="username"
                  type="text"
                  placeholder="Nombre de Usuario"
                  v-model="form.username"
                  class="form-control"
                  required
                  @input="validateInputs"
                  />
                  <ul v-if="errors.username">
                    <li v-for="(error, index) in errors.username" :key="index" class="text-danger">{{ error }}</li>
                  </ul>
                  <span v-if="isLimitReached" class="limit-warning">Has alcanzado el límite de 30 caracteres.</span>
              </div>
              <div class="mb-3">
                <input
                  id="email"
                  type="email"
                  placeholder="Correo"
                  v-model="form.email"
                  class="form-control"
                  required
                  @input="validateInputs"
                />
                <ul v-if="errors.email">
                  <li v-for="(error, index) in errors.email" :key="index" class="text-danger">{{ error }}</li>
                </ul>
              </div>
              <div class="mb-3">
                <input
                  id="password"
                  type="password"
                  placeholder="Contraseña"
                  v-model="form.password"
                  class="form-control"
                  required
                  @input="validateInputs"
                />
                <ul v-if="errors.password">
                  <li v-for="(error, index) in errors.password" :key="index" class="text-danger">{{ error }}</li>
                </ul>

              </div>
              <div class="mb-3">
                <select
                  id="role"
                  v-model="selectedRole"
                  class="form-control"
                  required
                >
                  <option value="" disabled>Seleccione un Rol</option>
                  <option v-for="role in roles" :key="role.value" :value="role.value">
                    {{ role.label }}
                  </option>
                </select>
              </div>
              <soft-checkbox
                id="flexCheckDefault"
                username="flexCheckDefault"
                class="font-weight-light"
                checked
              >
                Acepto los
                <a href="javascript:;" class="text-primary font-weight-bolder"
                  >Términos y Condiciones</a
                >
              </soft-checkbox>
              
              <div class="text-center">
                <div class="d-flex justify-content-center" v-if="loading">
                  <span class="loader justify-center"></span>
                </div>
                <soft-button
                  type="button"
                  color="primary"
                  full-width
                  variant="gradient"
                  class="my-3 mb-2"
                  :disabled="loading"
                  @click="submitForm"
                  > Registrarse </soft-button
                >
                
              </div>
              <p class="text-sm mt-3 mb-0">
                ¿Ya tienes cuenta?
                <router-link
                  :to="{ name: 'Sign In' }"
                  class="text-primary text-gradient font-weight-bold"
                  >Inicia Sesión</router-link>
                                   
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// import Navbar from "@/examples/PageLayout/Navbar.vue";
// import AppFooter from "@/examples/PageLayout/Footer.vue";
// import SoftInput from "@/components/SoftInput.vue";
import SoftCheckbox from "@/components/SoftCheckbox.vue";
import SoftButton from "@/components/SoftButton.vue";
// import SoftList from "@/components/softList.vue";
import AuthService from '@/assets/js/authService.js';
import { mapMutations } from "vuex";

const authService = new AuthService('https://goalstats-api.onrender.com/api');

export default {
  username: "SignupBasic",
  components: {
    // Navbar,
    // AppFooter,
    // SoftInput,
    SoftCheckbox,
    SoftButton,
    // SoftList,
  },
  created() {
    this.toggleEveryDisplay();
    this.toggleHideConfig();
  },
  beforeUnmount() {
    this.toggleEveryDisplay();
    this.toggleHideConfig();
  },
  data() {
    return {
      roles: [
        { value: 'SUPER_ADMIN', label: 'Super Administrador' },
        { value: 'ADMIN', label: 'Administrador' },
        { value: 'COACH', label: 'Entrenador' },
        { value: 'PLAYER', label: 'Jugador' },
      ],
      form: {
        username: '',
        email: '',
        password: '',
        role: '',
      },
      selectedRole: '',
      isPasswordValid: true,
      loading: false,
      errors: {},
    }
  },
  computed: {
    isLimitReached() {
      return this.form.username.length >= 30;
    },
  },
  watch: {
    'form': function() {
      this.validateInputs();
    },
  },
  methods: {
    ...mapMutations(["toggleEveryDisplay", "toggleHideConfig"]),
    validateInputs() {
      const errors = {};
      const username = this.form.username;
      if (!username) {
        errors.username = ["El nombre es obligatorio."];
      } else if (username.length < 3) {
        errors.username = ["El nombre debe tener al menos 3 caracteres."];
      }
      const email = this.form.email;
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!email) {
        errors.email = ["El correo es obligatorio."];
      } else if (!emailRegex.test(email)) {
        errors.email = ["El correo no tiene un formato válido."];
      }
      const password = this.form.password;
      const passwordErrors = [];
      const hasUpperCase = /[A-Z]/.test(password);
      const hasLowerCase = /[a-z]/.test(password);
      const hasNumber = /\d/.test(password);
      const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);
      const isValidLength = password.length >= 8;

      if (!password) {
        passwordErrors.push("La contraseña es obligatoria.");
      }
      if (!hasUpperCase) {
        passwordErrors.push("La contraseña debe tener al menos una letra mayúscula.");
      }
      if (!hasLowerCase) {
        passwordErrors.push("La contraseña debe tener al menos una letra minúscula.");
      }
      if (!hasNumber) {
        passwordErrors.push("La contraseña debe tener al menos un número.");
      }
      if (!hasSpecialChar) {
        passwordErrors.push("La contraseña debe tener al menos un carácter especial.");
      }
      if (!isValidLength) {
        passwordErrors.push("La contraseña debe tener al menos 8 caracteres.");
      }

      if (passwordErrors.length > 0) {
        errors.password = passwordErrors;
      }

      // Asignar errores a una variable reactiva
      this.errors = errors;

      // Forzar actualización si es necesario
      this.$forceUpdate();

      // Retornar si el formulario es válido
      return Object.keys(errors).length === 0;
    },
    async submitForm() {
      this.form.role = this.selectedRole;

      try {
        this.loading = true;
        const response = await authService.registerUser(this.form);
        
        if (response.status === 201) {
          alert('Registro exitoso');
          this.$router.push('/sign-in'); 
        } 
      } catch (error) {
        this.loading = false;
      };
    },
  },
  }
</script>

<style scope>
.loader {
        transform: rotateZ(45deg);
        perspective: 1000px;
        border-radius: 50%;
        width: 18px;
        height: 18px;
        color: #f708a8;
      }
        .loader:before,
        .loader:after {
          content: '';
          display: block;
          position: absolute;
          width: inherit;
          height: inherit;
          border-radius: 50%;
          transform: rotateX(70deg);
          animation: 1s spin linear infinite;
        }
        .loader:after {
          color: #3b0066;
          transform: rotateY(70deg);
          animation-delay: .4s;
        }

      @keyframes rotate {
        0% {
          transform: translate(-50%, -50%) rotateZ(0deg);
        }
        100% {
          transform: translate(-50%, -50%) rotateZ(360deg);
        }
      }

      @keyframes rotateccw {
        0% {
          transform: translate(-50%, -50%) rotate(0deg);
        }
        100% {
          transform: translate(-50%, -50%) rotate(-360deg);
        }
      }

      @keyframes spin {
        0%,
        100% {
          box-shadow: .2em 0px 0 0px currentcolor;
        }
        12% {
          box-shadow: .2em .2em 0 0 currentcolor;
        }
        25% {
          box-shadow: 0 .2em 0 0px currentcolor;
        }
        37% {
          box-shadow: -.2em .2em 0 0 currentcolor;
        }
        50% {
          box-shadow: -.2em 0 0 0 currentcolor;
        }
        62% {
          box-shadow: -.2em -.2em 0 0 currentcolor;
        }
        75% {
          box-shadow: 0px -.2em 0 0 currentcolor;
        }
        87% {
          box-shadow: .2em -.2em 0 0 currentcolor;
        }
      }
</style>