<template>
  <div class="container top-0 position-sticky z-index-sticky">
    <div class="row">
      <div class="col-12">
      </div>
    </div>
  </div>
  <main class="mt-0 main-content main-content-bg">
    <section>
      <div class="page-header min-vh-75">
        <div class="container">
          <div class="row">
            <div class="mx-auto col-xl-4 col-lg-5 col-md-6 d-flex flex-column">
              <div class="mt-8 card card-plain">
                <div class="pb-0 card-header text-start">
                  <h3 class="font-weight-bolder text-primary text-gradient">
                    Bienvenido de Vuelta
                  </h3>
                  <p class="mb-0">Ingresa tu usuario y contraseña para inciar sesión</p>
                </div>
                <div class="card-body">
                  <form role="form" class="text-start">
                    <label>Nombre de Usuario</label>
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
                    <label>Contraseña</label>
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
                    <div class="text-center mt-2">
                      <div class="d-flex justify-content-center" v-if="loading">
                        <span class="loader justify-center"></span>
                      </div>
                      <soft-button
                        type="button"
                        class="my-4 mb-2"
                        variant="gradient"
                        color="primary"
                        full-width
                        :disabled="loading || !isFormValid"
                        @click="submitForm"
                        >Iniciar Sesión
                      </soft-button>
                    </div>
                  </form>
                </div>
                <div class="px-1 pt-0 text-center card-footer px-lg-2">
                  <p class="mx-auto mb-4 text-sm">
                    ¿No tienes cuenta?
                    <router-link
                      :to="{ name: 'Sign Up' }"
                      class="text-primary text-gradient font-weight-bold"
                      >Regístrate</router-link
                    >
                  </p>
                </div>
              </div>
            </div>
            <div class="col-md-6">
              <div
                class="top-0 oblique position-absolute h-100 d-md-block d-none me-n8"
              >
                <div
                  class="bg-cover oblique-image position-absolute fixed-top ms-auto h-100 z-index-0 ms-n6"
                  :style="{
                    backgroundImage:
                      'url(' +
                      require('@/assets/img/login.jpg') +
                      ')',
                      backgroundPosition: 'bottom',
                  }"
                ></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </main>

</template>

<script>
import SoftButton from "@/components/SoftButton.vue";
const body = document.getElementsByTagName("body")[0];
import { mapMutations } from "vuex";
import AuthService from '@/assets/js/authService.js';

const authService = new AuthService('https://goalstats-api.onrender.com/api');

export default {
  name: "SignIn",
  components: {
    SoftButton,
  },
  created() {
    this.toggleEveryDisplay();
    this.toggleHideConfig();
    body.classList.remove("bg-gray-100");
  },
  beforeUnmount() {
    this.toggleEveryDisplay();
    this.toggleHideConfig();
    body.classList.add("bg-gray-100");
  },
  data() {
    return {
        form: {
          username: '',
          password: '',
        },
        errorMessage: '',
        loading: false,
        errors: {},
      }
    },
  mounted() {
    if (!this.isTokenExpired() && localStorage.getItem('authToken')) {
      this.$router.push('/dashboard');
    }
  },
  computed: {
    isFormValid() {
      return Object.keys(this.errors).length === 0;
    }
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
      } 
      const password = this.form.password;
      if (!password) {
        errors.password = ["La contraseña es obligatoria."];
      }
      this.errors = errors;
      this.$forceUpdate();
      return Object.keys(errors).length === 0;
    },
    async submitForm() {
        try {
          this.loading = true;
          const response = await authService.loginUser(this.form)
          if (response.status === 200) {
            alert('Registro exitoso'); 
            this.$router.push('/dashboard/'); 
          } 
        } catch (error) {
          this.loading = false;
        };
      },
      isTokenExpired() {
        const expiration = localStorage.getItem('tokenExpiration');
        if (!expiration) return true;
        const now = new Date();
        return now > new Date(expiration); // Retorna true si ya expiró
      },
  },
};
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