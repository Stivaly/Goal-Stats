<template>

        <div class="card">
          <div class="p-3 pb-0 card-header">
            <h6 class="mb-0 text-center">Disciplinas Registradas</h6>
          </div>
          <div class="p-3 card-body">
            <select class="form-control">
              <option v-for="(disciplina, index) in disciplinas" :key="index" :value="disciplina.nombre_disciplina">
                {{ disciplina.nombre_disciplina }} - {{ disciplina.descripcion }}
              </option>
            </select>

          </div>
        </div><br>


  <div class="card mb-4">
    <div class="card-header pb-0">
      <h6>Usuarios</h6>
    </div>
    <div class="card-body px-0 pt-0 pb-2">
      <div class="table-responsive p-0">
        <table class="table align-items-center mb-0">
          <thead>
            <tr>
              <th
                class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7"
              >
                Nombre de Usuario
              </th>
              <th
                class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2"
              >
                Rol
              </th>
              <th
                class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2"
              >
                Estado
              </th>
              <th
                class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7"
              >
                Nombre
              </th>
              
              
              <th
                class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7"
              >
                Fecha de Nacimiento
              </th>
              <th
                class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7"
              >
                Peso
              </th>
              <th
                class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7"
              >
                Estatura
              </th>
              <th
                class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7"
              >
                Acción
              </th>

            </tr>
          </thead>
          <tbody>
            <tr v-for="user in users" :key="user.username">
              <td class="text-center ">
                <div class="d-flex px-2 py-1 ms-5 justify-content-start align-items-center">
                  <div>
                    <soft-avatar
                      :img=getUserImg(user.role)
                      size="sm"
                      border-radius="lg"
                      class="me-3"
                      alt="user1"
                    />
                  </div>
                  <div class="d-flex flex-column justify-content-center">
                    <h6 class="mb-0 text-sm">{{ user.username }}</h6>
                    <p class="text-xs text-secondary mb-0">
                      {{ getDisciplinaName(user.nombre_disciplina) }}
                    </p>
                  </div>
                </div>
              </td>
              <td class="align-middle text-center text-sm">
                <soft-badge :color="getRoleStyle(user.role).color" variant="gradient" size="sm"
                  >{{ user.role }}</soft-badge
                >
              </td>
              <td class="align-middle text-center">
                <span class="text-secondary text-xs font-weight-bold"
                  >{{ getEstado(user.is_active) }}</span
                >
              </td>
              <td class="align-middle text-center">
                <span class="text-secondary text-xs font-weight-bold"
                  >{{ mostrarValor(user.nombre) }} {{ mostrarValor(user.apellido) }}</span
                >
              </td>
              <td class="align-middle text-center">
                <span class="text-secondary text-xs font-weight-bold"
                  >{{ mostrarValor(user.fecha_nacimiento) }}</span
                >
              </td>
              <td class="align-middle text-center">
                <span class="text-secondary text-xs font-weight-bold"
                  >{{ mostrarValor(user.peso) }}</span
                >
              </td>
              <td class="align-middle text-center">
                <span class="text-secondary text-xs font-weight-bold"
                  >{{ mostrarValor(user.estatura) }}</span
                >
              </td>
              <td class="align-middle text-center">
                <button class="btn btn-link" @click="editUser(user)">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#4F1C77" class="bi bi-pencil-square" viewBox="0 0 16 16">
                        <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
                        <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z"/>
                    </svg>
                  </button>
                  <button class="btn btn-link" @click="deleteUser(user.id)">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#9E0000" class="bi bi-trash3" viewBox="0 0 16 16">
                        <path d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5M11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47M8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5"/>
                    </svg>
                  </button>
              </td>
            </tr>
          </tbody>
        </table>
        <!-- Modal for Editing User -->
        <div class="modal fade" id="editUserModal" tabindex="-1" role="dialog" aria-labelledby="editUserModalLabel" aria-hidden="true">
          <div class="modal-dialog" role="document">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title" id="editUserModalLabel">Editar Usuario</h5>
                <button type="button" class="close" data-bs-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div v-if="selectedUser && selectedUser.id" class="modal-body">
                <div class="form-group">
                  <label for="userName">Nombre</label>
                  <input type="text" class="form-control" id="userName" v-model="selectedUser.nombre">
                </div>
                <div class="form-group">
                  <label for="userName">Apellido</label>
                  <input type="text" class="form-control" id="userName" v-model="selectedUser.apellido">
                </div>
                <div class="form-group">
                  <label for="userName">Fecha de Nacimiento</label>
                  <input type="text" class="form-control" id="userName" v-model="selectedUser.fecha_nacimiento">
                </div>
                <div class="form-group">
                  <label for="userName">Peso</label>
                  <input type="text" class="form-control" id="userName" v-model="selectedUser.peso">
                </div>
                <div class="form-group">
                  <label for="userName">Estatura</label>
                  <input type="text" class="form-control" id="userName" v-model="selectedUser.estatura">
                </div>
                <div class="form-group">
                  <label for="userDiscipline">Disciplina</label>
                  <select v-model="selectedDisciplinaNombre" class="form-control" id="disciplinaSelect">
                    <option v-for="(disciplina, index) in disciplinas" :key="index" :value="disciplina.nombre_disciplina">
                      {{ disciplina.nombre_disciplina }} - {{ disciplina.descripcion }}
                    </option>
                  </select>
                </div>
                <div class="form-group">
                  <label for="userRole">Rol</label>
                  <select class="form-control" id="userRole" v-model="selectedUser.role" :value="selectedUser.role">
                    <option disabled selected>{{ selectedUser.role }} </option>
                    <option value="SUPER_ADMIN">Super Admin</option>
                    <option value="ADMIN">Admin</option>
                    <option value="COACH">Entrenador</option>
                    <option value="PLAYER">Deportista</option>
                  </select>
                </div>
                
              </div>
              <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
                <button type="button" class="btn btn-primary" @click="updateUser()">Guardar Cambios</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import * as bootstrap from 'bootstrap';
import axios from 'axios';
import SoftAvatar from "@/components/SoftAvatar.vue";
import SoftBadge from "@/components/SoftBadge.vue";
import img1 from "../../assets/img/team-2.jpg";
import img2 from "../../assets/img/team-3.jpg";
import img3 from "../../assets/img/team-4.jpg";
import img4 from "../../assets/img/team-3.jpg";
import img5 from "../../assets/img/team-2.jpg";
import img6 from "../../assets/img/team-4.jpg";

axios.defaults.withCredentials = false;
axios.defaults.baseURL = 'https://goalstats-api.onrender.com/api'

export default {
  name: "authors-table",
  data() {
    return {
      img1,
      img2,
      img3,
      img4,
      img5,
      img6,
      users: [],
      roleStyles: {
        'SUPER_ADMIN': { color: 'warning', img: img1 },
        'ADMIN': { color: 'info', img: img2 },
        'COACH': { color: 'success', img: img3 },
        'PLAYER': { color: 'secondary', img: img4 },
        'default': 'badge badge-default'
      },
      selectedUser: {},
      selectedDisciplinaNombre: '',
      idDisciplina: 0,

    };
  },
  components: {
    SoftAvatar,
    SoftBadge,
  },
  methods: {
    getRoleStyle(role) {
      return this.roleStyles[role] || this.roleStyles['default'];
    },
    getUserImg(role) {
      return this.roleStyles[role]?.img;
    },
    async deleteUser(userId) {
      try {
        console.log(userId);
        const response = await axios.delete(`https://goalstats-api.onrender.com/api/users/${userId}/`, {
          headers: {
            'Content-Type': 'application/json' // Puedes mantenerlo si el servidor espera un tipo de contenido específico
          },
          withCredentials: false
        });
        console.log("Usuario eliminado:", response.data);

        // Opcional: Eliminar el usuario de la lista local después de una eliminación exitosa
        if (response.status === 200 || response.status === 204) {
          this.users = this.users.filter(user => user.id !== userId);
          console.log("Usuario eliminado:", response.data);
        } else {
          console.error("No se pudo eliminar el usuario. Respuesta del servidor:", response);
        }
      } catch (error) {
        console.error("Error al eliminar el usuario:", error);
      }
    },
    editUser(user) {
      this.selectedUser = { ...user }; // Copiar el usuario seleccionado
      const modal = new bootstrap.Modal(document.getElementById('editUserModal'));
      modal.show();
    },
    async updateUser() {
    try {
      const disciplinaSeleccionada = this.disciplinas.find(
          (disciplina) => disciplina.nombre_disciplina === this.selectedDisciplinaNombre
        );
      const idDisciplina = disciplinaSeleccionada.id;
        if (disciplinaSeleccionada) {
          const idDisciplina = disciplinaSeleccionada.id;
          // Aquí puedes proceder a enviar el ID en el JSON para guardar los cambios
          console.log('ID de la disciplina seleccionada:', idDisciplina);
          // Lógica para guardar el JSON con el ID correspondiente...
        } else {
          console.error('No se encontró la disciplina seleccionada');
        }
      // Realizamos el PUT a la URL del API para actualizar el usuario
      const response = await axios.put(`https://goalstats-api.onrender.com/api/users/${this.selectedUser.id}`, {...this.selectedUser, is_active: true, nombre_disciplina: idDisciplina }, { withCredentials: false });
      console.log(this.selectedUser.id)
      // Si la actualización es exitosa, actualizamos los datos en la lista
      if (response.status === 200 || response.status === 204) {
      // Actualizamos la lista de usuarios solo si el servidor confirma la actualización
        const index = this.users.findIndex(u => u.id === this.selectedUser.id);
        if (index !== -1) {
          this.users.splice(index, 1, response.data); // Actualiza el usuario en la lista
        }

        

        // Cerrar el modal después de la actualización
        const modalElement = document.getElementById('editUserModal');
        const modal = bootstrap.Modal.getInstance(modalElement);
        modal.hide();

        // Limpiar el usuario seleccionado
        this.selectedUser = {};

        console.log('Usuario actualizado:', response.data);
      }
    } catch (error) {
      console.error('Error al actualizar el usuario:', error);
    }
    },

    async dataUsers() {
      try {
      const [response1, response2] = await Promise.all([
        await axios.get('https://goalstats-api.onrender.com/api/disciplines/'),
        await axios.get('https://goalstats-api.onrender.com/api/users/'),
      ]);
      this.disciplinas = response1.data;
      this.users = response2.data;      
    } catch (error) {
      console.error('Error al obtener las disciplinas:', error);
    };
    },

    saveUserChanges() {
      const index = this.users.findIndex(u => u.id === this.selectedUser.id);
      if (index !== -1) {
        this.users.splice(index, 1, this.selectedUser);
      }
      this.selectedUser = null;
      const modalElement = document.getElementById('editUserModal');
      const modal = bootstrap.Modal.getInstance(modalElement);
      modal.hide();
    },
    getDisciplinaName(disciplinaId) {
    const disciplina = this.disciplinas.find(d => d.id === disciplinaId);
    return disciplina ? `${disciplina.nombre_disciplina} - ${disciplina.descripcion}` : "Disciplina no encontrada";
    },
    getEstado(estado) {
      return estado ? "Conectado" : "Desconectado";
    },

    mostrarValor(valor) {
      return valor ? valor : "N/A";
    }

  },
  mounted() {
    this.dataUsers()
  },
};
</script>
