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
                />
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
                />
              </div>
              <div class="mb-3">
                <input
                  id="password"
                  type="password"
                  placeholder="Contraseña"
                  v-model="form.password"
                  class="form-control"
                  required
                  @input="validatePassword"
                />
                <span v-if="!isPasswordValid" class="text-danger text-center">La contraseña debe contener al menos una mayúscula, una minúscula, un número y un carácter especial.</span>
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
    }
  },
  computed: {
    isLimitReached() {
      return this.form.username.length >= 30;
    },
  },
  watch: {
    'form.password': function() {
      this.validatePassword();
    },
  },
  methods: {
    ...mapMutations(["toggleEveryDisplay", "toggleHideConfig"]),
    validatePassword() {
      const password = this.form.password;
      const hasUpperCase = /[A-Z]/.test(password);
      const hasLowerCase = /[a-z]/.test(password);
      const hasNumber = /\d/.test(password);
      const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);
      const isValidLength = password.length >= 8;
      this.isPasswordValid = hasUpperCase && hasLowerCase && hasNumber && hasSpecialChar && isValidLength;
      this.$forceUpdate();
    },
    async submitForm() {
      this.form.role = this.selectedRole;

      try {
        this.loading = true;
        const response = await authService.registerUser(this.form);
        
        if (response.status === 201) {
          alert('Registro exitoso');
          this.$router.push('/sign-in'); // Redirige a la página de dashboard o a donde sea necesario
        } else if (response.status === 400) {
          alert('Solicitud incorrecta. Verifique los campos ingresados.');
        } else if (response.status === 409) {
          alert('El usuario ya está registrado. Por favor, utiliza un usuario diferente.')
        };
      } catch (error) {
        this.loading = false;
        console.error('Error al registrar:', error);
        alert('Error en el registro, intenta nuevamente.');
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