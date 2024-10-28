<template>
    <div class="container mt-3 mb-5" style="max-width: 95%; margin: auto;">
    <div class="card p-4 shadow-lg border-0 rounded-4">
      <div class="d-flex justify-content-between align-items-center mb-3" style="color: #4F1C77;">
        <h4 class="font-weight-bold">Administración de Usuarios</h4>
        <button class="btn rounded-5" style="background-color: #ffe252;" @click="addUser">Agregar +</button>
      </div>
      <input type="text" v-model="search" class="form-control mb-3 rounded-5" placeholder="Buscar">
      <div class="rounded-4" style="max-height: 400px; overflow-y: auto;">
          <table class="table table-hover border-0">
            <thead class="thead-light">
                <tr>
                    <th class="font-weight-bold text-center">Nombre</th>
                    <th class="font-weight-bold text-center" >Rol</th>
                    <th class="font-weight-bold text-center">Disciplina</th>
                    <th class="font-weight-bold text-center">Equipo/Organización</th>
                    <th class="font-weight-bold text-center">Fecha de Creación</th>
                    <th class="font-weight-bold text-center">Acción</th>
                </tr>
            </thead>
            <tbody>
              <tr v-for="user in filteredUsers" :key="user.id" @mouseover="onRowHover(user)" :class="{ 'table-active': user.isHighlighted }" class="text-center">
                <td>{{ user.name }}</td>
                <td ><span class="badge rounded-4 font-weight-normal w-100" style="min-width: max-content !important;" :style="getRoleStyle(user.role)" >{{ user.role }} </span></td>
                <td>{{ user.discipline || 'N/A' }}</td>
                <td>{{ user.team || 'N/A' }}</td>
                <td>{{ user.creationDate }}</td>
                <td>
                  <button class="btn btn-link" @click="editUser(user.id)">
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
      </div>
      <div class="d-flex justify-content-between mt-3">
        <span class="fw-lighter" style="color: #4F1C77;">Páginas: {{ currentPage }} - {{ totalPages }}</span>
        <div>
          <button class="btn btn-sm" @click="prevPage">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#4F1C77" class="bi bi-arrow-left" viewBox="0 0 16 16">
                <path fill-rule="evenodd" d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8"/>
            </svg>
          </button>
          <button class="btn btn-sm" @click="nextPage">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#4F1C77" class="bi bi-arrow-right" viewBox="0 0 16 16">
                <path fill-rule="evenodd" d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8"/>
            </svg>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
// import axios from 'axios';
import '@/assets/css/login.css';

export default {
    name: 'DashboardViewAdmin',
    data() {
        return {
            search: '',
            users: [
                { id: 1, name: 'David Wagner', role: 'Super Admin', creationDate: '24 Oct, 2015' },
                { id: 2, name: 'Ina Hogan', role: 'Admin', creationDate: '24 Oct, 2015' },
                { id: 3, name: 'Devin Harmon', role: 'Entrenador', creationDate: '18 Dec, 2015' },
                { id: 4, name: 'Lena Page', role: 'Deportista', creationDate: '8 Oct, 2016' },
                { id: 5, name: 'Eula Horton', role: 'Admin', creationDate: '15 Jun, 2017' },
                { id: 6, name: 'Victoria Perez', role: 'Entrenador', creationDate: '12 Jan, 2019' },
                { id: 7, name: 'Cora Medina', role: 'Deportista', creationDate: '21 July, 2020' },
            ],
            currentPage: 1,
            itemsPerPage: 4,
            roleStyles: {
                'Super Admin': {
                backgroundColor: '#00b7ff',
                color: '#fff'
                },
                'Admin': {
                backgroundColor: '#00b7ff',
                color: '#fff'
                },
                'Entrenador': {
                backgroundColor: '#00b7ff',
                color: '#fff'
                },
                'Deportista': {
                backgroundColor: '#DEEBF0',
                color: '#4EC9FA'
                },
                'default': {
                backgroundColor: '#007bff',
                color: '#fff'
                }
            }
        }
    },
    mounted() {
        if (this.isTokenExpired()) {
            localStorage.removeItem('authToken');
            localStorage.removeItem('tokenExpiration');
            console.log('El token ha expirado y ha sido eliminado.');
      // Si ya hay un token válido, redirige al dashboard
            this.$router.push('/login/'); // Asumiendo que usas Vue Router
        }

        const token = localStorage.getItem('authToken');
        console.log('Sesion iniciada con token:', token);
        /*
        axios.get('/api/dashboard/', {
        headers: {
            Authorization: `Bearer ${token}`
        }
        })
        .then(response => {
            this.dashboardData = response.data;
        })
        .catch(error => {
            console.error('Error al obtener los datos del dashboard:', error);
        });*/

        
        },
    computed: {
        filteredUsers() {
            const filtered = this.users.filter(user => user.name.toLowerCase().includes(this.search.toLowerCase()));
            const startIndex = (this.currentPage - 1) * this.itemsPerPage;
            return filtered.slice(startIndex, startIndex + this.itemsPerPage);
            },
        
            totalPages() {
            return Math.ceil(this.users.length / this.itemsPerPage);
            }
        },
    methods: {
        isTokenExpired() {
            const expiration = localStorage.getItem('tokenExpiration');
            console.log('Fecha de expiración del token:', expiration);
            if (!expiration) return true;

            const now = new Date();
            return now > new Date(expiration); // Retorna true si ya expiró
        },

        addUser() {
            alert('Add user functionality');
        },
        editUser(id) {
            alert(`Edit user with ID: ${id}`);
         },
        deleteUser(id) {
            alert(`Delete user with ID: ${id}`);
        },
        prevPage() {
            if (this.currentPage > 1) {
                this.currentPage--;
            }
        },
        nextPage() {
            if (this.currentPage < this.totalPages) {
                this.currentPage++;
            }
        },
        getRoleStyle(role) {
            return this.roleStyles[role] || this.roleStyles['default'];
        },
        onRowHover(user) {
            this.users.forEach(u => (u.isHighlighted = false));
            user.isHighlighted = true;
        }
    }
}
</script>

<style scoped>

.table-active {
  background-color: #f9f9f9 !important;
}

.thead-light {
  background-color: #f8f9fa;
}

th {
  font-weight: bold;
}

tr {
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
}


</style>
