<template>
    <!-- Edit Modal -->
        <div v-if="showModal" class="modal-container">
            <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title text-center text-uppercase">Posiciones</h5>
                <soft-button
                    type="submit"
                    class="btn my-4 mb-2"
                    variant="gradient"
                    color="primary"
                    @click="showCreateModal = true, showModal = false"
                    >Crear Disciplina
                </soft-button>
            </div>
            <div class="modal-body">
                <!-- Contenido del modal -->
                <div class="table-responsive p-0"> 
                <table class="table align-items-center mb-0" >
                    <thead>
                    <tr>
                        <th class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
                        Nombre
                        </th>
                        <th class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
                        Descripción
                        </th>
                        <th class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
                        Acción
                        </th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr v-for="(disciplina, index) in disciplinas" :key="index">
                        <td class="text-center">{{ disciplina.nombre_disciplina }}</td>
                        <td class="text-center">{{ disciplina.descripcion }}</td>
                        <td class="align-middle text-center">
                        <button class="btn btn-link" @click="editDiscipline(disciplina)">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#4F1C77" class="bi bi-pencil-square" viewBox="0 0 16 16">
                                <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
                                <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z"/>
                            </svg>
                            </button>
                            <button class="btn btn-link" @click="deleteDiscipline(index)">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#9E0000" class="bi bi-trash3" viewBox="0 0 16 16">
                                <path d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5M11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47M8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5"/>
                            </svg>
                            </button>
                        </td>
                    </tr>
                    </tbody>
                </table>

                </div>
            </div>
            </div>
        </div>

    <!-- Create Modal -->
    <div class="p-3 card-body"> 
    <div v-if="showCreateModal" class="modal-container">
        <div class="modal-overlay" @click="closeCreateModal"></div>
        <div class="modal-content">
        <div class="modal-header">
            <h5 class="modal-title">Crear Posición</h5>
        </div>
        <div class="modal-body">
            <!-- Contenido del modal -->
            <div class="table-responsive p-0"> 
            
                <form id="create-discipline-form" @submit.prevent="handleSubmit">
                <!-- Campo Nombre -->
                <div class="mb-3">
                    <label for="nombreDisciplina" class="form-label">Nombre de la Disciplina</label>
                    <input 
                    type="text" 
                    class="form-control" 
                    id="nombreDisciplina" 
                    name="nombreDisciplina" 
                    placeholder="Ingresa el nombre de la disciplina" 
                    required
                    oninvalid="this.setCustomValidity('El campo Nombre de la Disciplina es obligatorio.')"
                    oninput="this.setCustomValidity('')">
                </div>

                <!-- Campo Descripción -->
                <div class="mb-3">
                    <label for="descripcionDisciplina" class="form-label">Descripción</label>
                    <textarea 
                    class="form-control" 
                    id="descripcionDisciplina" 
                    name="descripcionDisciplina" 
                    rows="2" 
                    placeholder="Describe la disciplina" 
                    required
                    oninvalid="this.setCustomValidity('El campo descripción es obligatorio.')"
                    oninput="this.setCustomValidity('')">
                    </textarea>
                </div>

                <!-- Botón Enviar -->
                <div class="d-flex align-items-center"> 
                    <soft-button
                    type="submit"
                    class="btn my-4 mb-2"
                    variant="gradient"
                    color="success"
                    :disabled="loading"
                    >Crear Disciplina
                </soft-button>
                <div class="ms-3" v-if="loading">
                    <span class="loader justify-center"></span>
                </div>

                </div>
                </form>

            </div>
        </div>
        <div class="modal-footer">
            <soft-button
            color="secondary"
            size="sm"
            variant="fill"
            class="btn btn-secondary"
            @click="closeCreateModal"
            >
            Cerrar
            </soft-button>
        </div>
        </div>
    </div>
    </div> 
    <!-- Discipline Modal -->
    <div class="p-3 card-body"> 
    <div v-if="showEditDisciplineModal" class="modal-container">
        <div class="modal-overlay" @click="closeEditModal"></div>
        <div class="modal-content">
        <div class="modal-header">
            <h5 class="modal-title">Editar Posición</h5>
        </div>
        <div class="modal-body">
            <!-- Contenido del modal -->
            <div class="table-responsive p-0"> 
            
                <form id="create-discipline-form" @submit.prevent="updateDiscipline">
                <!-- Campo Nombre -->
                <div class="mb-3">
                    <label for="nombreDisciplina" class="form-label">Nombre de la Disciplina</label>
                    <input 
                    type="text" 
                    class="form-control" 
                    id="nombreDisciplina" 
                    name="nombreDisciplina" 
                    placeholder="Ingresa el nombre de la disciplina"
                    v-model="selectedDisciplina.nombre_disciplina" 
                    required
                    oninvalid="this.setCustomValidity('El campo Nombre de la Disciplina es obligatorio.')"
                    oninput="this.setCustomValidity('')">
                </div>

                <!-- Campo Descripción -->
                <div class="mb-3">
                    <label for="descripcionDisciplina" class="form-label">Descripción</label>
                    <textarea 
                    class="form-control" 
                    id="descripcionDisciplina" 
                    name="descripcionDisciplina" 
                    rows="2" 
                    placeholder="Descripción de la disciplina"
                    v-model="selectedDisciplina.descripcion" 
                    required
                    oninvalid="this.setCustomValidity('El campo descripción es obligatorio.')"
                    oninput="this.setCustomValidity('')">
                    </textarea>
                </div>

                <!-- Botón Enviar -->
                <div class="d-flex align-items-center"> 
                    <soft-button
                    type="submit"
                    class="btn my-4 mb-2"
                    variant="gradient"
                    color="success"
                    :disabled="loading"
                    >Editar Disciplina
                </soft-button>
                <div class="ms-3" v-if="loading">
                    <span class="loader justify-center"></span>
                </div>

                </div>
                </form>

            </div>
        </div>
        <div class="modal-footer">
            <soft-button
            color="secondary"
            size="sm"
            variant="fill"
            class="btn btn-secondary"
            @click="closeEditModal"
            >
            Cerrar
            </soft-button>
        </div>
        </div>
    </div>
    </div> 
</template>

<script>
import SoftButton from '../components/SoftButton.vue';
import UserService from '@/assets/js/userService.js';

const userService = new UserService('https://goalstats-api.onrender.com/api');

export default {
  name: "authors-table",
  data() { 
    return {
        disciplinas: [],
        selectedDisciplinaNombre: '',
        idDisciplina: 0,
        selectedDisciplina: "todas",
        showEditDisciplineModal: false,
        showCreateModal: false,
        showModal: true,
        loading: false,
    };
  },
  components: {
    SoftButton,
  },
  methods: {
    async loadDisciplinas() {
        try {
            // Carga los datos de usuarios y disciplinas
            await userService.usersData();
            this.disciplinas = userService.disciplinas;
        } catch (error) {
            console.error('Error al cargar los datos:', error.message);
        }
    },

    async handleSubmit(event) {
      event.preventDefault(); 
      this.loading = true;
      const formElement = event.target; 
      console.log('Formulario:', formElement);
      try {
        const createdDiscipline = await userService.postDiscipline(formElement);
        this.showCreateModal = false,
        alert(`Disciplina creada con éxito: ${createdDiscipline.nombre_disciplina}`);
        this.showModal = true;
      } catch (error) {
        this.loading = false;
        alert('Error al crear la disciplina:', error);
      }
    },

    getDisciplinaName(disciplinaId) {
      const disciplina = this.disciplinas.find((d) => d.id === disciplinaId);
      return disciplina ? disciplina.nombre_disciplina : 'Sin asignar';
    },

    editDiscipline(disciplina) {
      this.selectedDisciplina = { ...disciplina }; // Crear una copia de la disciplina seleccionada
      this.showEditDisciplineModal = true;
      this.showModal = false;
    },

    async deleteDiscipline(index) {
        const disciplina = this.disciplinas[index];
        const confirmDelete = confirm(`¿Estás seguro de eliminar la disciplina ${disciplina.nombre_disciplina}?`);
        if (confirmDelete) {
            try {
            await userService.deleteDiscipline(disciplina.id);
            this.disciplinas.splice(index, 1);
            alert(`Disciplina ${disciplina.nombre_disciplina} eliminada con éxito.`);
            } catch (error) {
            alert('Error al eliminar la disciplina:', error);
            }
        }

    },

    closeEditModal() {
      console.log('Intentando cerrar el modal');
      this.showEditDisciplineModal = false;
      this.showModal = true;
    },

    closeCreateModal() {
      console.log('Intentando cerrar el modal');
      this.showModal = true;
      this.showCreateModal = false;
    },
  },
  mounted() {
    this.loadDisciplinas();
  }
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