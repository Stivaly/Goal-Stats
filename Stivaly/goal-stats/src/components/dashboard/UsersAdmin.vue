<template>
    <h1>UsersAdmin</h1>
    <a id="logout" @click="logout">Cerrar sesión</a>
</template>
<script>
// import axios from 'axios';

export default {
    name: 'DashboardViewAdmin',
    data() {
        return {
            dashboardData: null
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
    methods: {
        isTokenExpired() {
            const expiration = localStorage.getItem('tokenExpiration');
            console.log('Fecha de expiración del token:', expiration);
            if (!expiration) return true;

            const now = new Date();
            return now > new Date(expiration); // Retorna true si ya expiró
        },

        logout() {
            // Elimina el token y la fecha de expiración de localStorage
            localStorage.removeItem('authToken');
            localStorage.removeItem('tokenExpiration');

            console.log('El usuario ha cerrado sesión y el token ha sido destruido.');

            // Redirige al usuario a la página de inicio de sesión
            this.$router.push('/login/'); // Asegúrate de que la ruta sea correcta
        }
    }
}
</script>

