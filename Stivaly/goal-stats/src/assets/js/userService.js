import axios from 'axios';

class UserService {
    constructor(baseURL) {
        this.baseURL = baseURL;
        this.axiosInstance = axios.create({
            baseURL: this.baseURL,
            withCredentials: false, 
        });
        this.users = [];
        this.disciplinas = [];
    }

    async usersData() {
        try {
          const [responseDisciplinas, responseUsers] = await Promise.all([
            await axios.get('/disciplines/'),
            await axios.get('/users/'),
          ]);
          this.disciplinas = responseDisciplinas.data;
          this.users = responseUsers.data;
        } catch (error) {
          console.error('Error al obtener los datos:', error);
        };
    }

    calcularEdad(fechaNacimiento) {
        const hoy = new Date();
        const edad = hoy.getFullYear() - fechaNacimiento.getFullYear();
        const mes = hoy.getMonth() - fechaNacimiento.getMonth();
    
        // Si aún no es el cumpleaños este año, restar 1
        if (mes < 0 || (mes === 0 && hoy.getDate() < fechaNacimiento.getDate())) {
            return edad - 1;
        }
        return edad;
    }

    async editUser(userId, userData) {
        try {
            if (!userData || typeof userData !== "object") {
                throw new Error("Los datos del usuario son inválidos.");
            }
            
            if (userData.peso !== undefined) {
                const peso = parseFloat(userData.peso);
                if (isNaN(peso) || peso < 15 || peso > 150) {
                    throw new Error("El peso debe estar entre 15 kg y 150 kg.");
                }
            }
            if (userData.estatura !== undefined) {
                const estatura = parseFloat(userData.estatura);
                if (isNaN(estatura) || estatura < 50 || estatura > 220) {
                    throw new Error("La estatura debe ser un número positivo y mayor o igual a 50 cm.");
                }
            }
            if (userData.fecha_nacimiento !== undefined) {
                const fechaNacimiento = new Date(userData.fecha_nacimiento);
                if (isNaN(fechaNacimiento.getTime())) {
                    throw new Error("La fecha de nacimiento es inválida.");
                }
    
                const edad = this.calcularEdad(fechaNacimiento);
                if (edad < 7) {
                    throw new Error("La edad no puede ser menor a 7 años.");
                }
            }
            console.log('userData:', userData);
            const response = await this.axiosInstance.patch(`/users/${userId}/`, userData);
    
            console.log('Usuario actualizado:', response.data);
    
            return response.data; // Retorna los datos del usuario actualizado
        } catch (error) {
            console.error('Error al editar el usuario:', error);
            throw error; // Lanza el error para manejarlo en el lugar donde se llama este método
        }
    }

    filterUsersByDiscipline(disciplineName) {
        if (!this.users.length) {
            console.warn('No hay usuarios cargados para filtrar.');
            return [];
        }

        if (disciplineName === 'todas') {
            return this.users; // Devuelve todos los usuarios si no se filtra por disciplina
        }

        // Encuentra el ID de la disciplina correspondiente al nombre
        const disciplina = this.disciplinas.find(d => d.nombre_disciplina === disciplineName);
        if (!disciplina) {
            console.warn(`Disciplina "${disciplineName}" no encontrada.`);
            return [];
        }

        // Filtra los usuarios cuyo ID de disciplina coincida con el ID encontrado
        return this.users.filter(user => user.nombre_disciplina === disciplina.id);
    }

    async postDiscipline(formElement) {
        try {
            const formData = new FormData(formElement);

            const nombreDisciplina = formData.get("nombreDisciplina");
            const descripcionDisciplina = formData.get("descripcionDisciplina");

            if (!nombreDisciplina.trim()) {
                throw new Error("El campo 'Nombre de la Disciplina' es obligatorio.");
            }
            if (!descripcionDisciplina.trim()) {
                throw new Error("El campo 'Descripción' es obligatorio.");
            }
            const disciplineData = {
                nombre_disciplina: nombreDisciplina,
                descripcion: descripcionDisciplina,
            };
            const response = await this.axiosInstance.post('/disciplines/', disciplineData);

            console.log('Disciplina creada:', response.data);
            this.disciplinas.push(response.data);

            return response.data; 
        } catch (error) {
            console.error('Error al crear la disciplina:', error);
            throw error;
        }
    }

    async editDiscipline(disciplineId, disciplineData) {
        try {
            // Validar que el disciplineId y disciplineData sean válidos
            if (!disciplineId) {
                throw new Error("El ID de la disciplina es obligatorio para editarla.");
            }
    
            if (!disciplineData || typeof disciplineData !== "object") {
                throw new Error("Los datos de la disciplina son inválidos.");
            }
            const response = await this.axiosInstance.patch(`/disciplines/${disciplineId}/`, disciplineData);
            
            const updatedDisciplineIndex = this.disciplinas.findIndex(discipline => discipline.id === disciplineId);
            if (updatedDisciplineIndex !== -1) {
                this.disciplinas[updatedDisciplineIndex] = { ...this.disciplinas[updatedDisciplineIndex], ...response.data };
            }
    
            console.log('Disciplina actualizada:', response.data);
            return response.data; // Retorna los datos de la disciplina actualizada
        } catch (error) {
            console.error('Error al editar la disciplina:', error);
            throw error;
        }
    }

    async deleteDiscipline(disciplineId) {
        try {
            const response = await this.axiosInstance.delete(`/disciplines/${disciplineId}/`);
            console.log('Disciplina eliminada:', response.data);
            this.disciplinas = this.disciplinas.filter(discipline => discipline.id !== disciplineId);
            return response.data;
        } catch (error) {
            console.error('Error al eliminar la disciplina:', error);
            throw error;
        }
    }
    
}

export default UserService;